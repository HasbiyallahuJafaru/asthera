"use client";

import { ArrowRight, Planet } from "@phosphor-icons/react";
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
 * Our work item: hovering it now opens a panel that names each area of work and
 * says in one line what it does, so the nav answers "what do they actually
 * run" without a detour through the index page.
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
                  <div className="w-[20rem] p-2 sm:w-[32rem]">
                    <ul className="grid">
                      {programmes.map((programme) => (
                        <li key={programme.slug}>
                          <NavigationMenuLink asChild className="rounded-xl p-1">
                            <Link
                              href={`/work/${programme.slug}`}
                              className="group flex items-start gap-4 rounded-xl p-3.5"
                            >
                              <span
                                aria-hidden
                                className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-pill bg-accent-soft text-accent"
                              >
                                <Planet size={18} />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-medium text-text">
                                  {programme.name}
                                </span>
                                <span className="mt-1 block line-clamp-2 text-sm leading-snug text-text-dim">
                                  {programme.summary}
                                </span>
                              </span>
                              <ArrowRight
                                size={15}
                                weight="bold"
                                aria-hidden
                                className="mt-1 ml-auto shrink-0 text-accent opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                              />
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-1 border-t border-line pt-1">
                      <NavigationMenuLink asChild className="rounded-xl p-1">
                        <Link
                          href="/work"
                          className="flex flex-row items-center justify-between px-3.5 py-3 text-sm font-medium text-text"
                        >
                          All our work
                          <ArrowRight size={15} weight="bold" aria-hidden className="text-accent" />
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
