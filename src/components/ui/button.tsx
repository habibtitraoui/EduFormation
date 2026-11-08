import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/** Three variants are used here; `danger` is never rendered on the page. */
const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-control text-center font-medium " +
  "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-ink-fg hover:bg-ink/88",
  secondary: "border border-line bg-panel text-fg shadow-card hover:bg-inset",
  ghost: "text-muted hover:bg-inset hover:text-fg",
  danger: "bg-danger text-white hover:bg-danger/90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-label",
  md: "h-9 px-4 text-body-sm",
  lg: "h-10 px-5 text-body-sm",
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

/** A cross-origin call to action: same visual language as `Button`, real link. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <a className={buttonStyles({ variant, size, className })} {...props} />;
}
