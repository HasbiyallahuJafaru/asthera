"use client";

import {
  ArrowRight,
  ArrowUpRight,
  EnvelopeSimple,
  LinkedinLogo,
  MagnifyingGlass,
  Planet,
  XLogo,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/primitives/command";
import { Kbd } from "@/components/primitives/kbd";
import { contact, nav, programmes, socials } from "@/lib/site";

const goArrow =
  "ml-auto text-accent opacity-0 transition-opacity duration-150 group-data-[selected=true]:opacity-100";

/**
 * Site search, on the shadcn command palette.
 *
 * One dialog, two triggers: a quiet search pill on desktop that advertises the
 * keyboard shortcut, and a plain icon at mobile weight beside the menu button.
 * ⌘K / Ctrl+K toggles it anywhere on the site. The list of work areas is the
 * static fallback from lib/site, which mirrors what Sanity holds, so the
 * palette costs no query of its own.
 */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function openExternal(url: string) {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {/* Desktop trigger. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden cursor-pointer items-center gap-2.5 rounded-pill border border-line-strong bg-page py-2 pr-2 pl-4 text-sm text-text-dim transition-colors duration-200 hover:border-text hover:text-text lg:inline-flex"
      >
        <MagnifyingGlass size={15} weight="bold" />
        Search
        <Kbd>⌘K</Kbd>
      </button>

      {/* Mobile trigger, at the same weight as the menu button beside it. */}
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill text-text transition-colors duration-200 hover:bg-surface lg:hidden"
      >
        <MagnifyingGlass size={20} />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, our work and contact" />

        <CommandList>
          <CommandEmpty>Nothing here matches that.</CommandEmpty>

          <CommandGroup heading="Pages">
            {nav.map((item) => (
              <CommandItem key={item.href} value={item.label} onSelect={() => go(item.href)}>
                {item.label}
                <ArrowRight size={14} weight="bold" aria-hidden className={goArrow} />
              </CommandItem>
            ))}
            <CommandItem value="Partner with us" onSelect={() => go("/partner")}>
              Partner with us
              <ArrowRight size={14} weight="bold" aria-hidden className={goArrow} />
            </CommandItem>
            <CommandItem value="Contact" onSelect={() => go("/contact")}>
              Contact
              <ArrowRight size={14} weight="bold" aria-hidden className={goArrow} />
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Our work">
            {programmes.map((programme) => (
              <CommandItem
                key={programme.slug}
                value={programme.name}
                onSelect={() => go(`/work/${programme.slug}`)}
              >
                <Planet size={16} aria-hidden className="text-accent" />
                {programme.name}
                <ArrowRight size={14} weight="bold" aria-hidden className={goArrow} />
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Elsewhere">
            <CommandItem value="ASTHERA on LinkedIn" onSelect={() => openExternal(socials.linkedin)}>
              <LinkedinLogo size={16} aria-hidden />
              ASTHERA on LinkedIn
              <ArrowUpRight size={13} weight="bold" aria-hidden className={goArrow} />
            </CommandItem>
            <CommandItem value="Fauziyya on X" onSelect={() => openExternal(socials.x)}>
              <XLogo size={16} aria-hidden />
              Fauziyya on X
              <ArrowUpRight size={13} weight="bold" aria-hidden className={goArrow} />
            </CommandItem>
            <CommandItem
              value={`Email ${contact.general}`}
              onSelect={() => {
                setOpen(false);
                window.location.href = `mailto:${contact.general}`;
              }}
            >
              <EnvelopeSimple size={16} aria-hidden />
              {contact.general}
              <ArrowUpRight size={13} weight="bold" aria-hidden className={goArrow} />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
