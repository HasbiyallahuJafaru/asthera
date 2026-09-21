"use client";

import { useEffect, useRef, useState } from "react";

export type ArcPlacement = {
  /** Centre of the ellipse, in percent of the section box. */
  x: number;
  y: number;
  /** Radii, in percent of the section box. */
  rx: number;
  ry: number;
  /** Degrees off the horizontal axis. Never 0 and never 90. */
  rotate: number;
  colour?: "gold" | "green" | "navy" | "light";
  opacity?: number;
  width?: number;
};

const strokes = {
  gold: "var(--gold)",
  green: "var(--accent)",
  navy: "var(--navy)",
  light: "rgba(255,255,255,0.45)",
};

/**
 * The orbit ring from the logo, reused as the connective device between
 * sections. It draws itself once when scrolled into view, then stays.
 *
 * Purely decorative: aria-hidden, pointer-events-none, and it renders already
 * complete under prefers-reduced-motion.
 *
 * `pathLength="1"` normalises the geometry so the dash animation is correct
 * regardless of how the non-uniform viewBox stretches the ellipse.
 */
export function OrbitArc({
  x,
  y,
  rx,
  ry,
  rotate,
  colour = "gold",
  opacity = 0.55,
  width = 1.25,
}: ArcPlacement) {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <ellipse
        cx={x}
        cy={y}
        rx={rx}
        ry={ry}
        transform={`rotate(${rotate} ${x} ${y})`}
        fill="none"
        stroke={strokes[colour]}
        strokeWidth={width}
        strokeLinecap="round"
        opacity={opacity}
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className={`orbit-draw ${visible ? "is-visible" : ""}`}
        style={{ ["--arc-len" as string]: "1" }}
      />
    </svg>
  );
}
