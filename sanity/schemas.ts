import { defineArrayMember, defineField, defineType } from "sanity";

const slug = defineField({
  name: "slug",
  title: "URL slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) => rule.required(),
});

const altText = defineField({
  name: "alt",
  title: "Alt text",
  type: "string",
  description: "Describe the image for screen readers and search engines.",
  validation: (rule) => rule.required(),
});

const seo = defineField({
  name: "seo",
  title: "Search appearance",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Overrides the title in search results. Aim for 60 characters.",
      validation: (rule) => rule.max(70).warning("Longer titles get truncated by Google."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Aim for 150 to 160 characters.",
      validation: (rule) => rule.max(180).warning("Longer descriptions get truncated by Google."),
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

const post = defineType({
  name: "post",
  title: "Journal post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    slug,
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "One or two sentences. Used on the index and in search results.",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Mission update", value: "mission" },
          { title: "Programme", value: "programme" },
          { title: "Announcement", value: "announcement" },
          { title: "Writing", value: "writing" },
        ],
        layout: "radio",
      },
      initialValue: "mission",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [altText],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [altText, defineField({ name: "caption", title: "Caption", type: "string" })],
        }),
      ],
    }),
    seo,
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});

const programme = defineType({
  name: "programme",
  title: "Programme",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Name", type: "string", validation: (r) => r.required() }),
    slug,
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [altText],
    }),
    defineField({
      name: "outcomes",
      title: "What this delivers",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Full description",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    seo,
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});

const pressItem = defineType({
  name: "pressItem",
  title: "Press coverage",
  type: "document",
  fields: [
    defineField({ name: "outlet", title: "Outlet", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", title: "Link", type: "url", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date published", type: "date", validation: (r) => r.required() }),
  ],
  orderings: [
    { title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "outlet" } },
});

const milestone = defineType({
  name: "milestone",
  title: "Mission milestone",
  type: "document",
  fields: [
    defineField({
      name: "period",
      title: "When",
      type: "string",
      description: "Free text, for example 2024 or September 2026.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortDate",
      title: "Sort date",
      type: "date",
      description: "Used only for ordering the timeline.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "sourceOutlet",
      title: "Source outlet",
      type: "string",
      description: "Required for any claim that uses the word first.",
    }),
    defineField({ name: "sourceUrl", title: "Source link", type: "url" }),
  ],
  orderings: [
    { title: "Chronological", name: "sortAsc", by: [{ field: "sortDate", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "period" } },
});

const subscriber = defineType({
  name: "subscriber",
  title: "Newsletter subscriber",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "subscribedAt", title: "Subscribed", type: "datetime", readOnly: true }),
    defineField({ name: "source", title: "Source page", type: "string", readOnly: true }),
  ],
  orderings: [
    { title: "Newest first", name: "subDesc", by: [{ field: "subscribedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "email", subtitle: "subscribedAt" } },
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "generalEmail", title: "General email", type: "string" }),
    defineField({ name: "pressEmail", title: "Press email", type: "string" }),
    defineField({ name: "partnershipsEmail", title: "Partnerships email", type: "string" }),
    defineField({
      name: "mediaKit",
      title: "Media kit file",
      type: "file",
      description: "Zip or PDF offered to journalists on the press page.",
    }),
    defineField({
      name: "headshots",
      title: "Press headshots",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [altText, defineField({ name: "credit", title: "Photographer credit", type: "string" })],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const schemaTypes = [
  post,
  programme,
  pressItem,
  milestone,
  subscriber,
  siteSettings,
];
