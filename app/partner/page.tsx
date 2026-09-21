import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Rail, Section } from "@/components/ui/Section";
import { breadcrumbGraph, faqGraph, pageMeta } from "@/lib/seo";
import { contact } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Partner with ASTHERA",
  description:
    "Work with ASTHERA on astronomy education, STEM outreach and applied satellite technology in Nigeria. For funders, universities, agencies and schools.",
  path: "/partner",
});

const ways = [
  {
    title: "Fund a programme",
    body: "Direct support for astronomy teaching, outreach sessions and the equipment they run on. We report on what your funding reached.",
  },
  {
    title: "Collaborate on research",
    body: "Joint work on satellite and geospatial applications for climate, agriculture, flood management and security in African contexts.",
  },
  {
    title: "Host a session",
    body: "Schools, universities and community organisations can bring an ASTHERA astronomy or STEM session to their students.",
  },
  {
    title: "Supply equipment",
    body: "Telescopes, computing and teaching hardware go directly into programmes and stay with the institutions that host them.",
  },
];

const faqs = [
  {
    question: "Who does ASTHERA partner with?",
    answer:
      "Funders, universities, government agencies, schools and companies who want African space science capability built locally rather than imported. Partnerships cover programme funding, research collaboration, equipment and outreach hosting.",
  },
  {
    question: "How do I request an ASTHERA session for my school?",
    answer:
      "Send a message through the partnership form on astheraspace.com selecting the option to host a programme, including your location, the age group and the number of students.",
  },
  {
    question: "How quickly does ASTHERA respond to enquiries?",
    answer:
      "ASTHERA is a small team. Enquiries are answered directly by the founder, usually within a week.",
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
            Build it here, rather than <span className="accent-word">import it</span>.
          </>
        }
        lede="ASTHERA works with funders, universities, agencies and schools who want space science capability rooted in Nigeria. Tell us what you have in mind."
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
              This reaches the founder directly.
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

        <dl className="mt-10 grid gap-10 md:grid-cols-3 md:gap-x-12">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-base font-medium text-text">{faq.question}</dt>
              <dd className="mt-2.5 text-sm leading-relaxed text-text-dim">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Rail>
      </Section>
    </>
  );
}
