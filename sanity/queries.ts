import { groq, type PortableTextBlock } from "next-sanity";

import { milestones as fallbackMilestones, pressCoverage, programmes } from "@/lib/site";
import type { Milestone, PressItem, Programme } from "@/lib/site";
import { sanityFetch } from "./client";

export type SanityImage = {
  url: string | null;
  alt: string | null;
  lqip: string | null;
  width: number | null;
  height: number | null;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string | null;
  coverImage: SanityImage | null;
};

export type PostDetail = PostSummary & {
  _updatedAt: string;
  body: PortableTextBlock[] | null;
  seo: { metaTitle?: string; metaDescription?: string; noIndex?: boolean } | null;
};

const imageProjection = groq`{
  "url": asset->url,
  "alt": coalesce(alt, ""),
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const postSummaryProjection = groq`{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  category,
  coverImage ${imageProjection}
}`;

export function getPosts(limit?: number) {
  const slice = typeof limit === "number" ? `[0...${limit}]` : "";
  return sanityFetch<PostSummary[]>({
    query: groq`*[_type == "post" && defined(slug.current)]
      | order(publishedAt desc)${slice} ${postSummaryProjection}`,
    tags: ["post"],
    fallback: [],
  });
}

export function getPost(slug: string) {
  return sanityFetch<PostDetail | null>({
    query: groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      _updatedAt,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      category,
      coverImage ${imageProjection},
      body[]{
        ...,
        _type == "image" => { ..., "url": asset->url, "lqip": asset->metadata.lqip }
      },
      seo
    }`,
    params: { slug },
    tags: ["post"],
    fallback: null,
  });
}

export function getPostSlugs() {
  return sanityFetch<{ slug: string; _updatedAt: string }[]>({
    query: groq`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current, _updatedAt
    }`,
    tags: ["post"],
    fallback: [],
  });
}

export type ProgrammeDoc = Programme & {
  coverImage?: SanityImage | null;
  body?: PortableTextBlock[] | null;
  updatedAt?: string;
};

export function getProgrammes(): Promise<ProgrammeDoc[]> {
  return sanityFetch<ProgrammeDoc[]>({
    query: groq`*[_type == "programme" && defined(slug.current)] | order(order asc){
      "slug": slug.current,
      "name": title,
      summary,
      "detail": pt::text(body),
      "outcomes": coalesce(outcomes, []),
      "updatedAt": _updatedAt,
      coverImage ${imageProjection},
      body
    }`,
    tags: ["programme"],
    fallback: programmes,
  });
}

export function getPressItems(): Promise<PressItem[]> {
  return sanityFetch<PressItem[]>({
    query: groq`*[_type == "pressItem"] | order(date desc){ outlet, title, url, date }`,
    tags: ["pressItem"],
    fallback: pressCoverage,
  });
}

export function getMilestones(): Promise<Milestone[]> {
  return sanityFetch<Milestone[]>({
    query: groq`*[_type == "milestone"] | order(sortDate asc){
      period,
      title,
      body,
      "citation": select(
        defined(sourceUrl) => { "outlet": sourceOutlet, "url": sourceUrl },
        null
      )
    }`,
    tags: ["milestone"],
    fallback: fallbackMilestones,
  });
}
