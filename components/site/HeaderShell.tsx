"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * The header's outer element. While a page's `#hero` sits under it, the header
 * drops its ground and blur and flips to light text, so the hero reads through
 * it; once the hero scrolls away it settles back onto the page ground.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Keyed by path, so a reading from the previous page never carries over.
  const [reading, setReading] = useState({ path: "", over: false });
  const overHero = reading.path === pathname && reading.over;

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    // Watch a thin band where the header sits: the hero counts as "under it"
    // until its bottom edge scrolls up past that band.
    const observer = new IntersectionObserver(
      ([entry]) => setReading({ path: pathname, over: Boolean(entry?.isIntersecting) }),
      { rootMargin: "0px 0px -92% 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      data-over-hero={overHero}
      className="group/header sticky top-0 z-50 border-b border-line/70 bg-page/85 backdrop-blur-md transition-[background-color,border-color,backdrop-filter] duration-500 ease-out data-[over-hero=true]:border-transparent data-[over-hero=true]:bg-transparent data-[over-hero=true]:backdrop-blur-none"
    >
      {children}
    </header>
  );
}
