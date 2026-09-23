"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/primitives/navigation-menu";
import { nav } from "@/lib/site";

type NavProgramme = { slug: string; name: string; summary: string };

/**
 * Desktop navigation, on the shadcn navigation menu.
 *
 * The pills and the active tint carry over unchanged from the previous list,
 * so the header does not read as a different component. The change is the
 * Our work item: hovering it opens a compact two-column panel naming each area
 * of work, so the nav answers "what do they actually do" without a detour
 * through the index page.
 */
export function NavLinks({ programmes }: { programmes: NavProgramme[] }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <NavigationMenu className="max-w-none">
      <NavigationMenuList>
        {nav.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.href === "/work" ? (
              <>
                <NavigationMenuTrigger
                  className={
                    isActive(item.href) ? "bg-surface text-text" : "text-text-dim"
                  }
                >
                  {item.label}
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="w-[19rem] p-2 sm:w-[30rem]">
                    <ul className="grid gap-0.5 sm:grid-cols-2">
                      {programmes.map((programme) => (
                        <li key={programme.slug}>
                          <NavigationMenuLink asChild className="rounded-lg">
                            <Link
                              href={`/work/${programme.slug}`}
                              className="block rounded-lg px-3 py-2.5 text-sm leading-snug text-text"
                            >
                              {programme.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-1.5 border-t border-line pt-1.5">
                      <NavigationMenuLink asChild className="rounded-lg">
                        <Link
                          href="/work"
                          className="flex flex-row items-center gap-1.5 px-3 py-2 text-sm font-medium text-accent"
                        >
                          All our work
                          <ArrowRight size={14} weight="bold" aria-hidden />
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                asChild
                className={`rounded-pill px-4 py-2 text-sm transition-colors duration-200 hover:text-text ${
                  isActive(item.href) ? "bg-surface text-text" : "text-text-dim"
                }`}
              >
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
