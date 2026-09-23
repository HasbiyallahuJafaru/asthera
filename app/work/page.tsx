import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Button, TextLink } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, pageMeta } from "@/lib/seo";
import { cta, services } from "@/lib/site";
import { getProgrammes } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Our work",
  description:
    "ASTHERA works across space intelligence and Earth observation, flood and climate intelligence, agricultural and environmental intelligence, STEM and space education, and youth innovation.",
  path: "/work",
});

export default async function WorkPage() {
  const areas = await getProgrammes();

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: "Our work", path: "/work" }])} />

      <PageHeader
        badge="Our work"
        title={
          <>
            From orbit to a <span className="accent-word">decision</span>.
          </>
        }
        lede="Four areas turn space data into intelligence. Two build the people who will produce it. Each one starts from a problem on the ground."
      />

      {areas.map((area, index) => {
        /*
          Two alternating splits, then a stacked full-width slab, repeated.
          Three image-beside-text rows in a row is what makes a page read as
          templated.
        */
        const stacked = index % 3 === 2;

        const copy = (
          <div>
            <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
              {area.name}
            </h2>
            <p className="mt-6 max-w-[56ch] leading-relaxed text-text-dim">{area.summary}</p>

            {area.outcomes.length > 0 ? (
              <ul className="mt-8 grid gap-3">
                {area.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm text-text-dim">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                    {outcome}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-9">
              <TextLink href={`/work/${area.slug}`}>Full detail</TextLink>
            </div>
          </div>
        );

        const media = (
          <MediaSlot
            name={`work-${area.slug}`}
            alt={area.name}
            brief="Imagery for this area: satellite imagery of a Nigerian landscape, fieldwork, or a session with students."
            width={stacked ? 1600 : 1000}
            height={stacked ? 720 : 860}
            sizes={stacked ? "(min-width: 1480px) 1400px, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
            className={stacked ? "" : "min-h-[320px]"}
          />
        );

        return (
          <Section
            key={area.slug}
            {...(index % 2 === 1 ? { tone: "green" as const, curve: "tl-br" as const } : {})}
          >
            <Rail className="py-20 lg:py-28">
              <Reveal>
                {stacked ? (
                  <div className="grid gap-10">
                    {media}
                    <div className="max-w-[46rem]">{copy}</div>
                  </div>
                ) : (
                  <div
                    className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                      index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {media}
                    {copy}
                  </div>
                )}
              </Reveal>
            </Rail>
          </Section>
        );
      })}

      <Section>
        <Rail className="py-20 lg:py-28">
          <Reveal className="max-w-[42rem]">
            <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
              Services
            </h2>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-text-dim">
              What we can take on today. The list will grow as we develop and validate new
              products and methods.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
            {services.map((group, index) => (
              <Reveal key={group.group} delay={index * 0.06}>
                <h3 className="border-t border-text/15 pt-5 text-xl tracking-tight text-text">
                  {group.group}
                </h3>
                <ul className="mt-5 grid gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-dim">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Rail>
      </Section>

      <Section tone="navy" curve="tr-bl">
        <Rail className="py-20 lg:py-28">
          <Reveal className="mx-auto max-w-[44rem] text-center">
            <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.035em] text-on-navy">
              Have a problem the data could answer?
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] leading-relaxed text-white/80">
              Government bodies, universities, companies, NGOs and funders can bring us a
              challenge, a research question or a group of students.
            </p>
            <div className="mt-9 flex justify-center">
              <Button href={cta.partner.href} variant="on-navy">
                {cta.partner.label}
                <ArrowRight size={16} weight="bold" />
              </Button>
            </div>
          </Reveal>
        </Rail>
      </Section>
    </>
  );
}
