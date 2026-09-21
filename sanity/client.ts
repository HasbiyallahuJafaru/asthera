import { createClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null;

/**
 * Every read goes through here. When Sanity is not configured, or a query fails,
 * the caller receives its fallback instead of the page erroring. Content is
 * cached and revalidated on a tag so Studio edits appear without a redeploy.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  fallback,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  fallback: T;
}): Promise<T> {
  if (!client) return fallback;

  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags },
    });

    if (result === null || result === undefined) return fallback;
    if (Array.isArray(result) && result.length === 0) return fallback;

    return result;
  } catch (error) {
    console.error("[sanity] query failed, using fallback content", error);
    return fallback;
  }
}
