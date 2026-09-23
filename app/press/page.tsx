import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { CopyBlock } from "@/components/site/CopyBlock";
import { Badge } from "@/components/ui/Badge";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, pageMeta } from "@/lib/seo";
import { contact, founder, site } from "@/lib/site";
import { getPressItems } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Press and media kit",
  description:
    "Press resources for ASTHERA and founder Fauziyya Auwal Muhammad: approved biographies, correct name spellings, fact sheet, photographs and coverage index.",
  path: "/press",
});

const bios = {
  short:
    "Fauziyya Auwal Muhammad is a Nigerian astrophysicist, astronaut candidate with Titans Space Industries, and founder of ASTHERA, a space-intelligence company based in Kaduna.",
  medium:
    "Fauziyya Auwal Muhammad is a Nigerian astrophysicist and founder of ASTHERA, a space-intelligence company that turns satellite and geospatial data into practical intelligence for flood risk, agriculture and climate, and runs STEM and space education for young Africans. A Graduate Assistant in the Department of Physics at Kaduna State University, she is an astronaut candidate with Titans Space Industries and was selected for the 2026 LunAres Research Station analogue mission in Poland.",
  long:
    "Fauziyya Auwal Muhammad is a Nigerian astrophysicist, space advocate and founder of ASTHERA, a Nigerian space-intelligence company that turns satellite, Earth-observation and geospatial data into decision-ready intelligence and develops young African talent in space and technology. Born in Igabi Local Government Area of Kaduna State, she took a first-class degree in physics at Kaduna State University, where she is now a Graduate Assistant while completing a master's specialising in astrophysics and space science education. In 2024 she presented research on external galaxies at an international astronomy and astrophysics conference and won an astronomy and astrophysics competition. Her paper on astronomy outreach in Nigeria, Stellar Horizons, is indexed on NASA ADS. She is an astronaut candidate with Titans Space Industries, reported as Nigeria's first, and was selected for the 2026 LunAres Research Station analogue mission in Poland, reported as Nigeria's first female analogue astronaut. In September 2026 she was named a beneficiary of the Kaduna State Government innovator fund. Her stated goal is to establish an astronomy department at Kaduna State University.",
};

const factSheet = [
  { term: "Organisation", value: "ASTHERA, a space-intelligence company" },
  { term: "Tagline", value: "Bridging the stars and the soil" },
  { term: "Founder and Chief Executive", value: founder.name },
  { term: "Based in", value: `${site.city}, ${site.region}, ${site.country}` },
  { term: "What it does", value: "Space intelligence, Earth observation, STEM education" },
  {
    term: "Founder's position",
    value: "Graduate Assistant, Department of Physics, Kaduna State University",
  },
  { term: "Astronaut programme", value: "Titans Space Industries, training begins 2026" },
  { term: "Analogue mission", value: "LunAres Research Station, Poland, 2026" },
  { term: "Also serves as", value: "PMO Admin Lead, Space Economic Forum 2026" },
  { term: "Website", value: "astheraspace.com" },
];

export default async function PressPage() {
  const coverage = await getPressItems();

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: "Press", path: "/press" }])} />

      <PageHeader
        badge="Press"
        title={
          <>
            Press and <span className="accent-word">media kit</span>.
          </>
        }
        lede={
          <>
            Approved biographies, the correct spellings, a fact sheet and photographs. For
            interviews and speaking requests, write to{" "}
            <a
              href={`mailto:${contact.press}`}
              className="text-accent underline underline-offset-4 hover:text-accent-bright"
            >
              {contact.press}
            </a>
            .
          </>
        }
      />

      <Section>
        <Rail className="py-20 lg:py-28">
        <Reveal className="max-w-[46rem]">
          <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
            Getting the name right
          </h2>
          <p className="mt-5 leading-relaxed text-text-dim">
            Her name is published three different ways. The first is correct. The others are in
            circulation and refer to the same person.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-card bg-accent-soft px-6 py-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">Correct</p>
            <p className="mt-2.5 font-medium text-text">{founder.name}</p>
          </div>
          {founder.alternateNames.map((name) => (
            <div key={name} className="rounded-card border border-line px-6 py-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-faint">
                Also seen
              </p>
              <p className="mt-2.5 text-text-dim">{name}</p>
            </div>
          ))}
        </div>

        <p className="mt-7 max-w-[62ch] text-sm leading-relaxed text-text-dim">
          The company she is an astronaut candidate with is{" "}
          <strong className="font-medium text-text">Titans Space Industries</strong>, frequently
          printed as Titan Space Industries.
        </p>
      </Rail>
      </Section>

      <Section tone="green" curve="tl-br">
        <Rail className="py-20 lg:py-28">
        <Reveal className="max-w-[46rem]">
          <Badge>Biographies</Badge>
          <h2 className="mt-6 text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
            Copy and use as written
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <CopyBlock label="Short" text={bios.short} wordCount={26} />
          </Reveal>
          <Reveal delay={0.06}>
            <CopyBlock label="Medium" text={bios.medium} wordCount={59} />
          </Reveal>
          <Reveal delay={0.12}>
            <CopyBlock label="Full" text={bios.long} wordCount={196} />
          </Reveal>
        </div>
      </Rail>
      </Section>

      <Section>
        <Rail className="py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
              Fact sheet
            </h2>
            <dl className="mt-9 grid gap-5">
              {factSheet.map((row) => (
                <div key={row.term} className="border-b border-line pb-5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-faint">
                    {row.term}
                  </dt>
                  <dd className="mt-1.5 text-sm text-text">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
              Photographs
            </h2>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-text-dim">
              Free to use in coverage of ASTHERA and its founder. Please credit as supplied.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <MediaSlot
                name="press-headshot-1"
                alt={`${founder.name}, press headshot`}
                brief="High resolution headshot, neutral expression, suitable for print."
                width={800}
                height={1000}
                sizes="(min-width: 640px) 25vw, 50vw"
              />
              <MediaSlot
                name="press-headshot-2"
                alt={`${founder.name} at work`}
                brief="Working shot: teaching, presenting or in the lab."
                width={800}
                height={1000}
                sizes="(min-width: 640px) 25vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Rail>
      </Section>

      <Section tone="navy-wash" curve="tr-bl">
        <Rail className="py-20 lg:py-28">
        <Reveal className="max-w-[46rem]">
          <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
            Coverage
          </h2>
          <p className="mt-5 leading-relaxed text-text-dim">
            Reporting on ASTHERA and its founder.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {coverage.map((item, index) => (
            <Reveal as="li" key={item.url} delay={(index % 2) * 0.05}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col rounded-card border border-line px-6 py-5 transition-colors duration-200 hover:border-line-strong"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                  {item.outlet}
                </span>
                <span className="mt-2.5 flex items-start gap-2 text-sm leading-snug text-text">
                  {item.title}
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-text-faint transition-transform duration-200 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Rail>
      </Section>
    </>
  );
}
