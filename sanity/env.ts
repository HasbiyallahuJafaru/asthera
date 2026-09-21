export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-01";

/**
 * The site ships with sourced fallback content in lib/site.ts, so every page
 * renders correctly before a Sanity project exists. Once a project id is set the
 * CMS becomes the source of truth for journal posts, programmes, press and
 * milestones.
 */
export const isSanityConfigured = projectId.length > 0;
