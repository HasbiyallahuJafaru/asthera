import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

/**
 * The small pill label that sits above a section headline. Rationed: at most one
 * per slab, and not on every slab.
 */
export function Badge({
  icon: IconComponent,
  children,
  tone = "surface",
}: {
  icon?: Icon;
  children: ReactNode;
  tone?: "surface" | "accent" | "page";
}) {
  const tones = {
    surface: "bg-surface text-text-dim",
    accent: "bg-accent-soft text-accent",
    // For use on a coloured wash, where the surface tone would disappear.
    page: "bg-page text-text-dim",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] ${tones[tone]}`}
    >
      {IconComponent ? <IconComponent size={13} weight="fill" className="text-accent" /> : null}
      {children}
    </span>
  );
}
