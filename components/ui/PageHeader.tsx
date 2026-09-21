import type { ReactNode } from "react";

import { Badge } from "./Badge";
import { Rail, Section } from "./Section";

/**
 * Opening band for interior pages. The headline holds the left seven columns
 * and the lede is indented under it, so the page opens off centre like the
 * homepage rather than as a centred masthead.
 */
export function PageHeader({
  badge,
  title,
  lede,
  children,
}: {
  badge?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Section arc={{ x: 84, y: 22, rx: 40, ry: 26, rotate: -19, colour: "gold", opacity: 0.5 }}>
      <Rail width="wide" className="pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8">
            {badge ? <Badge>{badge}</Badge> : null}

            <h1
              className={`max-w-[17ch] text-[2.5rem] leading-[1.0] tracking-[-0.035em] text-text sm:text-[3.25rem] lg:text-[4rem] ${
                badge ? "mt-7" : ""
              }`}
            >
              {title}
            </h1>

            {lede ? (
              <div className="mt-8 max-w-[58ch] text-lg leading-relaxed text-text-dim lg:ml-14">
                {lede}
              </div>
            ) : null}

            {children ? <div className="mt-9 lg:ml-14">{children}</div> : null}
          </div>
        </div>
      </Rail>
    </Section>
  );
}
