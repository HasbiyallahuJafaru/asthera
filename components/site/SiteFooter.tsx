import { LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/primitives/tooltip";
import { Rail, Section } from "@/components/ui/Section";
import { contact, site, socials } from "@/lib/site";
import { BrandLogo } from "./BrandLogo";

const columns = [
  {
    heading: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/work", label: "Our work" },
      { href: "/founder", label: "Founder" },
      { href: "/journal", label: "Journal" },
    ],
  },
  {
    heading: "Work with us",
    links: [
      { href: "/partner", label: "Partner with us" },
      { href: "/work/stem-space-education", label: "Education sessions" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "For press",
    links: [
      { href: "/press", label: "Press kit" },
      { href: "/press", label: "Biographies" },
      { href: "/feed.xml", label: "RSS feed" },
    ],
  },
];

export function SiteFooter() {
  return (
    <Section as="footer" tone="navy" curve="tl-br" arc={{ x: 18, y: 26, rx: 38, ry: 24, rotate: 21, colour: "light", opacity: 0.3 }}>
      <Rail width="wide" className="py-20 lg:py-24">
      
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(3,0.8fr)_1fr] lg:gap-10">
          <div className="max-w-xs">
            <BrandLogo className="h-14 w-auto" variant="light" />
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Space intelligence, Earth observation and STEM education. Bridging the stars and the
              soil.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-sm font-medium text-on-navy">{column.heading}</h2>
              <ul className="mt-5 grid gap-3">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm font-medium text-on-navy">Follow us</h2>
            <div className="mt-5 flex items-center gap-2.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="ASTHERA on LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-pill border border-white/25 text-white/80 transition-colors duration-200 hover:border-gold hover:text-gold"
                  >
                    <LinkedinLogo size={18} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>ASTHERA on LinkedIn</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={socials.x}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Fauziyya Auwal Muhammad on X"
                    className="flex h-10 w-10 items-center justify-center rounded-pill border border-white/25 text-white/80 transition-colors duration-200 hover:border-gold hover:text-gold"
                  >
                    <XLogo size={18} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Fauziyya Auwal Muhammad on X</TooltipContent>
              </Tooltip>
            </div>

            <a
              href={`mailto:${contact.general}`}
              className="mt-7 inline-block text-sm text-white/70 transition-colors duration-200 hover:text-gold"
            >
              {contact.general}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/55">
            {new Date().getFullYear()} {site.name}. {site.city}, {site.country}.
          </p>
          <p className="text-xs text-white/55">
            Claims on this site link to the reporting they come from.
          </p>
        </div>
      </Rail>
    </Section>
  );
}
