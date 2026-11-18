import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

import { Eyebrow } from "./eyebrow";

/** Shared gutters, anchor offset and editorial heading for the landing page. */
export type SectionShellProps = {
  id: string;
  title?: string | undefined;
  eyebrow?: string | undefined;
  description?: string | undefined;
  /** For sections whose heading is rendered inside their content instead. */
  ariaLabelledby?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
};

export function SectionShell({ id, title, eyebrow, description, ariaLabelledby, className, children }: SectionShellProps) {
  const headingId = title ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={ariaLabelledby ?? headingId}
      className={cn("section-shell scroll-mt-20", className)}
    >
      <div className="mx-auto w-full max-w-page px-5 md:px-10 xl:px-8">
        {title ? (
          <div className="section-heading">
            {eyebrow ? <Eyebrow className="mb-4 sm:mb-5">{eyebrow}</Eyebrow> : null}
            <h2 id={headingId} className="display-type section-title">{title}</h2>
            {description ? <p className="section-description">{description}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
