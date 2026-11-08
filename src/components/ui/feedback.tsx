import { BadgeCheck, Info, TriangleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

/** Feedback for the optional request form and the illustrative course view. */

export type AlertTone = "info" | "success" | "danger";

const alertTones: Record<AlertTone, string> = {
  info: "border-accent/30 bg-accent-soft",
  success: "border-success/30 bg-success-soft",
  danger: "border-danger/30 bg-danger-soft",
};

const alertIcons: Record<AlertTone, { icon: typeof Info; className: string }> = {
  info: { icon: Info, className: "text-accent" },
  success: { icon: BadgeCheck, className: "text-success" },
  danger: { icon: TriangleAlert, className: "text-danger" },
};

export type AlertProps = {
  tone?: AlertTone;
  className?: string | undefined;
  children: ReactNode;
};

/** Errors are assertive (`role="alert"`); everything else is a polite status. */
export function Alert({ tone = "info", className, children }: AlertProps) {
  const { icon: Icon, className: iconClass } = alertIcons[tone];

  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("flex items-start gap-2 rounded-card border p-3 text-body-sm text-fg", alertTones[tone], className)}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconClass)} aria-hidden="true" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function Spinner({ className }: { className?: string | undefined }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("h-4 w-4 animate-spin", className)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export type ProgressBarProps = ComponentProps<"div"> & {
  /** 0–100. */
  value: number;
  label: string;
};

export function ProgressBar({ value, label, className, ...props }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1 w-full overflow-hidden rounded-control bg-inset", className)}
      {...props}
    >
      <div className="h-full bg-accent" style={{ width: `${clamped}%` }} />
    </div>
  );
}
