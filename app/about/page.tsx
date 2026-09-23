import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, faqGraph, pageMeta } from "@/lib/seo";
import { approach, cta, practices, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About ASTHERA",
  description:
    "ASTHERA is a Nigerian space-intelligence company based in Kaduna. We turn satellite, Earth-observation and geospatial data into practical intelligence, and develop young African talent in space and technology.",
  path: "/about",
});

/** The eight core goals from the company profile, grouped by what they build. */
const goals = [
  {
    heading: "Intelligence",
    items: [
      "Develop practical space-intelligence solutions from Earth-observation and geospatial data.",
      "Apply satellite data to environmental, climate, agricultural and disaster-risk problems.",
      "Build tools for flood-risk monitoring and early warning.",
      "Support data-driven agricultural and environmental decisions.",
    ],
  },
  {
    heading: "People",
    items: [
      "Develop young people through STEM, space education, mentorship and practical technology programmes.",
      "Raise awareness and practical use of space technology in Nigeria and across Africa.",
    ],
  },
  {
    heading: "Institution",
    items: [
      "Partner with government, universities, research bodies, companies, NGOs and international organisations.",
      "Build an African company able to develop scalable space-technology products and services.",
    ],
  },
];

const faqs = [
  {
    question: "What is ASTHERA?",
    answer:
      "ASTHERA is a Nigerian space-technology and space-intelligence company. It turns satellite, Earth-observation and geospatial data into clear, practical intelligence for problems such as flood risk, agriculture, climate resilience and environmental monitoring, and it runs STEM and space education for young people.",
  },
  {
    question: "Does ASTHERA just supply satellite data?",
    answer:
      "No. ASTHERA's focus is interpretation. It works from a real problem, chooses the data that fits, analyses it and delivers intelligence that supports a decision, rather than handing over raw imagery.",
  },
  {
    question: "Who founded ASTHERA?",
    answer:
      "ASTHERA was founded by Fauziyya Auwal Muhammad, an astrophysicist and Graduate Assistant in the Department of Physics at Kaduna State University. She is also an astronaut candidate with Titans Space Industries.",
  },
  {
    question: "Where is ASTHERA based?",
    answer:
      "ASTHERA is based in Kaduna, Kaduna State, Nigeria, and works on challenges across Nigeria and the wider African continent.",
  },
  {
    question: "How can an organisation work with ASTHERA?",
    answer:
      "Government bodies, universities, research organisations, companies, NGOs and international organisations can start a conversation through the partnership page. Work ranges from intelligence projects and technical support to research collaboration and education programmes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: "About", path: "/about" }])} />
      <JsonLd data={faqGraph(faqs)} />

      <PageHeader
        badge="About us"
        title={
          <>
            Space technology, <span className="accent-word">read for the ground</span>.
          </>
        }
        lede="ASTHERA is a Nigerian space-technology and space-intelligence company. We turn satellite, Earth-observation and geospatial data into clear, practical intelligence for the challenges people face on the ground."
      />

      <Section>
        <Rail className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <Reveal>
              <div className="prose-asthera">
                <p>
                  Satellites pass over every river basin, farm and forest in Africa, again and
                  again. Little of what they record reaches the people who could use it, and what
                  does usually arrives as raw data that needs a specialist to read.
                </p>
                <p>
                  ASTHERA closes that gap. We connect space technology with needs on the ground,
                  especially environmental monitoring, climate resilience, flood risk and
                  agriculture. We interpret space-derived information and translate it into
                  intelligence that governments, institutions, businesses and communities can
                  base decisions on.
                </p>

                <h2>Vision</h2>
                <p>
                  To become a leading African space-intelligence company, using space technology,
                  Earth observation and data innovation to address real-world challenges and
                  contribute to sustainable development.
                </p>

                <h2>Mission</h2>
                <p>
                  To transform satellite and geospatial data into practical intelligence that helps
                  organisations understand environmental and societal challenges, make informed
                  decisions and build resilience, while developing the next generation of African
                  space and technology talent.
                </p>
              </div>
            </Reveal>

            <MediaSlot
              name="about-fieldwork"
              alt="ASTHERA analysing satellite imagery of a Nigerian landscape"
              brief="The team at work: satellite imagery on screen, fieldwork, or a session with students. Real setting."
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
              What we are working towards
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
            {goals.map((group, index) => (
              <Reveal key={group.heading} delay={index * 0.06}>
                <h3 className="border-t border-text/15 pt-5 text-xl tracking-tight text-text">
                  {group.heading}
                </h3>
                <ul className="mt-5 grid gap-4">
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

          <div className="mt-14">
            <Button href="/work" variant="secondary">
              See our work
            </Button>
          </div>
        </Rail>
      </Section>

      <Section>
        <Rail className="py-20 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <Reveal>
              <Badge>How we work</Badge>
              <h2 className="mt-6 text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
                Problem first, data second
              </h2>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-text-dim">
                We start by understanding the problem and who has to act on it. Only then do we
                pick the data and the method. The output is judged by one test: is it useful to
                the person it was made for?
              </p>
            </Reveal>

            <ol className="divide-y divide-line overflow-hidden rounded-card border border-line">
              {approach.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 0.05}>
                  <div className="grid gap-1 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <span className="text-base text-text">{step.title}</span>
                    <span className="text-sm leading-relaxed text-text-dim">{step.body}</span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="mt-24">
            <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
              What we hold to
            </h2>
            <dl className="mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {practices.map((practice, index) => (
                <Reveal key={practice.title} delay={index * 0.04}>
                  <dt className="text-lg tracking-tight text-text">{practice.title}</dt>
                  <dd className="mt-2 max-w-[38ch] text-sm leading-relaxed text-text-dim">
                    {practice.body}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Rail>
      </Section>

      <Section tone="gold" curve="tr-bl">
        <Rail className="py-20 lg:py-28">
          <Reveal className="mx-auto max-w-[46rem] text-center">
            <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
              Where this is going
            </h2>
            <p className="mx-auto mt-6 max-w-[56ch] leading-relaxed text-text-dim">
              ASTHERA is an early-stage company. Over time we intend to grow into a broader African
              space-intelligence and innovation platform, adding technology products, research
              capability, education programmes, partnerships and commercial services. The
              principle stays the same: connect what we can see from space with what needs doing
              on Earth.
            </p>
          </Reveal>
        </Rail>
      </Section>

      <Section tone="navy-wash" curve="tl-br">
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
