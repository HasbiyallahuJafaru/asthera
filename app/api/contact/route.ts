import { Resend } from "resend";

import { clientKey, isEmail, rateLimit } from "@/lib/rate-limit";
import { contact } from "@/lib/site";

export const runtime = "nodejs";

const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.CONTACT_FROM_EMAIL ?? "ASTHERA site <onboarding@resend.dev>";

const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null;

const ROUTING: Record<string, string> = {
  project: contact.partnerships,
  partnership: contact.partnerships,
  programme: contact.partnerships,
  press: contact.press,
  speaking: contact.press,
  other: contact.general,
};

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status });
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientKey(request)}`, 3, 60_000)) {
    return json({ message: "Too many messages. Please wait a minute and try again." }, 429);
  }

  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return json({ message: "Malformed request." }, 400);
  }

  // Honeypot.
  if (clean(payload.website, 200).length > 0) {
    return json({ message: "Thank you. We will be in touch." });
  }

  const name = clean(payload.name, 120);
  const organisation = clean(payload.organisation, 160);
  const message = clean(payload.message, 5000);
  const topic = clean(payload.topic, 40) || "other";

  if (!name) return json({ message: "Please tell us your name." }, 400);
  if (!isEmail(payload.email)) return json({ message: "Please enter a valid email address." }, 400);
  if (message.length < 10) {
    return json({ message: "Please add a little more detail to your message." }, 400);
  }

  const email = payload.email;
  const to = ROUTING[topic] ?? contact.general;

  if (!resend) {
    console.warn("[contact] RESEND_API_KEY not set, message not delivered", { to, topic, email });
    return json(
      {
        message: `Our form is not connected yet. Please email ${to} directly and we will reply.`,
      },
      503,
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [to],
      replyTo: email,
      subject: `[${topic}] Enquiry from ${name}${organisation ? ` at ${organisation}` : ""}`,
      text: [
        `Name: ${name}`,
        `Organisation: ${organisation || "not given"}`,
        `Email: ${email}`,
        `Topic: ${topic}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] resend rejected the message", error);
      return json({ message: `Delivery failed. Please email ${to} directly.` }, 502);
    }

    return json({ message: "Thank you. Your message reached the founder directly." });
  } catch (error) {
    console.error("[contact] failed to send", error);
    return json({ message: `Something went wrong. Please email ${to} directly.` }, 500);
  }
}
