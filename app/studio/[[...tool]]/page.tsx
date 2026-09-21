import type { Metadata, Viewport } from "next";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

/** The Studio is a private tool. It must never appear in search results. */
export const metadata: Metadata = {
  title: "ASTHERA Studio",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto flex min-h-[100dvh] max-w-xl flex-col justify-center gap-4 px-6">
        <h1 className="text-2xl font-medium tracking-tight">Studio not connected</h1>
        <p className="text-text-dim leading-relaxed">
          Set <code className="font-mono text-accent">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code className="font-mono text-accent">NEXT_PUBLIC_SANITY_DATASET</code> in your
          environment, then reload this page. Until then the site renders its built in fallback
          content and nothing is broken.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
