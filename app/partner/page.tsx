import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, faqGraph, pageMeta } from "@/lib/seo";
import { contact } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Partner with ASTHERA",
  description:
    "Work with ASTHERA on space-intelligence projects, flood and climate risk, agriculture, environmental monitoring, research and STEM education. For government, universities, companies, NGOs and funders.",
  path: "/partner",
});

const ways = [
  {
    title: "Commission intelligence",
    body: "Bring us a question about flood risk, crops, land or environmental change. We find the right data, analyse it and deliver findings your team can act on.",
  },
  {
    title: "Get technical support",
    body: "Geospatial and GIS analysis, data visualisation and training for government bodies and institutions building their own capability.",
  },
  {
    title: "Collaborate on research",
    body: "Joint research and technology projects with universities, research organisations and international partners.",
  },
  {
    title: "Support education and youth",
    body: "Fund, host or co-run STEM and space education, workshops, mentorship and innovation challenges for young people.",
  },
];

const faqs = [
  {
    question: "Who does ASTHERA partner with?",
    answer:
      "Government institutions, universities, research organisations, private companies, NGOs and international organisations. We work across disciplines and prefer to build with partners rather than alone.",
  },
  {
    question: "What does an intelligence project look like?",
    answer:
      "It starts with the problem, not the data. We agree the question and who will use the answer, choose the satellite and geospatial data that fits, analyse it, and deliver the result in a form that supports a real decision.",
  },
  {
    question: "How do I request a session for my school or university?",
    answer:
      "Send a message through the form below and choose the education option. Include your location, the age group and roughly how many students.",
  },
  {
    question: "How quickly does ASTHERA respond?",
    answer:
      "ASTHERA is a small, early-stage team, and enquiries are answered directly, usually within a week.",
  },
];

export default function PartnerPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: "Partner", path: "/partner" }])} />
      <JsonLd data={faqGraph(faqs)} />

      <PageHeader
        badge="Partner with us"
        title={
          <>
            Bring us a problem <span className="accent-word">on the ground</span>.
          </>
        }
        lede="We work with government, universities, research organisations, companies, NGOs and international bodies. Tell us the challenge and we will work out what space data can do about it."
      />

      <Section>
        <Rail className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-balance text-3xl leading-[1.08] tracking-[-0.03em] text-text">
              Ways to work together
            </h2>

            <ul className="mt-9 grid gap-4">
              {ways.map((way) => (
                <li key={way.title} className="rounded-card bg-surface p-6">
                  <h3 className="text-base font-medium text-text">{way.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-text-dim">
                    {way.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-9 text-sm text-text-dim">
              Prefer email? Write to{" "}
              <a
                href={`mailto:${contact.partnerships}`}
                className="text-accent underline underline-offset-4 hover:text-accent-bright"
              >
                {contact.partnerships}
              </a>
              .
            </p>
          </div>

          <div className="rounded-card border border-line p-7 sm:p-9">
            <h2 className="text-3xl leading-[1.08] tracking-[-0.03em] text-text">
              Start a conversation
            </h2>
            <p className="mt-3 mb-9 text-sm leading-relaxed text-text-dim">
              This reaches the ASTHERA team directly.
            </p>
            <EnquiryForm defaultTopic="partnership" />
          </div>
        </div>
      </Rail>
      </Section>

      <Section tone="green" curve="tl-br">
        <Rail className="py-20 lg:py-28">
        <h2 className="text-balance text-4xl leading-[1.06] tracking-[-0.03em] text-text">
          Before you write
        </h2>

        <FaqAccordion faqs={faqs} />
      </Rail>
      </Section>
    </>
  );
}
