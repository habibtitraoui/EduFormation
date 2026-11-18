import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/** Three variants are used here; `danger` is never rendered on the page. */
const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-control text-center font-medium " +
  "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "primary-action text-ink-fg",
  secondary: "border border-accent/55 bg-panel text-accent hover:bg-accent-soft",
  ghost: "text-muted hover:bg-inset hover:text-fg",
  danger: "bg-danger text-white hover:bg-danger/90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-label",
  md: "min-h-11 px-4 py-2 text-body-sm",
  lg: "min-h-12 px-5 py-2.5 text-body",
};

export type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonStyles({ variant = "primary", size = "md", className }: ButtonStyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export type ButtonProps = ComponentProps<"button"> & ButtonStyleOptions;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

export type ButtonLinkProps = ComponentProps<"a"> & ButtonStyleOptions;

/** The same visual language as `Button`, with native anchor behavior. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <a className={buttonStyles({ variant, size, className })} {...props} />;
}
