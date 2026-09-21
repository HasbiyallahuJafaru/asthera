"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "up" | "left" | "right" | "rise" | "fade";

const offsets: Record<Variant, { x?: number; y?: number; scale?: number }> = {
  up: { y: 26 },
  left: { x: -32 },
  right: { x: 32 },
  rise: { y: 44, scale: 0.97 },
  fade: {},
};

/**
 * Scroll reveal, used to sequence a section in reading order rather than as
 * decoration. Direction varies by where the element sits in the composition, so
 * an off-centre layout resolves the way it was drawn.
 *
 * Collapses to a plain render under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  duration = 0.7,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  duration?: number;
  className?: string;
  as?: "div" | "li" | "section" | "figure";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const from = offsets[variant];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
