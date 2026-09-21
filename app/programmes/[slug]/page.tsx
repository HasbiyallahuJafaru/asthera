import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";
import { getProgrammes } from "@/sanity/queries";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const programmes = await getProgrammes();
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const programmes = await getProgrammes();
  const programme = programmes.find((entry) => entry.slug === slug);

  if (!programme) return {};

  return pageMeta({
    title: programme.name,
    description: programme.summary,
    path: `/programmes/${programme.slug}`,
  });
}

export default async function ProgrammePage({ params }: Params) {
  const { slug } = await params;
  const programmes = await getProgrammes();
  const programme = programmes.find((entry) => entry.slug === slug);

  if (!programme) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Programmes", path: "/programmes" },
          { name: programme.name, path: `/programmes/${programme.slug}` },
        ])}
      />

      <Section as="div">
        <Rail className="py-16 lg:py-24">
        <article>
          <div className="mx-auto max-w-[46rem]">
            <Badge>Programme</Badge>
            <h1 className="mt-6 text-balance text-[2.5rem] leading-[1.04] tracking-[-0.03em] text-text sm:text-5xl">
              {programme.name}
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-text-dim">{programme.summary}</p>
          </div>

          <MediaSlot
            name={`programme-${programme.slug}`}
            alt={programme.name}
            brief="Lead image for this programme page. Landscape, from a real session."
            width={1400}
            height={800}
            sizes="(min-width: 1480px) 1300px, 100vw"
            className="my-14"
          />

          <div className="mx-auto max-w-[46rem]">
            {programme.body ? (
              <RichText value={programme.body} />
            ) : (
              <div className="prose-asthera">
                <p>{programme.detail}</p>
              </div>
            )}

            {programme.outcomes.length > 0 ? (
              <Reveal className="mt-14 rounded-card bg-surface p-7 sm:p-9">
                <h2 className="text-lg tracking-tight text-text">What this delivers</h2>
                <ul className="mt-5 grid gap-3">
                  {programme.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-text-dim">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <div className="mt-14 flex flex-wrap gap-3">
              <Button href={cta.partner.href}>{cta.partner.label}</Button>
              <Button href="/programmes" variant="secondary">
                All programmes
              </Button>
            </div>
          </div>
        </article>
      </Rail>
      </Section>
    </>
  );
}
