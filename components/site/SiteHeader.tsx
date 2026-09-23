import Link from "next/link";

import { getProgrammes } from "@/sanity/queries";
import { Rail } from "@/components/ui/Section";
import { cta } from "@/lib/site";
import { BrandLogo } from "./BrandLogo";
import { CommandPalette } from "./CommandPalette";
import { HeaderShell } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/**
 * Floats on the page ground above the first slab, and goes clear over the home
 * hero (see HeaderShell). Nav sits centred, and the
 * right group runs search, then the single primary action as a pill; on mobile
 * that collapses to search and menu icons at the same weight.
 */
export async function SiteHeader() {
  const programmes = await getProgrammes();
  const navProgrammes = programmes.map(({ slug, name, summary }) => ({ slug, name, summary }));

  return (
    <HeaderShell>
      <Rail width="wide">
        <div className="flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center px-2" aria-label="ASTHERA home">
            <BrandLogo
              className="h-10 w-auto group-data-[over-hero=true]/header:hidden sm:h-11"
              priority
            />
            <BrandLogo
              variant="light"
              className="hidden h-10 w-auto group-data-[over-hero=true]/header:block sm:h-11"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <NavLinks programmes={navProgrammes} />
          </nav>

          <div className="flex items-center gap-2.5">
            <CommandPalette />

            <div className="hidden lg:block">
              <Link
                href={cta.partner.href}
                className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-pill bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent-bright"
              >
                {cta.partner.label}
              </Link>
            </div>

            <MobileMenu />
          </div>
        </div>
      </Rail>
    </HeaderShell>
  );
}
