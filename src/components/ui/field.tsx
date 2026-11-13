import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

export type FieldProps = {
  label: string;
  htmlFor: string;
  /** Rendered with `role="alert"` and wired to the control by `aria-describedby`. */
  error?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
};

export function Field({ label, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-label text-fg">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-label text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function fieldErrorId(htmlFor: string): string {
  return `${htmlFor}-error`;
}

export type InputProps = ComponentProps<"input"> & { invalid?: boolean | undefined };

export function Input({ className, invalid = false, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-control border bg-panel px-3 text-body-sm text-fg shadow-card",
        "transition-colors duration-150 placeholder:text-muted",
        invalid ? "border-danger" : "border-line",
        className,
      )}
      {...props}
    />
  );
}

export type TextareaProps = ComponentProps<"textarea"> & { invalid?: boolean | undefined };

export function Textarea({ className, invalid = false, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-control border bg-panel px-3 py-2 text-body-sm text-fg shadow-card",
        "transition-colors duration-150 placeholder:text-muted",
        invalid ? "border-danger" : "border-line",
        className,
      )}
      {...props}
    />
  );
}
