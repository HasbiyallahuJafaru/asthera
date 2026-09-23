import type { VideoItem } from "@/lib/site";

import { Reveal } from "./Reveal";
import { VideoEmbed } from "./VideoEmbed";

/**
 * Interviews as a set.
 *
 * One video runs the full width of the rail. Two put the lead at eight columns
 * with the second beside it, which is where a vertical short belongs. Beyond
 * that the remainder drop into a row underneath, so the set stays two rows deep
 * however many interviews accumulate. Secondary videos take the card radius on
 * the same diagonal as the lead, so the smaller frames do not read as a
 * different component.
 */
export function VideoSet({ videos }: { videos: VideoItem[] }) {
  const [lead, beside, ...below] = videos;

  if (!lead) return null;

  if (!beside) {
    return (
      <Reveal variant="rise">
        <VideoEmbed {...lead} />
      </Reveal>
    );
  }

  return (
    <div className="grid gap-y-14">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
        <Reveal variant="rise" className="lg:col-span-8">
          <VideoEmbed {...lead} sizes="(min-width: 1024px) 62vw, 100vw" />
        </Reveal>

        <Reveal
          variant="right"
          delay={0.08}
          /* A vertical frame at column width would tower over the lead, so it is
             held to a width that keeps the two roughly in proportion. */
          className={`lg:col-span-4 ${beside.orientation === "portrait" ? "w-full max-w-[19rem]" : ""}`}
        >
          <VideoEmbed
            {...beside}
            frameClassName="rounded-tl-card rounded-br-card"
            sizes="(min-width: 1024px) 20rem, 100vw"
          />
        </Reveal>
      </div>

      {below.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {below.map((video, index) => (
            <Reveal key={video.id} variant="up" delay={index * 0.08}>
              <VideoEmbed
                {...video}
                frameClassName="rounded-tl-card rounded-br-card"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      ) : null}
    </div>
  );
}
