"use client";

import { CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";

type State = "idle" | "sending" | "done" | "error";

const topics = [
  { value: "project", label: "Intelligence or technical project" },
  { value: "partnership", label: "Partnership, research or funding" },
  { value: "programme", label: "Education session or workshop" },
  { value: "press", label: "Press or interview" },
  { value: "speaking", label: "Speaking request" },
  { value: "other", label: "Something else" },
] as const;

const field =
  "w-full rounded-pill border border-line-strong bg-page px-5 py-3 text-sm text-text " +
  "placeholder:text-text-faint focus:border-accent focus:outline-none";

export function EnquiryForm({ defaultTopic = "partnership" }: { defaultTopic?: string }) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState(defaultTopic);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState("error");
        setMessage(body.message ?? "That did not send. Please try again.");
        toast.error(body.message ?? "That did not send. Please try again.");
        return;
      }

      setState("done");
      setMessage(body.message ?? "Thank you. We will be in touch.");
      form.reset();
      setTopic(defaultTopic);
    } catch {
      setState("error");
      setMessage("Network error. Please try again, or email us directly.");
      toast.error("Network error. Please try again, or email us directly.");
    }
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="rounded-card border border-line bg-surface px-7 py-12 text-center"
      >
        <CheckCircle size={28} weight="fill" className="mx-auto text-accent" />
        <h2 className="mt-4 text-lg tracking-tight text-text">Message sent</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-dim">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm text-text">
            Your name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={field} />
        </div>

        <div className="grid gap-2">
          <label htmlFor="organisation" className="text-sm text-text">
            Organisation
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm text-text">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="topic" className="text-sm text-text">
          What is this about
        </label>
{/* Radix rather than a native select, whose option list the operating
            system draws. Controlled, with the label passed to SelectValue and
            the value carried by a hidden input: Radix registers both from the
            items, and the items only mount once the menu opens, so left to
            itself the trigger rendered blank and a form submitted without
            touching the field sent no topic at all. */}
        <Select value={topic} onValueChange={setTopic}>
          <SelectTrigger id="topic">
            <SelectValue>{topics.find((item) => item.value === topic)?.label}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic.value} value={topic.value}>
                {topic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="topic" value={topic} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm text-text">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={`${field} resize-y rounded-card`} />
        <p className="text-xs text-text-faint">
          Tell us what you have in mind and the timescale you are working to.
        </p>
      </div>

      {/* Honeypot. Real people never fill this in. */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" ? (
        <p role="alert" className="text-sm text-danger">
          {message}
        </p>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-pill bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent-bright active:translate-y-px disabled:opacity-60"
        >
          {state === "sending" ? (
            <>
              <CircleNotch size={16} weight="bold" className="animate-spin" />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}
