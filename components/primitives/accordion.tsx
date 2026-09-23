"use client";

import { CaretDown } from "@phosphor-icons/react";
import { cn } from "cn";
import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

/**
 * Radix Accordion, from the shadcn registry, reskinned onto the ASTHERA tokens.
 *
 * Rules are tinted from --text rather than --line, for the same reason
 * ProgrammeList does it: these sit on the coloured washes, where --line
 * disappears. Grouping is by rule and whitespace rather than by container, so
 * the set matches the programme list instead of introducing a second card idiom.
 */

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-t border-text/15 last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 cursor-pointer items-start justify-between gap-6 py-6 text-left",
          "text-lg leading-snug tracking-[-0.02em] text-text outline-none",
          "transition-colors duration-200 hover:text-accent",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <CaretDown
          size={18}
          weight="bold"
          aria-hidden
          className={cn(
            "mt-1 shrink-0 text-text-faint transition-[transform,color] duration-300 ease-out",
            "group-hover:text-accent",
            "group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent",
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden",
        "data-[state=open]:animate-[asthera-accordion-down_320ms_var(--ease)]",
        "data-[state=closed]:animate-[asthera-accordion-up_220ms_ease-out]",
      )}
      {...props}
    >
      <div className={cn("max-w-[64ch] pb-7 leading-relaxed text-text-dim", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
