import {
  ArrowRight,
  ChalkboardTeacher,
  MoonStars,
  Rocket,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

import { NewsletterForm } from "@/components/site/NewsletterForm";
import { Badge } from "@/components/ui/Badge";
import { Button, TextLink } from "@/components/ui/Button";
import { Cite } from "@/components/ui/Cite";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { ProgrammeList } from "@/components/ui/ProgrammeList";
import { Reveal } from "@/components/ui/Reveal";
import { Rail, Section } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { citations, cta, founder, site } from "@/lib/site";
import { getMilestones, getPosts, getProgrammes } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "ASTHERA | Using space data to solve Earth problems",
  description:
    "ASTHERA is a Nigerian space-tech and astronomy initiative founded by astronaut candidate Fauziyya Auwal Muhammad. Astronomy education, STEM outreach, and satellite technology applied to Africa's climate, agriculture and security.",
  path: "/",
});

/**
 * Sourced standing. Column spans are deliberately unequal and each item sits on
 * its own baseline, so the row reads as set rather than as a four-up grid.
 */
const standing = [
  {
    figure: "First",
    label: "Nigerian astronaut candidate",
    citation: citations.firstCandidate,
    span: "lg:col-span-4",
    shift: "",
  },
  {
    figure: "First",
    label: "Nigerian woman as analogue astronaut",
    citation: citations.analogueAstronaut,
    span: "lg:col-span-3",
    shift: "lg:translate-y-8",
  },
  {
    figure: "2026",
    label: "LunAres mission, Poland",
    citation: citations.analogueAstronaut,
    span: "lg:col-span-2",
    shift: "lg:-translate-y-3",
  },
  {
    figure: "Funded",
    label: "Kaduna State innovator fund",
    citation: citations.grant,
    span: "lg:col-span-3",
    shift: "lg:translate-y-5",
  },
];

const positions = [
  {
    icon: Rocket,
    title: "Titans Space Industries",
    body: "Astronaut candidate. Training begins 2026.",
  },
  {
    icon: MoonStars,
    title: "LunAres Research Station",
    body: "Selected for the 2026 analogue mission in Poland.",
  },
  {
    icon: ChalkboardTeacher,
    title: "Kaduna State University",
    body: "Graduate Assistant, Department of Physics.",
  },
];

const reportedBy = [
  { outlet: "Daily Trust", url: "https://dailytrust.com/meet-nigerias-budding-astronaut/" },
  {
    outlet: "Channels TV",
    url: "https://www.channelstv.com/2026/09/16/gov-sani-redeems-pledge-to-kaduna-innovators/",
  },
  {
    outlet: "Premium Times",
    url: "https://www.premiumtimesng.com/promoted/910207-uba-sani-redeems-pledge-to-kadunas-innovators.html",
  },
  {
    outlet: "Leadership",
    url: "https://leadership.ng/uba-sani-redeems-pledge-to-kadunas-innovators/",
  },
  {
    outlet: "Legit.ng",
    url: "https://www.legit.ng/nigeria/1689919-meet-fauziya-auwal-10-key-facts-nigerias-astronaut-candidate/",
  },
  { outlet: "The Sun", url: "https://thesun.ng/sani-redeems-n30m-pledge-to-kadunas-innovators/" },
];

export default async function HomePage() {
  const [programmes, milestones, posts] = await Promise.all([
    getProgrammes(),
    getMilestones(),
    getPosts(3),
  ]);

  const recent = [...milestones].reverse().slice(0, 3);

  return (
    <>
      {/* Hero. Copy holds 7 of 12 columns on the left; the portrait hangs lower
          and runs past the rail on the right. */}
      <Section arc={{ x: 80, y: 16, rx: 44, ry: 27, rotate: -17, colour: "gold", opacity: 0.55 }}>
        <Rail width="wide" className="pt-8 pb-20 lg:pt-12 lg:pb-28">
          <div className="grid items-start gap-y-14 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7 lg:pt-6">
              <Reveal variant="fade">
                <Badge icon={Rocket}>{site.tagline}</Badge>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-7 max-w-[15ch] text-[2.75rem] leading-[0.98] tracking-[-0.035em] text-text sm:text-[3.75rem] lg:text-[4.75rem]">
                  Space science, <span className="accent-word">built here</span>.
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-text-dim lg:ml-14">
                  ASTHERA brings astronomy into Nigerian classrooms and turns satellite data into
                  answers for flooding, farming and climate.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10 max-w-md lg:ml-14">
                  <NewsletterForm source="hero" />
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="mt-6 text-sm text-text-faint lg:ml-14">
                  Reported by{" "}
                  {reportedBy.slice(0, 3).map((item, index) => (
                    <span key={item.url}>
                      {index > 0 ? ", " : ""}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-text-dim underline decoration-gold decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent"
                      >
                        {item.outlet}
                      </a>
                    </span>
                  ))}{" "}
                  and others.
                </p>
              </Reveal>
            </div>

            {/* Portrait: pushed down, past the rail, curved on one diagonal. */}
            <div className="relative lg:col-span-5 lg:pt-24">
              <Reveal variant="rise" delay={0.1}>
                <MediaSlot
                  name="fauziyya-portrait"
                  alt={`${founder.name}, founder of ASTHERA`}
                  brief="Portrait of Fauziyya, ideally in flight suit or lab setting. The single most important image on the site."
                  width={900}
                  height={1120}
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  rounded={false}
                  className="rounded-tl-band rounded-br-band lg:-mr-12 xl:-mr-20"
                />
              </Reveal>

              {/* One card breaks out over the image edge. */}
              <Reveal variant="left" delay={0.45}>
                <div className="mt-4 flex items-start gap-3 rounded-card bg-page p-4 shadow-[0_14px_44px_rgba(16,28,46,0.13)] lg:absolute lg:bottom-10 lg:-left-16 lg:mt-0 lg:w-[19rem] xl:-left-24">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-accent-soft text-accent">
                    <MoonStars size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text">LunAres 2026</p>
                    <p className="mt-0.5 text-sm leading-snug text-text-dim">
                      Analogue mission, Poland.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Standing: unequal spans, each on its own baseline. */}
          <ul className="mt-20 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-12">
            {standing.map((item, index) => (
              <Reveal
                as="li"
                key={item.label}
                delay={index * 0.07}
                className={`${item.span} ${item.shift}`}
              >
                <p className="text-[2.5rem] leading-none tracking-[-0.03em] text-navy">
                  {item.figure}
                </p>
                <span aria-hidden className="mt-4 block h-px w-10 bg-gold" />
                <p className="mt-4 text-sm leading-snug text-text-dim">{item.label}</p>
                <div className="mt-2.5">
                  <Cite citation={item.citation} />
                </div>
              </Reveal>
            ))}
          </ul>
        </Rail>
      </Section>

      {/* Mission. Heading holds the left third; programmes run as an editorial
          list down the right, alternately indented. */}
      <Section
        tone="green"
        curve="tl-br"
        arc={{ x: 14, y: 78, rx: 38, ry: 26, rotate: 24, colour: "green", opacity: 0.25 }}
        className="mt-10"
      >
        <Rail width="wide" className="py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <Reveal variant="left">
                <Badge tone="page">Our mission</Badge>
                <h2 className="mt-7 text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text sm:text-[2.75rem]">
                  We build the <span className="accent-word">route in</span>, not just the rocket.
                </h2>
                <p className="mt-7 max-w-[42ch] leading-relaxed text-text-dim">
                  Nigeria has physics graduates, a space agency and satellites overhead. What it
                  does not have is a path from a classroom in Kaduna into space science. These
                  three programmes build it.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/programmes">
                    Explore programmes
                    <ArrowRight size={16} weight="bold" />
                  </Button>
                  <Button href="/about" variant="secondary">
                    Learn more
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ProgrammeList programmes={programmes} />
            </div>
          </div>
        </Rail>
      </Section>

      <Section>
        <Rail width="wide" className="py-16 lg:py-20">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-baseline lg:gap-14">
            <h2 className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-text-faint">
              As reported in
            </h2>
            <ul className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
              {reportedBy.map((item, index) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`tracking-tight text-text-faint transition-colors duration-200 hover:text-navy ${
                      index % 3 === 0 ? "text-xl" : "text-lg"
                    }`}
                  >
                    {item.outlet}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Rail>
      </Section>

      {/* Founder. Image left and low, quote pulled out into the gutter. */}
      <Section
        tone="navy-wash"
        curve="tr-bl"
        arc={{ x: 88, y: 70, rx: 34, ry: 22, rotate: -28, colour: "navy", opacity: 0.18 }}
      >
        <Rail width="wide" className="py-24 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-x-12">
            <Reveal variant="left" className="lg:col-span-5">
              <MediaSlot
                name="fauziyya-working"
                alt={`${founder.name} at work`}
                brief="Fauziyya teaching, presenting, or at a telescope. Working context rather than posed."
                width={960}
                height={1080}
                sizes="(min-width: 1024px) 40vw, 100vw"
                rounded={false}
                className="rounded-tr-band rounded-bl-band"
              />
            </Reveal>

            <Reveal variant="right" className="lg:col-span-6 lg:col-start-7">
              <h2 className="text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text sm:text-[2.75rem]">
                The founder
              </h2>

              <blockquote className="mt-8 border-l-2 border-gold pl-6 text-xl leading-snug text-text sm:text-2xl lg:-ml-14">
                Consistency, dedication and patience might take you beyond the stars.
              </blockquote>

              <p className="mt-8 max-w-[56ch] leading-relaxed text-text-dim">
                {founder.name} is an astrophysicist from Igabi, Kaduna State. She took a first-class
                degree in physics at Kaduna State University, where she now teaches while completing
                a master&apos;s in astrophysics and space science education. She founded ASTHERA so
                the route she is taking does not stay a one-off.
              </p>

              <div className="mt-9">
                <Button href="/founder" variant="secondary">
                  Her full story
                  <ArrowRight size={16} weight="bold" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Positions, set as an irregular row. */}
          <ul className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {positions.map((position, index) => (
              <Reveal
                as="li"
                key={position.title}
                delay={index * 0.08}
                className={
                  index === 0
                    ? "lg:col-span-4"
                    : index === 1
                      ? "lg:col-span-4 lg:translate-y-7"
                      : "lg:col-span-3 lg:col-start-10"
                }
              >
                <div className="flex h-full items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-page text-accent">
                    <position.icon size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text">{position.title}</p>
                    <p className="mt-1 text-sm leading-snug text-text-dim">{position.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Rail>
      </Section>

      {/* The record, with the newsletter card offset against it. */}
      <Section
        tone="gold"
        curve="tl-br"
        arc={{ x: 20, y: 22, rx: 40, ry: 24, rotate: 15, colour: "gold", opacity: 0.6 }}
      >
        <Rail width="wide" className="py-24 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
            <Reveal variant="left" className="lg:col-span-3 lg:pt-6">
              <Badge tone="page">The record</Badge>
              <h2 className="mt-7 text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text">
                Where the mission stands.
              </h2>
              <p className="mt-6 leading-relaxed text-text-dim">
                Every milestone links to the reporting it comes from.
              </p>
              <div className="mt-6">
                <TextLink href="/founder">Full record</TextLink>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-3 lg:col-span-6 lg:col-start-5">
              {recent.map((milestone, index) => (
                <Reveal
                  key={milestone.title}
                  variant="rise"
                  delay={index * 0.09}
                  className={
                    index === 1 ? "sm:translate-y-10" : index === 2 ? "sm:translate-y-3" : ""
                  }
                >
                  <div className="flex h-full flex-col rounded-card bg-page p-6">
                    <span className="inline-flex w-fit rounded-pill bg-wash-gold px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-gold-deep">
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
            </div>

            <Reveal variant="right" delay={0.1} className="lg:col-span-3 lg:col-start-11 lg:pt-20">
              <div className="rounded-card border border-line bg-page p-7">
                <h3 className="text-xl leading-snug tracking-tight text-text">
                  Follow the mission.
                </h3>
                <p className="mt-2.5 mb-6 text-sm leading-relaxed text-text-dim">
                  Training milestones and programme news, as they happen.
                </p>
                <NewsletterForm source="home-record" />
              </div>
            </Reveal>
          </div>
        </Rail>
      </Section>

      {/* Journal, only once there is something to show. */}
      {posts.length > 0 ? (
        <Section>
          <Rail width="wide" className="py-24 lg:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text sm:text-[2.75rem]">
                From the journal
              </h2>
              <TextLink href="/journal">All posts</TextLink>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-12">
              {posts.map((post, index) => (
                <Reveal
                  key={post._id}
                  delay={index * 0.08}
                  className={
                    index === 0
                      ? "md:col-span-5"
                      : index === 1
                        ? "md:col-span-4 md:translate-y-10"
                        : "md:col-span-3"
                  }
                >
                  <Link href={`/journal/${post.slug}`} className="group block">
                    <time
                      dateTime={post.publishedAt}
                      className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-faint"
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <h3 className="mt-3 text-xl leading-snug tracking-tight text-text transition-colors duration-200 group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-text-dim">{post.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Rail>
        </Section>
      ) : null}

      {/* The one deep band on the page. */}
      <Section
        tone="navy"
        curve="tr-bl"
        arc={{ x: 76, y: 28, rx: 42, ry: 26, rotate: -22, colour: "light", opacity: 0.35 }}
      >
        <Rail width="wide" className="py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal variant="left" className="lg:col-span-7">
              <h2 className="text-[2.5rem] leading-[1.0] tracking-[-0.035em] text-on-navy sm:text-[3.25rem]">
                Build it here, rather than <span className="text-gold">import it</span>.
              </h2>
            </Reveal>

            <Reveal variant="right" delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-3">
              <p className="max-w-[46ch] leading-relaxed text-white/80">
                ASTHERA is looking for institutions, funders and universities who want African space
                capability built rather than bought in. If that is you, start here.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={cta.partner.href} variant="on-navy">
                  {cta.partner.label}
                  <ArrowRight size={16} weight="bold" />
                </Button>
                <Button href={cta.press.href} variant="ghost-navy">
                  {cta.press.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </Rail>
      </Section>
    </>
  );
}
