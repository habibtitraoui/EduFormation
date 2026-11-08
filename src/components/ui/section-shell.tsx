import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

/**
 * Landing-only primitive (§5.7). Every section on the page renders through this,
 * so vertical rhythm (64px mobile / 96px desktop), the 1120px container, the
 * gutters and the 72px anchor offset cannot drift between sections.
 */
export type SectionShellProps = {
  id?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  action?: ReactNode | undefined;
  /** Pass `sr-only` when a section needs a heading it should not display. */
  titleClassName?: string | undefined;
  /** For sections whose heading is rendered inside their content instead. */
  ariaLabelledby?: string | undefined;
  className?: string | undefined;
  containerClassName?: string | undefined;
  children: ReactNode;
};

export function SectionShell({
  id,
  title,
  description,
  action,
  titleClassName,
  ariaLabelledby,
  className,
  containerClassName,
  children,
}: SectionShellProps) {
  const headingId = id && title ? `${id}-title` : undefined;
  const hasHeader = Boolean(title || action);

  return (
    <section
      id={id}
      tabIndex={id ? -1 : undefined}
      aria-labelledby={ariaLabelledby ?? headingId}
      className={cn("scroll-mt-18 py-16 md:py-24", className)}
    >
      <div className={cn("mx-auto w-full max-w-page px-5 md:px-6 xl:px-8", containerClassName)}>
        {hasHeader ? (
          <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-prose">
              {title ? (
                <h2 id={headingId} className={cn("text-title text-fg", titleClassName)}>
                  {title}
                </h2>
              ) : null}
              {description ? <p className="mt-3 text-body text-muted">{description}</p> : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
