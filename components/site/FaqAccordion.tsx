"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/primitives/accordion";

type Faq = { question: string; answer: string };

/**
 * The partner questions, as a disclosure set.
 *
 * These were a three column definition list, which gave each answer about a 30
 * character measure. That is the failure ProgrammeList documents: three columns
 * turn real copy into tiles. Stacked rows give the answers a proper measure and
 * match the FAQPage data the page already emits. The first row opens by default,
 * so the section reads as answers rather than a row of closed bars.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible defaultValue="faq-0" className="mt-10 max-w-[68rem]">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={`faq-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
