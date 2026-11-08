import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

export type BadgeTone = "neutral" | "success" | "warning" | "accent";

/** Compact status label with token-based tones. */
const tones: Record<BadgeTone, string> = {
  neutral: "border-line bg-inset text-muted",
  success: "border-success/30 bg-success-soft text-success",
  warning: "border-warning/30 bg-warning-soft text-warning",
  accent: "border-accent/30 bg-accent-soft text-accent",
};

export type BadgeProps = ComponentProps<"span"> & { tone?: BadgeTone };

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-control border px-2 py-0.5 text-meta whitespace-nowrap",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
