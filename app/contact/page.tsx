import { LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, pageMeta } from "@/lib/seo";
import { contact, site, socials } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Get in touch with ASTHERA in Kaduna, Nigeria, for partnerships, programme requests, press enquiries and speaking invitations.",
  path: "/contact",
});

const routes = [
  { label: "Partnerships and funding", email: contact.partnerships },
  { label: "Press and interviews", email: contact.press },
  { label: "Everything else", email: contact.general },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: "Contact", path: "/contact" }])} />

      <PageHeader
        badge="Contact"
        title={
          <>
            Get in <span className="accent-word">touch</span>.
          </>
        }
        lede="ASTHERA is a small team based in Kaduna. Messages reach the founder directly."
      />

      <Section>
        <Rail className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl leading-[1.08] tracking-[-0.03em] text-text">Direct email</h2>

            <ul className="mt-8 grid gap-4">
              {routes.map((route) => (
                <li key={route.email} className="rounded-card bg-surface px-6 py-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-faint">
                    {route.label}
                  </p>
                  <a
                    href={`mailto:${route.email}`}
                    className="mt-2 inline-block text-sm text-accent underline underline-offset-4 transition-colors duration-200 hover:text-accent-bright"
                  >
                    {route.email}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl leading-[1.08] tracking-[-0.03em] text-text">Elsewhere</h2>
            <div className="mt-6 flex gap-3">
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-pill bg-surface px-5 py-2.5 text-sm text-text-dim transition-colors duration-200 hover:bg-accent hover:text-on-accent"
              >
                <LinkedinLogo size={16} />
                LinkedIn
              </a>
              <a
                href={socials.x}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-pill bg-surface px-5 py-2.5 text-sm text-text-dim transition-colors duration-200 hover:bg-accent hover:text-on-accent"
              >
                <XLogo size={16} />X
              </a>
            </div>

            <p className="mt-12 text-sm leading-relaxed text-text-dim">
              {site.city}, {site.region}
              <br />
              {site.country}
            </p>
          </div>

          <div className="rounded-card border border-line p-7 sm:p-9">
            <h2 className="text-3xl leading-[1.08] tracking-[-0.03em] text-text">Send a message</h2>
            <p className="mt-3 mb-9 text-sm leading-relaxed text-text-dim">
              Pick the closest topic and we will route it correctly.
            </p>
            <EnquiryForm defaultTopic="other" />
          </div>
        </div>
      </Rail>
      </Section>
    </>
  );
}
