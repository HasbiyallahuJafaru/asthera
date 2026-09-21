import fs from "node:fs";
import path from "node:path";

import Image from "next/image";

const BRAND_DIR = path.join(process.cwd(), "public", "brand");

/** Prefers a vector lockup if one is supplied, otherwise the supplied raster. */
const CANDIDATES = {
  dark: ["asthera-logo.svg", "asthera-logo.png", "asthera-logo.jpg"],
  light: ["asthera-logo-white.svg", "asthera-logo-white.png"],
};

function resolveLogo(variant: "dark" | "light") {
  for (const file of CANDIDATES[variant]) {
    if (fs.existsSync(path.join(BRAND_DIR, file))) return `/brand/${file}`;
  }
  return null;
}

/**
 * The supplied lockup is a raster with its background keyed out, so it sits on
 * any ground. Drop in `asthera-logo.svg` and it is used instead, with no code
 * change.
 */
export function BrandLogo({
  className = "h-9 w-auto",
  priority = false,
  variant = "dark",
}: {
  className?: string;
  priority?: boolean;
  /** "light" is the white knockout, for use on the navy band. */
  variant?: "dark" | "light";
}) {
  const src = resolveLogo(variant);

  if (src) {
    return (
      <Image
        src={src}
        alt="ASTHERA. Using space data to solve Earth problems."
        width={470}
        height={262}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <span
      className={`text-[15px] font-semibold tracking-[0.3em] ${
        variant === "light" ? "text-on-navy" : "text-text"
      }`}
      aria-label="ASTHERA"
    >
      ASTHERA
    </span>
  );
}
