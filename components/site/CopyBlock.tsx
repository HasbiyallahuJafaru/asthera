"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/primitives/tooltip";

/**
 * Journalists copy these bios straight into a piece. Making that one click is
 * the whole point of the press page.
 */
export function CopyBlock({
  label,
  text,
  wordCount,
}: {
  label: string;
  text: string;
  wordCount: number;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-card bg-surface p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base text-text">{label}</h3>
          <p className="mt-1 font-mono text-[11px] text-text-faint">{wordCount} words</p>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={copy}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-pill border border-line-strong px-3.5 py-1.5 text-xs text-text-dim transition-colors duration-200 hover:border-accent hover:text-accent-bright"
            >
              {copied ? (
                <>
                  <Check size={13} weight="bold" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={13} />
                  Copy
                </>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>Copy as written</TooltipContent>
        </Tooltip>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-text-dim">{text}</p>
    </div>
  );
}
