import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Rail, Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Section className="flex min-h-[70dvh] items-center">
        <Rail className="py-20">
        <div className="mx-auto max-w-[44rem] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">404</p>
          <h1 className="mt-5 text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text sm:text-5xl">
            Nothing at this address.
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] leading-relaxed text-text-dim">
            The page you were looking for has moved or never existed. The main sections are all one
            click away.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/journal" variant="secondary">
              Read the journal
            </Button>
          </div>
        </div>
      </Rail>
      </Section>
    </>
  );
}
