"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav } from "@/lib/site";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-pill px-4 py-2 text-sm transition-colors duration-200 hover:text-text ${
                active ? "bg-surface text-text" : "text-text-dim"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
