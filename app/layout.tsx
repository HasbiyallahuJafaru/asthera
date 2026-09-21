import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { organisationGraph } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";
import "./globals.css";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ASTHERA | Space science built in Africa, for Africa",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "ASTHERA",
    "Asthera Space",
    "Fauziyya Auwal Muhammad",
    "Nigerian astronaut candidate",
    "astronomy education Nigeria",
    "STEM outreach Kaduna",
    "space technology Africa",
  ],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#e9edec",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-[100dvh] antialiased">
        <JsonLd data={organisationGraph()} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-card focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="relative z-10">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
