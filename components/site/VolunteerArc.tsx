"use client";

import { CaretLeft, CaretRight, Pause, Play } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type VolunteerCard = {
  name: string;
  role: string;
  /** Resolved on the server from /public/media; null shows the initials tile. */
  photo: string | null;
};

/** How long each volunteer holds the front, then the time the arc takes to turn. */
const HOLD_MS = 3000;
const TURN_MS = 900;
/** Slots either side of the front; the outermost is where cards fade out. */
const REACH = 3;

/**
 * Volunteers on a slowly turning arc.
 *
 * Cards sit on a shallow curve that rises toward the edges. The card at the
 * front is full size; each step away from it shrinks, lifts and dims it, and
 * at the edge of the arc it fades out entirely. Every three seconds the arc
 * turns one place, so the next volunteer comes to the front, and the last one
 * wraps round unseen to rejoin at the far side.
 *
 * It scrolls on its own, pausing only offscreen, in a hidden tab, or when the
 * visitor presses pause, and does not move by itself under
 * prefers-reduced-motion. The arrows turn it by hand in every mode.
 */
export function VolunteerArc({ volunteers: people }: { volunteers: VolunteerCard[] }) {
  // The arc needs a card for every visible slot plus one hidden on each side,
  // so a card always wraps round while faded out. Short lists repeat.
  const volunteers = fill(people, REACH * 2 + 2);
  const count = volunteers.length;
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(1200);
  const [userPaused, setUserPaused] = useState(false);
  const [onscreen, setOnscreen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const turn = useCallback(
    (step: number) => setActive((index) => (index + step + count) % count),
    [count],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const resize = new ResizeObserver(([entry]) => {
      if (entry) setWidth(entry.contentRect.width);
    });
    const visible = new IntersectionObserver(([entry]) => setOnscreen(Boolean(entry?.isIntersecting)), {
      threshold: 0.25,
    });
    resize.observe(stage);
    visible.observe(stage);
    return () => {
      resize.disconnect();
      visible.disconnect();
    };
  }, []);

  const running = onscreen && !userPaused && !reduced && count > 1;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) turn(1);
    }, HOLD_MS + TURN_MS);
    return () => window.clearTimeout(timer);
  }, [running, active, turn]);

  if (count === 0) return null;

  // The arc's geometry scales with the stage: a wide, shallow curve on desktop,
  // a tighter one on a phone.
  const compact = width < 640;
  const cardWidth = compact ? Math.min(220, width * 0.56) : Math.min(280, width * 0.24);
  const lift = compact ? 22 : 34;
  // Neighbours stand clear of the front card instead of sliding under it: half
  // the front card, half a shrunken neighbour, and a gap. On a phone that puts
  // them at the screen edges, just peeking in.
  const gap = compact ? 12 : 16;
  const spacing = cardWidth * (0.5 + 0.5 * cardScale(1)) + gap;

  // Tall enough for whichever visible card reaches highest (usually the front
  // one), with no dead band above it.
  const cardHeight = cardWidth * 1.25;
  let stageHeight = 0;
  for (let distance = 0; distance < REACH; distance += 1) {
    const scale = cardScale(distance);
    stageHeight = Math.max(stageHeight, cardHeight * scale + Math.pow(distance, 1.35) * lift);
  }

  const offsets = volunteers.map((_, index) => {
    let offset = (index - active) % count;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  });

  const front = volunteers[active];

  return (
    <div>
      <div
        ref={stageRef}
        className="relative mx-auto"
        style={{ height: stageHeight }}
        role="group"
        aria-roledescription="carousel"
        aria-label="Our volunteers"
      >
        {volunteers.map((volunteer, index) => {
          const offset = offsets[index];
          const distance = Math.abs(offset);
          const hidden = distance >= REACH;

          const x = offset * spacing;
          const y = -Math.pow(distance, 1.35) * lift;
          const scale = cardScale(distance);
          const opacity = hidden ? 0 : 1 - distance * 0.22;

          return (
            <figure
              key={index}
              aria-hidden={offset !== 0}
              className="absolute bottom-0 left-1/2 m-0"
              style={{
                width: cardWidth,
                marginLeft: -cardWidth / 2,
                transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                transformOrigin: "50% 100%",
                opacity,
                zIndex: 10 - distance,
                transition: `transform ${TURN_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${TURN_MS}ms ease`,
                pointerEvents: hidden ? "none" : undefined,
              }}
            >
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-card bg-wash-navy shadow-[0_24px_48px_-24px_rgba(19,52,88,0.45)] transition-[filter] duration-700 ${
                  offset === 0 ? "" : "saturate-[0.6]"
                }`}
              >
                {volunteer.photo ? (
                  <Image
                    src={volunteer.photo}
                    alt={offset === 0 ? `${volunteer.name}, ${volunteer.role}` : ""}
                    fill
                    sizes={`${Math.round(cardWidth)}px`}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_90%_at_50%_0%,#1c4270_0%,#133458_60%,#0d2440_100%)]">
                    <span className="text-[2.5rem] tracking-[0.08em] text-white/85">
                      {initials(volunteer.name)}
                    </span>
                  </div>
                )}
              </div>
            </figure>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-6 text-center">
        <div aria-live={running ? "off" : "polite"} className="min-h-[3.75rem]">
          <div key={active} className="volunteer-caption">
            <p className="text-xl tracking-tight text-text">{front.name}</p>
            <p className="mt-1 text-sm text-text-dim">{front.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => turn(-1)}
            aria-label="Previous volunteer"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-pill border border-line-strong text-text transition-colors duration-200 hover:border-text"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          {!reduced ? (
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              aria-label={userPaused ? "Play carousel" : "Pause carousel"}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-pill border border-line-strong text-text transition-colors duration-200 hover:border-text"
            >
              {userPaused ? <Play size={15} weight="fill" /> : <Pause size={15} weight="fill" />}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => turn(1)}
            aria-label="Next volunteer"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-pill border border-line-strong text-text transition-colors duration-200 hover:border-text"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

function cardScale(distance: number) {
  return Math.max(0.4, 1 - distance * 0.17);
}

function fill<T>(items: T[], minimum: number) {
  if (items.length === 0) return items;
  const out = [...items];
  while (out.length < minimum) out.push(...items);
  return out;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
