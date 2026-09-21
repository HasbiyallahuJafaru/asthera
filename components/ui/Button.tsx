import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet" | "on-navy" | "ghost-navy";

/**
 * Every interactive control on the site is a pill. Contrast is fixed at the
 * token level: solid accent carries --on-accent, secondary carries --text on a
 * white fill with a visible border. Labels stay short so nothing wraps.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-medium " +
  "whitespace-nowrap cursor-pointer transition-[background-color,border-color,color,transform] " +
  "duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-bright",
  secondary: "bg-page text-text border border-line-strong hover:border-text",
  quiet: "bg-surface text-text hover:bg-surface-hover",
  // On the deep band: white fill carries navy text, 12.7:1.
  "on-navy": "bg-page text-navy hover:bg-wash-gold",
  "ghost-navy": "border border-white/45 text-on-navy hover:border-white hover:bg-white/10",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  external,
  ...rest
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer noopener" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function SubmitButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"button"> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

/**
 * The inline "Learn more" affordance used on cards, with the arrow that shifts
 * on hover.
 */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/link inline-flex items-center gap-2 text-sm font-medium text-text transition-colors duration-200 hover:text-accent ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-200 ease-out group-hover/link:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
