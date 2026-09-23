/**
 * Site-wide constants.
 *
 * Every factual string here traces back to content/facts.md or the company
 * profile in asthera.md. Do not add a claim that is not recorded in one of them.
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
  tagline: "Bridging the stars and the soil.",
  description:
    "ASTHERA is a Nigerian space-intelligence company. We turn satellite, Earth-observation and geospatial data into practical intelligence for flood risk, agriculture, climate and the environment, and we train young Africans in space science and technology.",
  shortDescription:
    "A Nigerian space-intelligence company turning satellite data into decisions on the ground.",
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
  { href: "/work", label: "Our work" },
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
  /** Shorts are shot vertically and need a 9:16 frame rather than 16:9. */
  orientation?: "landscape" | "portrait";
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
  {
    id: "vZ9n6T7bnKk",
    // Title as published, less the emoji the channel ends it with.
    title: "Meet Fauziyya Muhammad Auwal, From Kaduna. Nigeria's first astronaut candidate",
    channel: "PAPShow",
    channelUrl: "https://www.youtube.com/@papshowng",
    poster: "/media/video-papshow.jpg",
    orientation: "portrait",
  },
  {
    id: "zA9b3mfNlSw",
    title: "Meet Nigeria's First Astronaut Candidate | Fauziyyah Muhammad Auwal",
    channel: "PAPShow",
    channelUrl: "https://www.youtube.com/@papshowng",
    poster: "/media/video-papshow-interview.jpg",
  },
  {
    id: "53IDwWM2JO8",
    title: "Meet Nigeria's First Female Astronaut Candidate | Fauziyya Muhammad, EP:1",
    channel: "The Booming Boomer",
    channelUrl: "https://www.youtube.com/@the_booming_boomer",
    poster: "/media/video-boomer.jpg",
  },
  {
    id: "wXNCsSbYwBU",
    // Published with the singular "Titan", which the press page flags as the
    // common misprint. Left as the channel wrote it.
    title: "Meet Fauziyya, Nigeria's first female space explorer selected by Titan Space Industries",
    channel: "DRTV Nigeria",
    channelUrl: "https://www.youtube.com/@drtvnigeria",
    poster: "/media/video-drtv.jpg",
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

/**
 * The six areas of work from the company profile. Sanity `programme` documents
 * override these once published; the type keeps its original name so the CMS
 * schema does not have to change.
 */
export const programmes: Programme[] = [
  {
    slug: "space-intelligence",
    name: "Space intelligence and Earth observation",
    summary:
      "Satellite and geospatial data, interpreted so it answers a specific question about the ground below.",
    detail:
      "Raw satellite imagery is rarely useful on its own. ASTHERA works from the question backwards: what changed, where, and what it means for the people who have to act. We use Earth-observation and geospatial data to build insight on environmental change, land and vegetation, climate risk and land use, and deliver it in a form an institution can use.",
    outcomes: [
      "Environmental change and land-use change",
      "Vegetation and land conditions",
      "Ecosystem monitoring",
      "Climate and disaster-risk awareness",
    ],
  },
  {
    slug: "flood-climate-intelligence",
    name: "Flood and climate intelligence",
    summary:
      "Satellite, environmental and geospatial data combined to see flood and climate risk early enough to act on it.",
    detail:
      "ASTHERA is building the capability to combine satellite, environmental and geospatial data into a picture of where flood and climate risk is building. The long-term aim is early warning and early action: helping the institutions responsible identify areas at risk and make better preparedness and response decisions.",
    outcomes: [
      "Flood-risk monitoring and mapping",
      "Early-warning intelligence for responsible institutions",
      "Climate-risk and resilience analysis",
    ],
  },
  {
    slug: "agricultural-intelligence",
    name: "Agricultural intelligence",
    summary:
      "Crop, vegetation and land information from orbit, to support planning decisions on the farm and above it.",
    detail:
      "Satellites see every field, every season. ASTHERA explores how Earth-observation and geospatial technology can support agriculture: tracking vegetation and crop condition, flagging environmental and climate risks to production, and giving planners the land and climate information to base decisions on.",
    outcomes: [
      "Vegetation monitoring and crop-condition assessment",
      "Agricultural risk awareness",
      "Land and climate information for planning",
    ],
  },
  {
    slug: "environmental-intelligence",
    name: "Environmental intelligence",
    summary:
      "Land, water and vegetation monitored over time, so damage is seen while it can still be addressed.",
    detail:
      "Land degradation, water loss and unplanned urban growth build up slowly and are easy to miss from the ground. ASTHERA applies space and geospatial technology to monitor environmental conditions over time and make those changes visible to the people responsible for managing them.",
    outcomes: [
      "Vegetation change and land degradation",
      "Water-related change",
      "Urban growth and land-use change",
      "Climate-related environmental risk",
    ],
  },
  {
    slug: "stem-space-education",
    name: "STEM and space education",
    summary:
      "Astronomy, space science and satellite technology taught to young people as skills, not just inspiration.",
    detail:
      "ASTHERA runs education and outreach that introduces young people to astronomy, space science, Earth observation, satellite technology and data. The goal is not only to spark interest but to build practical skills and show clear routes into science and technology careers.",
    outcomes: [
      "Astronomy and space science sessions",
      "Earth observation, satellite and data skills",
      "Guidance on space careers and opportunities",
    ],
  },
  {
    slug: "youth-innovation",
    name: "Youth development and innovation",
    summary:
      "Projects, mentorship and challenges that give young Africans a real way into space and technology.",
    detail:
      "Interest needs somewhere to go. ASTHERA creates opportunities for young people to take part in projects, volunteer programmes, mentorship, innovation challenges and hands-on learning, with a focus on those who have had the least access to space and technology. The aim is a generation able to build Africa's space and technology sector itself.",
    outcomes: [
      "Project and volunteer opportunities",
      "Mentorship",
      "Innovation challenges and practical learning",
    ],
  },
];

/** Service lines from the company profile, grouped for the work page. */
export const services = [
  {
    group: "Intelligence",
    items: [
      "Earth-observation and satellite-data applications",
      "Geospatial and GIS analysis",
      "Environmental monitoring",
      "Flood-risk intelligence",
      "Climate-risk and resilience intelligence",
      "Agricultural intelligence",
      "Data analysis and visualisation",
    ],
  },
  {
    group: "Education",
    items: [
      "Space and STEM education",
      "Astronomy and space outreach",
      "Technical training and workshops",
      "Youth innovation and capacity building",
    ],
  },
  {
    group: "Research and partnerships",
    items: [
      "Research and innovation projects",
      "Space-technology project development",
      "Technical support for government and institutions",
      "Research and technology partnerships",
    ],
  },
] as const;

/** The problem-first method, in order. */
export const approach = [
  { title: "The problem", body: "Start from a real challenge and the people who have to act on it." },
  { title: "The data", body: "Choose the satellite, geospatial and environmental data that fits." },
  { title: "Analysis", body: "Process and interpret it with scientifically sound methods." },
  { title: "Intelligence", body: "Turn the result into findings a non-specialist can read." },
  { title: "Decision support", body: "Deliver it in a form that supports a real decision." },
] as const;

/** How ASTHERA works, from the company profile. */
export const practices = [
  {
    title: "Scientific integrity",
    body: "Sound methods, and no reading of the data beyond what it shows.",
  },
  {
    title: "Responsible technology",
    body: "Weighing the social, environmental and ethical effects of what we build.",
  },
  {
    title: "Collaboration",
    body: "Working with experts and institutions across disciplines, not alone.",
  },
  {
    title: "Innovation",
    body: "Using emerging technology where it solves a real problem.",
  },
  {
    title: "Impact",
    body: "Prioritising work with measurable value for communities and decision-makers.",
  },
  {
    title: "Inclusion",
    body: "Opening doors for young people with the least access to space and technology.",
  },
  {
    title: "Continuous learning",
    body: "Testing, validating and refining every solution as we go.",
  },
] as const;
