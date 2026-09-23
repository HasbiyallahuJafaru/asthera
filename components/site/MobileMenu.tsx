"use client";

import { List } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/primitives/sheet";
import { cta, nav } from "@/lib/site";

/**
 * Mobile navigation, on the Radix dialog behind the sheet primitive.
 *
 * The previous version was a div toggled with `hidden`: Tab walked out of the
 * open panel into the page behind it, focus never returned to the button that
 * opened it, and the scroll lock was written straight onto document.body.style.
 *
 * Open state is the route the panel was opened on rather than a boolean, so a
 * route change closes it by derivation instead of from an effect.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={(next) => setOpenedOn(next ? pathname : null)}>
        <SheetTrigger
          aria-label="Open menu"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill text-text transition-colors duration-200 hover:bg-surface"
        >
          <List size={22} />
        </SheetTrigger>

        <SheetContent side="right" className="px-0">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav aria-label="Main" className="mt-4 px-6">
            <ul>
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.href}>
                    {/* SheetClose so a link to the page already open still
                        closes the panel, where a route change would not fire. */}
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`block border-b border-line py-4 text-xl tracking-tight transition-colors duration-200 ${
                          active ? "text-accent" : "text-text"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </nav>

          <SheetFooter>
            <SheetClose asChild>
              <Link
                href={cta.partner.href}
                className="flex w-full cursor-pointer items-center justify-center rounded-pill bg-accent px-5 py-3.5 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent-bright"
              >
                {cta.partner.label}
              </Link>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
