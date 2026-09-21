import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Button, TextLink } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";
import { getProgrammes } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Programmes",
  description:
    "ASTHERA runs three programmes: astronomy education in Nigerian classrooms, STEM outreach with schools and communities, and applied satellite and geospatial technology for climate, agriculture and flood monitoring.",
  path: "/programmes",
});

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: "Programmes", path: "/programmes" }])} />

      <PageHeader
        badge="Programmes"
        title={
          <>
            Three programmes, <span className="accent-word">one argument</span>.
          </>
        }
        lede="Teach the subject where it is not taught. Put it in front of students who have never been offered it. And prove its worth on problems Nigeria has right now."
      />

      {programmes.map((programme, index) => {
        /*
          Two alternating splits, then a stacked full-width slab. Three
          image-beside-text rows in a row is what makes a page read as
          templated.
        */
        const stacked = index === 2;

        const copy = (
          <div>
            <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
              {programme.name}
            </h2>
            <p className="mt-6 max-w-[56ch] leading-relaxed text-text-dim">{programme.summary}</p>

            {programme.outcomes.length > 0 ? (
              <ul className="mt-8 grid gap-3">
                {programme.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm text-text-dim">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                    {outcome}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-9">
              <TextLink href={`/programmes/${programme.slug}`}>Full detail</TextLink>
            </div>
          </div>
        );

        const media = (
          <MediaSlot
            name={`programme-${programme.slug}`}
            alt={programme.name}
            brief="Photography from this programme: a workshop, an observation night, fieldwork, or students at work."
            width={stacked ? 1600 : 1000}
            height={stacked ? 720 : 860}
            sizes={stacked ? "(min-width: 1480px) 1400px, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
            className={stacked ? "" : "min-h-[320px]"}
          />
        );

        return (
          <Section key={programme.slug}{...(index % 2 === 1 ? { tone: "green" as const, curve: "tl-br" as const } : {})}>
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

      <Section tone="navy" curve="tr-bl">
        <Rail className="py-20 lg:py-28">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.035em] text-on-navy">
            These programmes run on funding and access.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] leading-relaxed text-white/80">
            Schools, universities, agencies and funders who want to host a session or support a
            programme can reach us directly.
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
