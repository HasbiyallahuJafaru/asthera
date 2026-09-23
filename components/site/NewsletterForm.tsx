"use client";

import { ArrowRight, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "sonner";

type State = "idle" | "sending" | "done" | "error";

/**
 * Email capture as a single pill: the field and its action share one rounded
 * container, matching the hero and the tinted card.
 */
export function NewsletterForm({ source = "site" }: { source?: string }) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          source,
        }),
      });

      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState("error");
        setMessage(body.message ?? "That did not go through. Please try again.");
        toast.error(body.message ?? "That did not go through. Please try again.");
        return;
      }

      setState("done");
      setMessage(body.message ?? "You are on the list.");
      toast.success(body.message ?? "You are on the list.");
      form.reset();
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 py-2 text-sm font-medium" role="status">
        <CheckCircle size={18} weight="fill" className="shrink-0 text-accent" />
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <div className="flex items-center gap-2 rounded-pill border border-line-strong bg-page p-1.5 focus-within:border-accent">
        <label htmlFor={`nl-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`nl-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          aria-describedby={state === "error" ? `nl-error-${source}` : undefined}
          aria-invalid={state === "error"}
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-text placeholder:text-text-faint focus:outline-none"
        />

        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-pill bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent-bright active:translate-y-px disabled:opacity-60"
        >
          {state === "sending" ? (
            <>
              <CircleNotch size={15} weight="bold" className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight size={15} weight="bold" />
            </>
          )}
        </button>
      </div>

      {/* Honeypot. Real people never fill this in. */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`company-${source}`}>Company</label>
        <input id={`company-${source}`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" ? (
        <p id={`nl-error-${source}`} role="alert" className="mt-2 px-4 text-sm text-danger">
          {message}
        </p>
      ) : null}
    </form>
  );
}
