"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cta, nav } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill text-text"
      >
        {open ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
      </button>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-[76px] bottom-0 z-40 border-t border-line bg-page px-5 pt-8"
      >
        <nav>
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-line py-4 text-xl tracking-tight text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href={cta.partner.href}
          className="mt-8 flex w-full cursor-pointer items-center justify-center rounded-pill bg-accent px-5 py-3.5 text-sm font-medium text-on-accent"
        >
          {cta.partner.label}
        </Link>
      </div>
    </div>
  );
}
