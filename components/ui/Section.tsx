import type { ReactNode } from "react";

import { OrbitArc, type ArcPlacement } from "./OrbitArc";

type Tone = "white" | "green" | "navy-wash" | "gold" | "navy";

/**
 * Corner radii are deliberately uneven. A band curves on one diagonal pair at a
 * large radius, which reads as drawn rather than as a rounded rectangle. Which
 * diagonal alternates down the page so no two adjacent bands share a silhouette.
 */
type Curve = "none" | "tl-br" | "tr-bl" | "top" | "bottom";

const tones: Record<Tone, string> = {
  white: "bg-page",
  green: "bg-wash-green",
  "navy-wash": "bg-wash-navy",
  gold: "bg-wash-gold",
  navy: "bg-navy text-on-navy",
};

const curves: Record<Curve, string> = {
  none: "",
  "tl-br": "rounded-tl-band rounded-br-band",
  "tr-bl": "rounded-tr-band rounded-bl-band",
  top: "rounded-t-band",
  bottom: "rounded-b-band",
};

export function Section({
  children,
  tone = "white",
  curve = "none",
  arc,
  className = "",
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  tone?: Tone;
  curve?: Curve;
  /** Decorative orbit arc drawn behind the content. */
  arc?: ArcPlacement;
  className?: string;
  id?: string;
  as?: "section" | "div" | "footer";
}) {
  return (
    <Tag
      id={id}
      className={`relative isolate overflow-hidden ${tones[tone]} ${curves[curve]} ${className}`}
    >
      {arc ? <OrbitArc {...arc} /> : null}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

/**
 * The page rail. Sets the one horizontal gutter for the site. Content columns
 * inside it are deliberately off centre; this only bounds the measure.
 */
export function Rail({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const max = width === "wide" ? "max-w-[92rem]" : width === "narrow" ? "max-w-[48rem]" : "max-w-[84rem]";

  return <div className={`mx-auto w-full ${max} px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}
