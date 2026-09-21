"use client";

import { PlayCircle } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

/**
 * Click to play, rather than an iframe on load.
 *
 * A YouTube iframe pulls roughly a megabyte of third-party script before anyone
 * decides to watch, which would undo the performance work elsewhere on the site
 * and set cookies on every visitor. This renders a locally hosted still and
 * loads the player only when asked, from youtube-nocookie.com.
 */
export function VideoEmbed({
  id,
  title,
  channel,
  channelUrl,
  poster,
  className = "",
}: {
  id: string;
  title: string;
  channel: string;
  channelUrl: string;
  /** Path to a locally hosted still, so no request reaches YouTube on load. */
  poster: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={className}>
      <div className="relative aspect-video w-full overflow-hidden rounded-tl-band rounded-br-band bg-navy">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${title}`}
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/20 to-transparent"
            />
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center text-white/90 transition-transform duration-300 ease-out group-hover:scale-105"
            >
              <PlayCircle size={76} weight="fill" />
            </span>
          </button>
        )}
      </div>

      <figcaption className="mt-4 text-sm text-text-dim">
        {title}.{" "}
        <a
          href={channelUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent underline underline-offset-4 hover:text-accent-bright"
        >
          {channel}
        </a>
        .
      </figcaption>
    </figure>
  );
}
