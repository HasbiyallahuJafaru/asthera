/**
 * Site-wide constants.
 *
 * Every factual string here traces back to content/facts.md. Do not add a claim
 * that is not recorded and sourced in that file.
 *
 * Copy rule: no em-dash characters in any user-visible string.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://astheraspace.com";

export const site = {
  name: "ASTHERA",
  legalName: "ASTHERA",
  domain: "astheraspace.com",
  url: SITE_URL,
  locale: "en_NG",
  tagline: "Using space data to solve Earth problems.",
  description:
    "ASTHERA is a Nigerian space-tech and astronomy initiative advancing astronomy education, STEM outreach, and satellite technology applied to Africa's climate, agriculture and security challenges.",
  shortDescription:
    "A Nigerian space-tech and astronomy initiative founded by astronaut candidate Fauziyya Auwal Muhammad.",
  city: "Kaduna",
  region: "Kaduna State",
  country: "Nigeria",
} as const;

/**
 * Contact routing. Replace with the client's real addresses before launch.
 * Until then forms deliver to the address in CONTACT_INBOX.
 */
export const contact = {
  general: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@astheraspace.com",
  press: process.env.NEXT_PUBLIC_PRESS_EMAIL ?? "press@astheraspace.com",
  partnerships: process.env.NEXT_PUBLIC_PARTNER_EMAIL ?? "partnerships@astheraspace.com",
} as const;

export const socials = {
  linkedin: "https://www.linkedin.com/company/asthera",
  x: "https://x.com/FauziyyaSa",
} as const;

/** External entities used in `sameAs` so search engines resolve the entity graph. */
export const sameAs: string[] = [
  socials.linkedin,
  socials.x,
  "https://ui.adsabs.harvard.edu/abs/2025afas.confE..80F/abstract",
];

export const nav = [
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/founder", label: "Founder" },
  { href: "/journal", label: "Journal" },
  { href: "/press", label: "Press" },
] as const;

/**
 * Single CTA label per intent, used identically in nav, hero and footer.
 */
export const cta = {
  partner: { label: "Partner with us", href: "/partner" },
  press: { label: "Press kit", href: "/press" },
} as const;

export const founder = {
  name: "Fauziyya Auwal Muhammad",
  /** Spellings used by different outlets. All resolve to the same person. */
  alternateNames: ["Fauziya Muhammad Auwal", "Fauziyya Muhammad Auwal", "Fauziyya Auwal"],
  jobTitle: "Founder and Chief Executive, ASTHERA",
  roles: [
    "Founder and Chief Executive, ASTHERA",
    "Graduate Assistant, Department of Physics, Kaduna State University",
    "Astronaut Candidate, Titans Space Industries",
    "PMO Admin Lead, Space Economic Forum 2026",
  ],
  birthPlace: "Igabi Local Government Area, Kaduna State",
  knowsAbout: [
    "Astrophysics",
    "Space science education",
    "Astronomy outreach",
    "Satellite and geospatial technology",
    "STEM education in Nigeria",
  ],
} as const;

/** Institutions she is connected to. Affiliation is not endorsement. */
export const affiliations = [
  {
    name: "Kaduna State University",
    short: "KASU",
    relation: "Graduate Assistant, Department of Physics",
    url: "https://kasu.edu.ng",
  },
  {
    name: "Titans Space Industries",
    short: "Titans Space",
    relation: "Astronaut Candidate",
    url: "https://titansspace.com",
  },
  {
    name: "LunAres Research Station",
    short: "LunAres",
    relation: "Selected for the 2026 analogue mission, Poland",
    url: null,
  },
  {
    name: "Space Economic Forum 2026",
    short: "SEF 2026",
    relation: "PMO Admin Lead",
    url: null,
  },
] as const;

export type Citation = { outlet: string; url: string };

/**
 * Every superlative on the site carries one of these. A claim without a citation
 * does not ship.
 */
export const citations = {
  firstCandidate: {
    outlet: "Daily Trust",
    url: "https://dailytrust.com/meet-nigerias-budding-astronaut/",
  },
  firstFemaleCandidate: {
    outlet: "Channels Television",
    url: "https://www.channelstv.com/2026/09/16/gov-sani-redeems-pledge-to-kaduna-innovators/",
  },
  analogueAstronaut: {
    outlet: "Daily Trust",
    url: "https://dailytrust.com/uba-sani-redeems-pledge-to-kadunas-innovators/",
  },
  zambia: {
    outlet: "Daily Trust",
    url: "https://dailytrust.com/meet-nigerias-budding-astronaut/",
  },
  grant: {
    outlet: "Premium Times",
    url: "https://www.premiumtimesng.com/promoted/910207-uba-sani-redeems-pledge-to-kadunas-innovators.html",
  },
  tenFacts: {
    outlet: "Legit.ng",
    url: "https://www.legit.ng/nigeria/1689919-meet-fauziya-auwal-10-key-facts-nigerias-astronaut-candidate/",
  },
} satisfies Record<string, Citation>;

export type Milestone = {
  period: string;
  title: string;
  body: string;
  citation?: Citation;
};

/** Fallback timeline. Sanity `milestone` documents override this once published. */
export const milestones: Milestone[] = [
  {
    period: "2024",
    title: "Research on external galaxies presented internationally",
    body: "Presented a paper on external galaxies at an international astronomy and astrophysics conference, and won an astronomy and astrophysics competition the same year.",
    citation: citations.tenFacts,
  },
  {
    period: "2024",
    title: "Research internship in Zambia",
    body: "Completed a research internship in Zambia, reported as the first Nigerian woman in her field to do so.",
    citation: citations.zambia,
  },
  {
    period: "2025",
    title: "Stellar Horizons published",
    body: "Presented “Stellar Horizons: Transforming STEM Education through Astronomy Outreach in Nigeria” at the African Astronomical Society conference. The paper is indexed on NASA ADS.",
    citation: {
      outlet: "NASA ADS",
      url: "https://ui.adsabs.harvard.edu/abs/2025afas.confE..80F/abstract",
    },
  },
  {
    period: "September 2026",
    title: "Kaduna State innovator grant",
    body: "Named a beneficiary of the Kaduna State Government innovator fund, announced at the 2026 International Youth Day Conference and disbursed on 16 September 2026.",
    citation: citations.grant,
  },
  {
    period: "2026",
    title: "Astronaut training begins",
    body: "Structured astronaut training with Titans Space Industries starts, including advanced space science coursework.",
    citation: citations.tenFacts,
  },
  {
    period: "2026",
    title: "LunAres analogue mission, Poland",
    body: "Selected for the LunAres Research Station analogue mission, reported as Nigeria's first female analogue astronaut.",
    citation: citations.analogueAstronaut,
  },
];

export type VideoItem = {
  id: string;
  title: string;
  channel: string;
  channelUrl: string;
  poster: string;
};

/** Broadcast interviews. Verified via the YouTube oEmbed endpoint. */
export const videos: VideoItem[] = [
  {
    id: "IbRS5zhoNu0",
    title: "Women in Science: One-on-One with Fauziyya Muhammed Auwal, Daybreak Extra",
    channel: "TrustTV News",
    channelUrl: "https://www.youtube.com/@TrustTVNews",
    poster: "/media/video-daybreak.jpg",
  },
];

export type PressItem = {
  outlet: string;
  title: string;
  url: string;
  date: string;
};

/** Fallback coverage index. Sanity `pressItem` documents override this. */
export const pressCoverage: PressItem[] = [
  {
    outlet: "Daily Trust",
    title: "Meet Nigeria's Budding Astronaut",
    url: "https://dailytrust.com/meet-nigerias-budding-astronaut/",
    date: "2026-01-01",
  },
  {
    outlet: "Legit.ng",
    title: "10 Key Facts About Nigeria's First Astronaut Candidate",
    url: "https://www.legit.ng/nigeria/1689919-meet-fauziya-auwal-10-key-facts-nigerias-astronaut-candidate/",
    date: "2026-01-01",
  },
  {
    outlet: "Channels Television",
    title: "Gov Sani Redeems Pledge To Kaduna Innovators",
    url: "https://www.channelstv.com/2026/09/16/gov-sani-redeems-pledge-to-kaduna-innovators/",
    date: "2026-09-16",
  },
  {
    outlet: "Premium Times",
    title: "Uba Sani redeems pledge to Kaduna's innovators",
    url: "https://www.premiumtimesng.com/promoted/910207-uba-sani-redeems-pledge-to-kadunas-innovators.html",
    date: "2026-09-16",
  },
  {
    outlet: "Leadership",
    title: "Uba Sani Redeems Pledge To Kaduna's Innovators",
    url: "https://leadership.ng/uba-sani-redeems-pledge-to-kadunas-innovators/",
    date: "2026-09-16",
  },
  {
    outlet: "Channels Television",
    title: "International Youth Day: Uba Sani Gives Financial Support To Innovators",
    url: "https://www.channelstv.com/2026/09/05/international-youth-day-uba-sani-gives-financial-support-to-innovators/",
    date: "2026-09-05",
  },
  {
    outlet: "Blueprint",
    title: "International Youth Day: Uba Sani gives financial support to innovators",
    url: "https://blueprint.ng/international-youth-day-uba-sani-gives-financial-support-to-innovators/",
    date: "2026-09-05",
  },
  {
    outlet: "The Sun",
    title: "Sani redeems N30m pledge to Kaduna's innovators",
    url: "https://thesun.ng/sani-redeems-n30m-pledge-to-kadunas-innovators/",
    date: "2026-09-16",
  },
  {
    outlet: "Daily Nigerian",
    title: "Kaduna govt awards N30m to youth innovators",
    url: "https://dailynigerian.com/uba-sani-redeems-n30m-pledge-to-kaduna-innovators/",
    date: "2026-09-05",
  },
  {
    outlet: "Gazette NGR",
    title: "Gov Sani redeems pledge to Kaduna's innovators",
    url: "https://gazettengr.com/gov-sani-redeems-pledge-to-kadunas-innovators/",
    date: "2026-09-16",
  },
];

export type Programme = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  outcomes: string[];
};

/** Fallback programmes. Sanity `programme` documents override these. */
export const programmes: Programme[] = [
  {
    slug: "astronomy-education",
    name: "Astronomy education",
    summary:
      "Bringing structured astronomy teaching into Nigerian classrooms and universities, where almost none currently exists.",
    detail:
      "Nigeria produces physics graduates but has very few routes into astronomy and astrophysics. ASTHERA builds teaching material, runs observation sessions, and works toward a dedicated astronomy department at Kaduna State University so students no longer have to leave the country to study the sky.",
    outcomes: [
      "Curriculum and teaching material for secondary and undergraduate levels",
      "Practical observation sessions with students",
      "Groundwork for a dedicated astronomy department at KASU",
    ],
  },
  {
    slug: "stem-outreach",
    name: "STEM outreach",
    summary:
      "Direct contact with students who have never met a scientist, with particular focus on girls in northern Nigeria.",
    detail:
      "The gap is not talent, it is exposure. ASTHERA runs school visits, workshops and public sessions that put space science in front of young people in Kaduna and beyond, and that show girls a career in physics is reachable from where they already are.",
    outcomes: [
      "School and community workshops",
      "Public astronomy sessions",
      "Mentoring routes for girls entering physics",
    ],
  },
  {
    slug: "applied-space-technology",
    name: "Applied space technology",
    summary:
      "Using satellite and geospatial data against the problems Nigeria actually has: floods, farms, climate and security.",
    detail:
      "Space assets are already overhead. ASTHERA works on turning satellite and geospatial data into usable information for climate monitoring, agricultural planning, flood management and security, so that the value of space technology is felt on the ground in African communities.",
    outcomes: [
      "Climate and flood monitoring applications",
      "Agricultural and environmental analysis",
      "Geospatial capability building for local institutions",
    ],
  },
];
