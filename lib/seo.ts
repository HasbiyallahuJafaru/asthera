import type { Metadata } from "next";

import { SITE_URL, affiliations, founder, sameAs, site } from "./site";

/** Stable @id values so every graph node on the site refers to the same entities. */
export const ID = {
  org: `${SITE_URL}/#organisation`,
  website: `${SITE_URL}/#website`,
  founder: `${SITE_URL}/founder#person`,
} as const;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Route segment OG image, defaults to the root opengraph-image. */
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/**
 * Single place that builds page metadata so canonical, OG and Twitter tags can
 * never drift apart between routes.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex,
}: PageMetaInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: type === "profile" ? "profile" : type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: image ? [{ url: image }] : undefined,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/**
 * The site-wide entity graph. Emitted once in the root layout.
 *
 * Its job is entity consolidation: national press spells the founder's name
 * three different ways, so every spelling is declared as an alternateName and
 * every known profile is declared in sameAs. That is what tells a search engine
 * these are one person and this site is her canonical home.
 */
export function organisationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "NGO"],
        "@id": ID.org,
        name: site.name,
        alternateName: ["Asthera", "Asthera Space"],
        url: SITE_URL,
        description: site.description,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/brand/asthera-logo.png`,
        },
        image: `${SITE_URL}/opengraph-image`,
        sameAs,
        founder: { "@id": ID.founder },
        areaServed: [
          { "@type": "Country", name: "Nigeria" },
          { "@type": "Place", name: "Africa" },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "NG",
        },
        knowsAbout: [
          "Earth observation",
          "Geospatial analysis",
          "Flood-risk intelligence",
          "Agricultural intelligence",
          "Environmental monitoring",
          "STEM and space education",
        ],
      },
      {
        "@type": "WebSite",
        "@id": ID.website,
        url: SITE_URL,
        name: site.name,
        description: site.description,
        publisher: { "@id": ID.org },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": ID.founder,
        name: founder.name,
        alternateName: founder.alternateNames,
        url: `${SITE_URL}/founder`,
        jobTitle: founder.jobTitle,
        nationality: { "@type": "Country", name: "Nigeria" },
        birthPlace: { "@type": "Place", name: founder.birthPlace },
        worksFor: { "@id": ID.org },
        affiliation: affiliations.map((entry) => ({
          "@type": "Organization",
          name: entry.name,
          ...(entry.url ? { url: entry.url } : {}),
        })),
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Kaduna State University",
          url: "https://kasu.edu.ng",
        },
        knowsAbout: founder.knowsAbout,
        sameAs,
      },
    ],
  };
}

export function breadcrumbGraph(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.path === "/" ? SITE_URL : `${SITE_URL}${crumb.path}`,
    })),
  };
}

export function articleGraph(input: {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: `${SITE_URL}${input.path}`,
    datePublished: input.published,
    dateModified: input.modified,
    ...(input.image ? { image: [input.image] } : {}),
    author: { "@id": ID.founder },
    publisher: { "@id": ID.org },
    isPartOf: { "@id": ID.website },
  };
}

export function faqGraph(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function videoGraph(input: {
  id: string;
  title: string;
  description: string;
  poster: string;
  uploadDate: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.title,
    description: input.description,
    thumbnailUrl: [`${SITE_URL}${input.poster}`],
    uploadDate: input.uploadDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${input.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${input.id}`,
    publisher: { "@id": ID.org },
    about: { "@id": ID.founder },
  };
}
