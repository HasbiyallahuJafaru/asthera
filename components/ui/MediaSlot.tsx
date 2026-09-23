import fs from "node:fs";
import path from "node:path";

import Image from "next/image";

const MEDIA_DIR = path.join(process.cwd(), "public", "media");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

/**
 * Resolves a photograph from /public/media by base name.
 *
 * The client's photography is not in the repo yet. Rather than shipping stock
 * images of other people on a real person's site, an unfilled slot renders a
 * labelled frame stating exactly which file to drop in and at what size. The
 * moment the file lands the frame is replaced by the real image with no code
 * change.
 */
export function resolveMedia(name: string): string | null {
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(MEDIA_DIR, name + ext))) {
      return `/media/${name}${ext}`;
    }
  }
  return null;
}

export function MediaSlot({
  name,
  alt,
  brief,
  width,
  height,
  priority = false,
  sizes = "100vw",
  className = "",
  imageClassName = "",
  rounded = true,
}: {
  /** Base filename inside /public/media, without extension. */
  name: string;
  alt: string;
  /** What the photograph should show, displayed in the empty frame. */
  brief: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  /** Off when the media bleeds to a slab edge and the slab owns the radius. */
  rounded?: boolean;
}) {
  const src = resolveMedia(name);
  const radius = rounded ? "rounded-media" : "";

  if (src) {
    return (
      <div className={`relative overflow-hidden bg-surface ${radius} ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-media border border-dashed border-line-strong bg-surface ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 flex flex-col justify-end gap-1.5 p-5 sm:p-6">
        <p className="font-mono text-[11px] tracking-wider text-accent">
          media/{name}.jpg
        </p>
        <p className="max-w-[34ch] text-sm leading-relaxed text-text-dim">{brief}</p>
        <p className="font-mono text-[11px] text-text-faint">
          {width} x {height}
        </p>
      </div>
    </div>
  );
}
