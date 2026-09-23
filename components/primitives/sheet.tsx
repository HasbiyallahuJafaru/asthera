"use client";

import { X } from "@phosphor-icons/react";
import { cn } from "cn";
import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";

/**
 * Radix Dialog as a sheet, from the shadcn registry, reskinned onto the ASTHERA
 * tokens.
 *
 * The panel curves on one corner at band radius, the device the page bands and
 * the hero portrait already use, so it reads as part of the same drawing rather
 * than as a generic drawer. The scrim is navy, since navy is the structural
 * colour.
 */

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-navy/45",
        "data-[state=open]:animate-[asthera-fade-in_220ms_var(--ease)]",
        "data-[state=closed]:animate-[asthera-fade-out_160ms_ease-out]",
        className,
      )}
      {...props}
    />
  );
}

const sides = {
  right:
    "inset-y-0 right-0 h-full w-[min(23rem,88vw)] border-l rounded-tl-band " +
    "data-[state=open]:animate-[asthera-slide-in-right_320ms_var(--ease)] " +
    "data-[state=closed]:animate-[asthera-slide-out-right_220ms_ease-out]",
  left:
    "inset-y-0 left-0 h-full w-[min(23rem,88vw)] border-r rounded-tr-band " +
    "data-[state=open]:animate-[asthera-slide-in-left_320ms_var(--ease)] " +
    "data-[state=closed]:animate-[asthera-slide-out-left_220ms_ease-out]",
  top:
    "inset-x-0 top-0 h-auto border-b rounded-b-band " +
    "data-[state=open]:animate-[asthera-slide-in-top_320ms_var(--ease)] " +
    "data-[state=closed]:animate-[asthera-slide-out-top_220ms_ease-out]",
  bottom:
    "inset-x-0 bottom-0 h-auto border-t rounded-t-band " +
    "data-[state=open]:animate-[asthera-slide-in-bottom_320ms_var(--ease)] " +
    "data-[state=closed]:animate-[asthera-slide-out-bottom_220ms_ease-out]",
} as const;

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: keyof typeof sides;
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col border-line bg-page",
          "shadow-[0_24px_70px_rgba(16,28,46,0.22)]",
          sides[side],
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            className={cn(
              "absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center",
              "rounded-pill text-text-dim transition-colors duration-200",
              "hover:bg-surface hover:text-text",
            )}
          >
            <X size={20} />
            <span className="sr-only">Close menu</span>
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 px-6 pt-7 pb-2", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-3 px-6 pt-4 pb-8", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.12em] text-text-faint",
        className,
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm leading-relaxed text-text-dim", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
