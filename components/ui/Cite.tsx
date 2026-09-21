import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import type { Citation } from "@/lib/site";

/**
 * Inline source link. Every superlative on this site carries one. It is both an
 * honesty requirement and the thing that makes the page citable by the next
 * journalist who writes about her.
 */
export function Cite({ citation, label }: { citation: Citation; label?: string }) {
  return (
    <a
      href={citation.url}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-baseline gap-0.5 font-mono text-[11px] tracking-wide text-text-faint transition-colors duration-200 hover:text-accent"
    >
      {label ?? citation.outlet}
      <ArrowUpRight size={10} weight="bold" className="translate-y-px" />
    </a>
  );
}
