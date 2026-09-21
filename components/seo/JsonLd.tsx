/**
 * Emits a structured data block. Kept as a component so every graph on the site
 * is serialised the same way and XSS-escaped identically.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Sanity and our own content can contain the sequence "</script>"; escaping
      // the angle bracket is the standard guard for inline JSON-LD.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
