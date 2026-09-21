import { createClient } from "next-sanity";

import { clientKey, isEmail, rateLimit } from "@/lib/rate-limit";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export const runtime = "nodejs";

const WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

const writeClient =
  isSanityConfigured && WRITE_TOKEN
    ? createClient({ projectId, dataset, apiVersion, token: WRITE_TOKEN, useCdn: false })
    : null;

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  if (!rateLimit(`subscribe:${clientKey(request)}`, 5, 60_000)) {
    return json({ message: "Too many attempts. Please wait a minute and try again." }, 429);
  }

  let payload: { email?: unknown; company?: unknown; source?: unknown };

  try {
    payload = await request.json();
  } catch {
    return json({ message: "Malformed request." }, 400);
  }

  // Honeypot: a filled field means a bot. Return success so it learns nothing.
  if (typeof payload.company === "string" && payload.company.length > 0) {
    return json({ message: "You are on the list." });
  }

  if (!isEmail(payload.email)) {
    return json({ message: "Please enter a valid email address." }, 400);
  }

  const email = payload.email.toLowerCase();
  const source = typeof payload.source === "string" ? payload.source.slice(0, 80) : "site";

  if (!writeClient) {
    console.warn("[subscribe] no storage configured, dropping signup for", email);
    return json(
      {
        message:
          "Subscriptions are not switched on yet. Please email hello@astheraspace.com and we will add you.",
      },
      503,
    );
  }

  try {
    // Deterministic id makes a repeat signup an update rather than a duplicate.
    const id = `subscriber.${Buffer.from(email).toString("base64url")}`;

    await writeClient.createOrReplace({
      _id: id,
      _type: "subscriber",
      email,
      subscribedAt: new Date().toISOString(),
      source,
    });

    return json({ message: "You are on the list. Watch for the first update." });
  } catch (error) {
    console.error("[subscribe] failed to store signup", error);
    return json({ message: "Something went wrong on our side. Please try again." }, 500);
  }
}
