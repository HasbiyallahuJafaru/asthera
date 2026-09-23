import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { getPostSlugs, getProgrammes } from "@/sanity/queries";

export const revalidate = 3600;

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/founder", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/journal", priority: 0.8, changeFrequency: "weekly" },
  { path: "/press", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partner", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, programmes] = await Promise.all([getPostSlugs(), getProgrammes()]);
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...programmes.map((programme) => ({
      url: `${SITE_URL}/work/${programme.slug}`,
      lastModified: programme.updatedAt ? new Date(programme.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/journal/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
