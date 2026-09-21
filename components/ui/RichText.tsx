import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import Image from "next/image";

/**
 * Renders Portable Text from Sanity into the site's article styles. Images
 * carry their real dimensions so nothing shifts as they load.
 */
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.url) return null;

      return (
        <figure className="my-10">
          <Image
            src={value.url}
            alt={value.alt ?? ""}
            width={1400}
            height={900}
            sizes="(min-width: 768px) 46rem, 100vw"
            placeholder={value.lqip ? "blur" : "empty"}
            blurDataURL={value.lqip ?? undefined}
            className="w-full rounded-card"
          />
          {value.caption ? (
            <figcaption className="mt-3 text-sm text-text-faint">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const external = href.startsWith("http");

      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function RichText({ value }: { value: PortableTextBlock[] | null | undefined }) {
  if (!value?.length) return null;

  return (
    <div className="prose-asthera">
      <PortableText value={value} components={components} />
    </div>
  );
}
