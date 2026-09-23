"use client";

import { cn } from "cn";
import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

/**
 * Radix Tooltip, from the shadcn registry, reskinned: the navy panel with the
 * gold-less treatment reserved for small floating chrome, resolving with the
 * site's pop easing.
 */

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-lg bg-navy px-3 py-1.5 text-xs text-balance text-on-navy",
          "shadow-[0_10px_30px_rgba(13,36,64,0.32)]",
          "data-[state=delayed-open]:animate-[asthera-pop-in_180ms_var(--ease)]",
          "data-[state=instant-open]:animate-[asthera-pop-in_180ms_var(--ease)]",
          "data-[state=closed]:animate-[asthera-fade-out_120ms_ease-in]",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-navy fill-navy" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
