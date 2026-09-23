import { cn } from "cn";

/**
 * Key cap, from the shadcn registry, reskinned: mono face on the surface tint
 * with a hairline border, reading as a physical key rather than a label.
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1",
        "rounded-[5px] border border-line bg-surface px-1.5 font-mono text-[11px] leading-none font-medium text-text-dim",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:border-white/25 [[data-slot=tooltip-content]_&]:bg-white/10 [[data-slot=tooltip-content]_&]:text-white/85",
        className,
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
