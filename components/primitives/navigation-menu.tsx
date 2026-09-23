import { CaretDown } from "@phosphor-icons/react";
import { cn } from "cn";
import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";

/**
 * Radix NavigationMenu, from the shadcn registry, reskinned onto the ASTHERA
 * tokens. Triggers take the site's pill treatment, the panel is the card radius
 * on the page ground with a navy-tinted shadow, and the openings run on the
 * shared asthera easing rather than a second motion vocabulary.
 */

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn("group/navigation-menu relative z-auto flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center gap-1", className)}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle =
  "group inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-pill px-4 py-2 text-sm outline-none transition-colors duration-200 hover:text-text focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50";

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle, "group", className)}
      {...props}
    >
      {children}{" "}
      <CaretDown
        size={11}
        weight="bold"
        aria-hidden
        className="relative top-px ml-1.5 text-text-faint transition-transform duration-300 group-data-[state=open]:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 left-0 w-full",
        "data-[motion=from-end]:animate-[asthera-pop-in_240ms_var(--ease)]",
        "data-[motion=from-start]:animate-[asthera-pop-in_240ms_var(--ease)]",
        "data-[motion=to-end]:animate-[asthera-pop-out_160ms_ease-in]",
        "data-[motion=to-start]:animate-[asthera-pop-out_160ms_ease-in]",
        "md:absolute md:w-auto",
        "**:data-[slot=navigation-menu-link]:focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top overflow-hidden",
          "rounded-card border border-line bg-page text-text",
          "shadow-[0_24px_70px_rgba(13,36,64,0.18)]",
          "data-[state=closed]:animate-[asthera-pop-out_160ms_ease-in]",
          "data-[state=open]:animate-[asthera-pop-in_240ms_var(--ease)]",
          "md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-xl p-3 text-sm transition-colors duration-200 outline-none",
        "hover:bg-surface focus-visible:bg-surface",
        "data-[active=true]:bg-surface",
        "[&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=hidden]:animate-[asthera-fade-out_120ms_ease-in]",
        "data-[state=visible]:animate-[asthera-fade-in_120ms_var(--ease)]",
        className,
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2.5 w-2.5 rotate-45 rounded-tl-[4px] border-t border-l border-line bg-page" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
