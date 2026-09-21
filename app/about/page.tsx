import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, faqGraph, pageMeta } from "@/lib/seo";
import { affiliations, cta, founder, site } from "@/lib/site";
import { getProgrammes } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "About ASTHERA",
  description:
    "ASTHERA is a space-tech and astronomy initiative based in Kaduna, Nigeria, working on astronomy education, STEM outreach and satellite technology applied to African problems.",
  path: "/about",
});

const faqs = [
  {
    question: "What is ASTHERA?",
    answer:
      "ASTHERA is a Nigerian space-tech and astronomy initiative. It works on three fronts: astronomy education, STEM outreach, and the application of satellite and geospatial technology to challenges across Africa including climate monitoring, agriculture, flood management and security.",
  },
  {
    question: "Who founded ASTHERA?",
    answer:
      "ASTHERA was founded by Fauziyya Auwal Muhammad, an astrophysicist and Graduate Assistant in the Department of Physics at Kaduna State University. She is an astronaut candidate with Titans Space Industries and was selected for the 2026 LunAres Research Station analogue mission in Poland.",
  },
  {
    question: "Where is ASTHERA based?",
    answer:
      "ASTHERA is based in Kaduna, Kaduna State, Nigeria, and works with schools, universities and communities across the country.",
  },
  {
    question: "How can an organisation work with ASTHERA?",
    answer:
      "Institutions, funders and universities can start a conversation through the partnership page on astheraspace.com. ASTHERA works on programme funding, research collaboration, equipment and school outreach partnerships.",
  },
];

export default async function AboutPage() {
  const programmes = await getProgrammes();

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: "About", path: "/about" }])} />
      <JsonLd data={faqGraph(faqs)} />

      <PageHeader
        badge="About us"
        title={
          <>
            Africa is not short of <span className="accent-word">sky</span>.
          </>
        }
        lede="ASTHERA is a space-tech and astronomy initiative based in Kaduna, northern Nigeria. We expand access to space and STEM education, and we put satellite and geospatial technology to work on environmental and agricultural systems across Africa."
      />

      <Section>
        <Rail className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <Reveal>
            <div className="prose-asthera">
              <p>
                Nigeria has a space agency, a satellite programme and thousands of physics
                graduates. What it does not have, in any quantity, is a route from a classroom in
                Kaduna to work in space science. Astronomy is barely taught. Most students never
                meet anyone who does this for a living. The talent is not missing. The door is.
              </p>

              <h2>What we work on</h2>
              <p>
                ASTHERA exists to build that door and then hold it open. We teach astronomy where it
                is not taught. We put space science in front of students who have never been offered
                it, with particular attention to girls in northern Nigeria. And we work on the
                applied side, turning satellite and geospatial data into information that is useful
                for flooding, farming, climate and security.
              </p>
              <p>
                Those two halves are the same project. A country that can read its own satellite
                data needs people trained to read it. Training those people is the long game, and
                the applied work is what makes the case for it.
              </p>

              <h2>Why this, and why now</h2>
              <p>
                Space technology already answers questions Nigeria is asking. Where will the water
                go. Which fields are failing. What changed on that ground between last season and
                this one. Those answers currently arrive, when they arrive, from somewhere else.
                Building the capability locally is cheaper, faster and more accountable than
                importing it indefinitely.
              </p>
            </div>
          </Reveal>

          <MediaSlot
            name="outreach-session"
            alt="An ASTHERA outreach session with students"
            brief="Students at an ASTHERA workshop or observation session. Faces engaged, real setting."
            width={800}
            height={1000}
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="self-start"
          />
        </div>
      </Rail>
      </Section>

      <Section tone="green" curve="tl-br">
        <Rail className="py-20 lg:py-28">
        <Reveal className="max-w-[42rem]">
          <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
            The three programmes
          </h2>
          <p className="mt-5 leading-relaxed text-text-dim">
            Each runs independently and feeds the others.
          </p>
        </Reveal>

        <ul className="mt-12 grid">
          {programmes.map((programme, index) => (
            <Reveal as="li" key={programme.slug} delay={index * 0.06}>
              <div className="grid gap-3 border-t border-line py-7 sm:grid-cols-[16rem_1fr] sm:gap-10">
                <h3 className="text-xl tracking-tight text-text">{programme.name}</h3>
                <p className="max-w-[62ch] leading-relaxed text-text-dim">{programme.summary}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12">
          <Button href="/programmes" variant="secondary">
            Programme detail
          </Button>
        </div>
      </Rail>
      </Section>

      <Section>
        <Rail className="py-20 lg:py-28">
        <Reveal className="max-w-[42rem]">
          <Badge>Positions</Badge>
          <h2 className="mt-6 text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
            Where we sit
          </h2>
          <p className="mt-5 leading-relaxed text-text-dim">
            {founder.name} holds each of these positions. Listing them is not a claim that these
            institutions endorse ASTHERA.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {affiliations.map((entry, index) => (
            <Reveal as="li" key={entry.name} delay={index * 0.05}>
              <div className="h-full rounded-card border border-line px-6 py-6">
                <h3 className="text-base text-text">
                  {entry.url ? (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-accent"
                    >
                      {entry.name}
                    </a>
                  ) : (
                    entry.name
                  )}
                </h3>
                <p className="mt-2 text-sm text-text-dim">{entry.relation}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Rail>
      </Section>

      <Section tone="navy-wash" curve="tr-bl">
        <Rail className="py-20 lg:py-28">
        <Reveal className="max-w-[42rem]">
          <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
            Common questions
          </h2>
        </Reveal>

        <dl className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-16">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.05}>
              <dt className="text-lg tracking-tight text-text">{faq.question}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-text-dim">{faq.answer}</dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-14 flex flex-wrap gap-3">
          <Button href={cta.partner.href}>{cta.partner.label}</Button>
          <Button href="/contact" variant="secondary">
            Contact {site.name}
          </Button>
        </div>
      </Rail>
      </Section>
    </>
  );
}
