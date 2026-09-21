import Link from "next/link";

import { Rail } from "@/components/ui/Section";
import { cta } from "@/lib/site";
import { BrandLogo } from "./BrandLogo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/**
 * Floats on the page ground above the first slab. Nav sits centred, the single
 * primary action sits right as a pill.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-page/85 backdrop-blur-md">
      <Rail width="wide">
        <div className="flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center px-2" aria-label="ASTHERA home">
            <BrandLogo className="h-10 w-auto sm:h-11" priority />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <NavLinks />
          </nav>

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
      </Rail>
    </header>
  );
}
