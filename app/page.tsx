import {
  ArrowDown,
  ArrowRight,
  ChalkboardTeacher,
  MoonStars,
  Rocket,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import Link from "next/link";

import { NewsletterForm } from "@/components/site/NewsletterForm";
import { PressMarquee } from "@/components/site/PressMarquee";
import { EarthHero } from "@/components/site/EarthHero";
import { Badge } from "@/components/ui/Badge";
import { Button, TextLink } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { ProgrammeList } from "@/components/ui/ProgrammeList";
import { Reveal } from "@/components/ui/Reveal";
import { Rail, Section } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { approach, cta, founder, practices } from "@/lib/site";
import { getPosts, getProgrammes } from "@/sanity/queries";

export const revalidate = 60;

/** The hero's display face: a high-contrast Didone, used only in the hero. */
const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = pageMeta({
  title: "ASTHERA | Bridging the stars and the soil",
  description:
    "ASTHERA is a Nigerian space-intelligence company turning satellite, Earth-observation and geospatial data into practical intelligence for flood risk, agriculture, climate and the environment.",
  path: "/",
});

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
  const [programmes, posts] = await Promise.all([getProgrammes(), getPosts(3)]);

  return (
    <>
      {/* The hero: the site opens on the planet the work serves. A live 3D
          Earth rises out of the bottom of the frame with West Africa turned to
          the viewer, Mercury and Mars sit half cropped at the edges, and the
          copy is set into the sky above them. */}
      <section
        id="hero"
        className="relative isolate -mt-[77px] overflow-hidden bg-[#04070d] pt-[77px] text-on-navy"
      >
        <EarthHero className="absolute inset-0" labelClassName={display.className} />

        <Rail
          width="wide"
          className="relative z-10 flex min-h-[calc(100dvh-77px)] flex-col items-center pb-40 pt-[clamp(3.5rem,11vh,6rem)] text-center"
        >
          <Reveal variant="fade" duration={1.1}>
            <h1 className={`${display.className} flex flex-col items-center`}>
              <span className="text-[clamp(0.8rem,1.1vw,1rem)] uppercase tracking-[0.5em] text-white/85 [margin-right:-0.5em]">
                Bridging the stars
              </span>
              <span className="mt-3 text-[clamp(2.75rem,7.6vw,6rem)] font-normal uppercase leading-[0.95] tracking-[0.04em] text-white">
                and the soil
              </span>
            </h1>
          </Reveal>

          <Reveal variant="fade" delay={0.25} duration={1.1}>
            <span aria-hidden className="mt-7 block h-px w-28 bg-gold/80" />
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mx-auto mt-7 max-w-[46ch] text-[15px] leading-relaxed text-white/75">
              ASTHERA turns satellite and Earth-observation data into decision-ready intelligence
              for flood risk, farming and climate across Africa.
            </p>
          </Reveal>

          {/* One route in, pointing at the work. */}
          <Reveal delay={0.45}>
            <Button
              href="/work"
              variant="on-navy"
              className="mt-9 px-7 py-2.5 text-[12px] uppercase tracking-[0.16em] shadow-[0_10px_30px_-10px_rgba(120,170,255,0.45)]"
            >
              See our work
            </Button>
          </Reveal>
        </Rail>

        <a
          href="#work"
          aria-label="Scroll to our work"
          className="absolute bottom-6 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-pill border border-white/15 bg-[#04070d]/55 text-white/80 backdrop-blur-md transition-[border-color,color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold"
        >
          <ArrowDown size={16} weight="regular" aria-hidden />
        </a>
      </section>

      {/* What we do. Heading holds the left third; the six areas run as an
          editorial list down the right, alternately indented. */}
      <Section
        id="work"
        tone="green"
        arc={{ x: 14, y: 78, rx: 38, ry: 26, rotate: 24, colour: "green", opacity: 0.25 }}
        className="rounded-br-band"
      >
        <Rail width="wide" className="py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <Reveal variant="left">
                <Badge tone="page">What we do</Badge>
                <h2 className="mt-7 text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text sm:text-[2.75rem]">
                  Intelligence, not <span className="accent-word">raw data</span>.
                </h2>
                <p className="mt-7 max-w-[42ch] leading-relaxed text-text-dim">
                  Satellites already watch every flood plain and farm in Nigeria. ASTHERA reads that
                  data, interprets it, and gives governments, institutions, businesses and
                  communities something they can act on.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/work">
                    See our work
                    <ArrowRight size={16} weight="bold" />
                  </Button>
                  <Button href="/about" variant="secondary">
                    About us
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

      {/* The method, read left to right as one line. */}
      <Section>
        <Rail width="wide" className="py-24 lg:py-32">
          <Reveal className="max-w-[40rem]">
            <h2 className="text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text sm:text-[2.75rem]">
              We start on the <span className="accent-word">ground</span>.
            </h2>
            <p className="mt-6 max-w-[52ch] leading-relaxed text-text-dim">
              Every project begins with a real problem and the person who has to solve it. The
              data comes second.
            </p>
          </Reveal>

          <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <span
              aria-hidden
              className="absolute top-[5px] right-0 left-0 hidden h-px bg-gradient-to-r from-accent via-gold to-navy lg:block"
            />
            {approach.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.08} className="relative">
                <span
                  aria-hidden
                  className="relative block h-[11px] w-[11px] rounded-pill border-2 border-page bg-accent ring-1 ring-accent"
                />
                <h3 className="mt-6 text-lg tracking-tight text-text">{step.title}</h3>
                <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-text-dim">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Rail>
      </Section>

      <Section>
        <Rail width="wide" className="pb-16 lg:pb-20">
          <div className="flex flex-col gap-7 border-t border-line pt-14 lg:flex-row lg:items-center lg:gap-14">
            <h2 className="shrink-0 text-sm text-text-faint">As reported in</h2>
            <div className="min-w-0 flex-1">
              <PressMarquee outlets={reportedBy} />
            </div>
          </div>
        </Rail>
      </Section>

      {/* The people side of the work: education and youth, image right. */}
      <Section
        tone="navy-wash"
        curve="tr-bl"
        arc={{ x: 88, y: 70, rx: 34, ry: 22, rotate: -28, colour: "navy", opacity: 0.18 }}
      >
        <Rail width="wide" className="py-24 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-x-12">
            <Reveal variant="left" className="lg:col-span-6">
              <h2 className="text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text sm:text-[2.75rem]">
                Training the people who will <span className="accent-word">read the data</span>.
              </h2>
              <p className="mt-7 max-w-[54ch] leading-relaxed text-text-dim">
                A country that relies on satellite intelligence needs people who can produce it.
                ASTHERA teaches astronomy, space science, Earth observation and data to young
                people, and gives them projects, mentors and challenges to build real skills on.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/work/stem-space-education" variant="secondary">
                  STEM and space education
                </Button>
                <Button href="/work/youth-innovation" variant="quiet">
                  Youth and innovation
                </Button>
              </div>
            </Reveal>

            <Reveal variant="right" className="lg:col-span-5 lg:col-start-8">
              <MediaSlot
                name="education-session"
                alt="Young people at an ASTHERA education session"
                brief="Students at an ASTHERA session: a workshop, an observation night or a data exercise. Real setting."
                width={960}
                height={1080}
                sizes="(min-width: 1024px) 40vw, 100vw"
                rounded={false}
                className="rounded-tl-band rounded-br-band"
              />
            </Reveal>
          </div>
        </Rail>
      </Section>

      {/* Leadership. Image left and low, quote pulled out into the gutter. */}
      <Section arc={{ x: 16, y: 28, rx: 38, ry: 25, rotate: -21, colour: "green", opacity: 0.22 }}>
        <Rail width="wide" className="py-24 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-x-12">
            <Reveal variant="left" className="lg:col-span-5">
              <MediaSlot
                name="fauziyya-working"
                alt={`${founder.name} speaking in conversation`}
                brief="Fauziyya teaching, presenting, or at a telescope. Working context rather than posed."
                width={1080}
                height={1675}
                sizes="(min-width: 1024px) 40vw, 100vw"
                rounded={false}
                className="aspect-[4/5] rounded-tr-band rounded-bl-band"
                imageClassName="object-[50%_32%]"
              />
            </Reveal>

            <Reveal variant="right" className="lg:col-span-6 lg:col-start-7">
              <h2 className="text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text sm:text-[2.75rem]">
                Led by a physicist
              </h2>

              <blockquote className="mt-8 border-l-2 border-gold pl-6 text-xl leading-snug text-text sm:text-2xl lg:-ml-14">
                Consistency, dedication and patience might take you beyond the stars.
              </blockquote>

              <p className="mt-8 max-w-[56ch] leading-relaxed text-text-dim">
                ASTHERA was founded by {founder.name}, a first-class physics graduate of Kaduna
                State University, where she now teaches while completing a master&apos;s in
                astrophysics and space science education. She is also an astronaut candidate with
                Titans Space Industries.
              </p>

              <div className="mt-9">
                <Button href="/founder" variant="secondary">
                  About the founder
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
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-surface text-accent">
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

      {/* Practices, with the newsletter card offset against them. */}
      <Section
        tone="gold"
        curve="tl-br"
        arc={{ x: 20, y: 22, rx: 40, ry: 24, rotate: 15, colour: "gold", opacity: 0.6 }}
      >
        <Rail width="wide" className="py-24 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-8">
              <Reveal variant="left">
                <h2 className="text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-text sm:text-[2.75rem]">
                  What we hold to
                </h2>
              </Reveal>

              <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
                {practices.map((practice, index) => (
                  <Reveal key={practice.title} delay={index * 0.05}>
                    <dt className="flex items-center gap-3 text-lg tracking-tight text-text">
                      <span aria-hidden className="h-px w-6 bg-gold-deep" />
                      {practice.title}
                    </dt>
                    <dd className="mt-2 max-w-[40ch] pl-9 text-sm leading-relaxed text-text-dim">
                      {practice.body}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>

            <Reveal variant="right" delay={0.1} className="lg:col-span-4 lg:pt-24">
              <div className="rounded-card border border-line bg-page p-7">
                <h3 className="text-xl leading-snug tracking-tight text-text">Stay in the loop.</h3>
                <p className="mt-2.5 mb-6 text-sm leading-relaxed text-text-dim">
                  Project news, programmes for young people, and what we learn along the way.
                </p>
                <NewsletterForm source="home-practices" />
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
                Bring us a problem <span className="text-gold">on the ground</span>.
              </h2>
            </Reveal>

            <Reveal variant="right" delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-3">
              <p className="max-w-[46ch] leading-relaxed text-white/80">
                We work with government, universities, research organisations, companies, NGOs and
                international bodies. Tell us the challenge and we will find the data that fits
                it.
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
