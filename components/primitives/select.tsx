"use client";

import { CaretDown, CaretUp, Check } from "@phosphor-icons/react";
import { cn } from "cn";
import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";

/**
 * Radix Select from the shadcn registry, reskinned onto the ASTHERA tokens.
 *
 * A native select draws its option list in the operating system, which put a
 * grey system widget in the middle of a pill form. Shape follows the tokens:
 * the trigger is a control so it is a pill matching the text inputs, the menu
 * is a card, rows are controls. A highlighted row takes the green action colour
 * because it is an active state.
 */

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-3 rounded-pill",
        "border border-line-strong bg-page px-5 py-3 text-left text-sm text-text",
        "transition-colors duration-200 outline-none",
        "hover:border-text data-[state=open]:border-accent",
        "data-[placeholder]:text-text-faint",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]_svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretDown
          size={14}
          weight="bold"
          className="shrink-0 text-text-faint transition-transform duration-200"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height)",
          "min-w-[var(--radix-select-trigger-width)] overflow-y-auto",
          "rounded-card border border-line bg-page p-1.5",
          "shadow-[0_18px_50px_rgba(16,28,46,0.15)]",
          "origin-(--radix-select-content-transform-origin)",
          "data-[state=open]:animate-[asthera-pop-in_180ms_var(--ease)]",
          "data-[state=closed]:animate-[asthera-pop-out_120ms_ease-out]",
          position === "popper" && "data-[side=bottom]:mt-2 data-[side=top]:mb-2",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="grid gap-0.5">{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-4 pt-2 pb-1 text-[11px] font-medium uppercase tracking-[0.12em] text-text-faint",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-pointer items-center justify-between gap-3 rounded-pill",
        "px-4 py-2.5 text-sm text-text-dim select-none outline-none",
        "transition-colors duration-150",
        "data-highlighted:bg-accent-soft data-highlighted:text-accent",
        "data-[state=checked]:text-text",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator asChild>
        <Check size={14} weight="bold" className="shrink-0 text-accent" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none my-1.5 h-px bg-line", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex items-center justify-center py-1 text-text-faint", className)}
      {...props}
    >
      <CaretUp size={12} weight="bold" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex items-center justify-center py-1 text-text-faint", className)}
      {...props}
    >
      <CaretDown size={12} weight="bold" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
