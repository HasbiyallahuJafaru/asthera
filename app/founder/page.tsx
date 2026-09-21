import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Cite } from "@/components/ui/Cite";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, pageMeta, videoGraph } from "@/lib/seo";
import { affiliations, citations, cta, founder, videos } from "@/lib/site";
import { getMilestones } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: `${founder.name}, astronaut candidate and founder of ASTHERA`,
  description:
    "Fauziyya Auwal Muhammad is a Nigerian astrophysicist, astronaut candidate with Titans Space Industries, and founder of ASTHERA. Reported as Nigeria's first female analogue astronaut, selected for the 2026 LunAres mission in Poland.",
  path: "/founder",
  type: "profile",
});

const education = [
  { label: "BSc Physics, first-class honours", detail: "Kaduna State University" },
  {
    label: "MSc in progress",
    detail: "Astrophysics and space science education, Kaduna State University",
  },
  {
    label: "Research internship, Zambia",
    detail: "Reported as the first Nigerian woman in her field to complete it",
    citation: citations.zambia,
  },
  {
    label: "Government Secondary School, Rigachikun",
    detail: "Igabi Local Government Area, Kaduna State",
  },
];

const mentors = [
  { name: "Prof. Rabiah Sa'ad", detail: "Astrophysicist, Bayero University" },
  { name: "Dr. Lawal Hameed Adeniyi", detail: "Air Force Institute of Technology" },
  { name: "Department of Physics faculty", detail: "Kaduna State University" },
];

export default async function FounderPage() {
  const milestones = await getMilestones();

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: "Founder", path: "/founder" }])} />
      {videos[0] ? (
        <JsonLd
          data={videoGraph({
            id: videos[0].id,
            title: videos[0].title,
            description:
              "Fauziyya Auwal Muhammad on her route into astronomy, mentorship, working in a male dominated field, and what space science can do for Nigeria.",
            poster: videos[0].poster,
            uploadDate: "2025-12-27",
          })}
        />
      ) : null}

      <Section>
        <Rail width="wide" className="py-12 lg:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
          <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <Badge>Founder</Badge>

            <h1 className="mt-6 text-balance text-[2.5rem] leading-[1.04] tracking-[-0.03em] text-text sm:text-5xl lg:text-[3.5rem]">
              {founder.name}
            </h1>

            <p className="mt-7 max-w-[50ch] text-lg leading-relaxed text-text-dim">
              Astrophysicist, astronaut candidate, and founder of ASTHERA. She is building the route
              into space science that she had to improvise for herself.
            </p>

            <ul className="mt-8 grid gap-2.5">
              {founder.roles.map((role) => (
                <li key={role} className="flex gap-3 text-sm text-text-dim">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                  {role}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button href={cta.press.href} variant="secondary">
                {cta.press.label}
              </Button>
            </div>
          </div>

          <MediaSlot
            name="fauziyya-founder-hero"
            alt={`${founder.name}, founder of ASTHERA`}
            brief="Second portrait, different from the homepage image."
            width={900}
            height={1000}
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="min-h-[420px]"
            rounded={false}
          />
        </div>
      </Rail>
      </Section>

      <Section>
        <Rail className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.68fr] lg:gap-16">
          <Reveal>
            <div className="prose-asthera">
              <p>
                Fauziyya Auwal Muhammad was born in Igabi Local Government Area of Kaduna State and
                went to school in Rigachikun. Her interest in astronomy started in childhood and was
                largely self-taught, assembled online from whatever she could find, because the
                subject was not on offer around her.
              </p>
              <p>
                She read physics at Kaduna State University and graduated with first-class honours.
                She is now a Graduate Assistant in the same department, teaching while she completes
                a master&apos;s specialising in astrophysics and space science education. In 2024 she
                presented a paper on external galaxies at an international astronomy and
                astrophysics conference and won an astronomy and astrophysics competition.
              </p>

              <h2>Astronaut candidacy</h2>
              <p>
                She is an astronaut candidate with Titans Space Industries, reported as the first
                from Nigeria and the first woman in the company&apos;s candidate group. Structured
                training, including advanced space science coursework, begins in 2026. She was also
                selected for the LunAres Research Station analogue mission in Poland, reported as
                Nigeria&apos;s first female analogue astronaut. Some outlets print the company name
                as Titan Space Industries; the correct name is Titans Space Industries.
              </p>
              <p>
                Her interest in the candidacy is not the flight. It is what a Nigerian in that seat
                makes possible for the students behind her.
              </p>

              <h2>Why ASTHERA exists</h2>
              <p>
                She founded ASTHERA to apply space science to Nigeria&apos;s actual problems,
                climate, agriculture, flood management and security, and to make astronomy teachable
                here. Her stated goal is to establish an astronomy department at Kaduna State
                University so the next student does not have to assemble the subject alone from the
                internet.
              </p>

              <blockquote>I want to come back and bring positive change to my society.</blockquote>
            </div>

            <div className="mt-4">
              <Cite citation={citations.tenFacts} label="Quoted in Legit.ng" />
            </div>
          </Reveal>

          <div className="grid gap-10 self-start">
            {[
              { heading: "Education", items: education.map((e) => ({ title: e.label, detail: e.detail, citation: e.citation })) },
              { heading: "Positions", items: affiliations.map((a) => ({ title: a.name, detail: a.relation, citation: undefined })) },
              { heading: "Mentors she credits", items: mentors.map((m) => ({ title: m.name, detail: m.detail, citation: undefined })) },
            ].map((group) => (
              <div key={group.heading} className="rounded-card border border-line p-6">
                <h2 className="text-sm font-medium text-text">{group.heading}</h2>
                <ul className="mt-5 grid gap-5">
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <p className="text-sm text-text">{item.title}</p>
                      <p className="mt-1 text-sm text-text-dim">{item.detail}</p>
                      {item.citation ? (
                        <div className="mt-1.5">
                          <Cite citation={item.citation} />
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Rail>
      </Section>

      <Section tone="green" curve="tl-br">
        <Rail className="py-20 lg:py-28">
        <Reveal className="max-w-[42rem]">
          <Badge>The record</Badge>
          <h2 className="mt-6 text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
            Every claim, with its source
          </h2>
          <p className="mt-5 leading-relaxed text-text-dim">
            Each entry links to the reporting or the publication it comes from.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((milestone, index) => (
            <Reveal as="li" key={`${milestone.period}-${milestone.title}`} delay={(index % 3) * 0.06}>
              <div className="flex h-full flex-col rounded-card border border-line p-6">
                <span className="inline-flex w-fit rounded-pill bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-text-dim">
                  {milestone.period}
                </span>
                <h3 className="mt-4 text-lg leading-snug tracking-tight text-text">
                  {milestone.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-text-dim">
                  {milestone.body}
                </p>
                {milestone.citation ? (
                  <div className="mt-4">
                    <Cite
                      citation={milestone.citation}
                      label={`Source: ${milestone.citation.outlet}`}
                    />
                  </div>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </Rail>
      </Section>

      {videos.length > 0 ? (
        <Section tone="green" curve="tl-br">
          <Rail width="wide" className="py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
              <Reveal variant="left" className="lg:col-span-4 lg:pt-8">
                <Badge tone="page">In her own words</Badge>
                <h2 className="mt-7 text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text">
                  The <span className="accent-word">interview</span>.
                </h2>
                <p className="mt-6 max-w-[40ch] leading-relaxed text-text-dim">
                  On her route into astronomy, mentorship, working in a male dominated field, and
                  what space science can do for Nigeria.
                </p>
              </Reveal>

              <Reveal variant="right" delay={0.1} className="lg:col-span-7 lg:col-start-6">
                <VideoEmbed {...videos[0]} />
              </Reveal>
            </div>
          </Rail>
        </Section>
      ) : null}

      <Section>
        <Rail className="py-20 lg:py-28">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <blockquote className="text-balance text-3xl leading-snug tracking-tight text-text sm:text-4xl">
            Consistency, dedication and patience might take you beyond the stars.
          </blockquote>
          <div className="mt-5">
            <Cite citation={citations.firstCandidate} label="Daily Trust interview" />
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button href={cta.partner.href}>
              {cta.partner.label}
              <ArrowRight size={16} weight="bold" />
            </Button>
            <Button href="/about" variant="secondary">
              About ASTHERA
            </Button>
          </div>
        </Reveal>
      </Rail>
      </Section>
    </>
  );
}
