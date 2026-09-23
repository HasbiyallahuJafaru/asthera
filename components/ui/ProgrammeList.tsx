import Image from "next/image";
import Link from "next/link";

import { Reveal } from "./Reveal";
import { resolveMedia } from "./MediaSlot";

type Entry = {
  slug: string;
  name: string;
  summary: string;
};

/**
 * Areas of work as an editorial list rather than a card grid.
 *
 * Three columns of cards forced a 25 character measure, which broke every line
 * after three words and made the set read as generic feature tiles. Stacked
 * entries give the copy a real measure, let the names run at display size, and
 * group by hairline rule and whitespace instead of by container.
 *
 * Rules are tinted from --text rather than using --line, so they stay visible on
 * the coloured washes as well as on white.
 */
export function ProgrammeList({ programmes }: { programmes: Entry[] }) {
  return (
    <ol className="border-b border-text/15">
      {programmes.map((programme, index) => {
        const src = resolveMedia(`work-${programme.slug}`);

        return (
          <Reveal as="li" key={programme.slug} delay={index * 0.09} className="border-t border-text/15">
            <Link
              href={`/work/${programme.slug}`}
              /* Every second entry is indented, so the column edge is not a
                 straight rule down the page. */
              className={`group grid gap-x-8 gap-y-5 py-9 transition-colors duration-300 sm:grid-cols-[2.5rem_1fr_auto] lg:py-12 ${
                index % 2 === 1 ? "lg:pl-10" : ""
              }`}
            >
              <span className="font-mono text-sm text-gold-deep sm:pt-2">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="text-[1.75rem] leading-[1.08] tracking-[-0.03em] text-text transition-colors duration-300 group-hover:text-accent lg:text-[2.125rem]">
                  {programme.name}
                </h3>

                <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-text-dim lg:text-[1.0625rem]">
                  {programme.summary}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text">
                  Read more
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                  >
                    &rarr;
                  </span>
                </span>
              </div>

              {src ? (
                <div className="hidden overflow-hidden rounded-media sm:block sm:w-[11rem] lg:w-[14rem]">
                  <Image
                    src={src}
                    alt=""
                    width={560}
                    height={420}
                    sizes="14rem"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              ) : (
                <span className="hidden self-start font-mono text-[10px] leading-relaxed text-text-faint sm:block sm:w-[11rem] lg:w-[14rem]">
                  media/work-{programme.slug}.jpg
                </span>
              )}
            </Link>
          </Reveal>
        );
      })}
    </ol>
  );
}
