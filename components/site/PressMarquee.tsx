"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { useMemo, useSyncExternalStore } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/primitives/carousel";

type Outlet = { outlet: string; url: string };

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Press outlets as a slow reel, on the shadcn carousel.
 *
 * The reel drifts rather than ticks, stops while the pointer is over it so the
 * links stay clickable, and fades out at both edges so it never reads as a
 * widget with hard edges. Duplicate passes are hidden from the accessibility
 * tree; screen readers and reduced-motion visitors get the plain list.
 */
export function PressMarquee({ outlets }: { outlets: Outlet[] }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    // The reel is the design; the static list is the accommodation.
    () => false,
  );

  // Four passes so the loop always has type coming in from behind the fade.
  const reel = useMemo(() => [...outlets, ...outlets, ...outlets, ...outlets], [outlets]);

  const plugins = useMemo(
    () =>
      reducedMotion
        ? []
        : [
            AutoScroll({
              speed: 0.8,
              playOnInit: true,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ],
    [reducedMotion],
  );

  if (reducedMotion) {
    return (
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
        {outlets.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-lg tracking-tight text-text-faint transition-colors duration-200 hover:text-navy xl:text-xl"
            >
              {item.outlet}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]">
      <Carousel opts={{ loop: true }} plugins={plugins} className="w-full">
        <CarouselContent className="-ml-0">
          {reel.map((item, index) => {
            const duplicate = index >= outlets.length;

            return (
              <CarouselItem
                key={`${item.url}-${index}`}
                aria-hidden={duplicate || undefined}
                className="basis-1/2 pl-0 sm:basis-1/3 lg:basis-1/4"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  tabIndex={duplicate ? -1 : undefined}
                  className="flex h-full items-center justify-center px-6 py-1 text-lg tracking-tight text-text-faint transition-colors duration-200 hover:text-navy xl:text-xl"
                >
                  {item.outlet}
                </a>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
