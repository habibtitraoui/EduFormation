import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

/**
 * Landing-only primitive (§5.7): the bordered panel every drawn figure lives in.
 *
 * Captions are `text-muted`, not the `text-subtle` the brief suggests: at 12px
 * `--subtle` measures 3.1:1 on `--panel` in the light theme, which fails AA
 * (§10 outranks §7's class hint).
 */
export type FigureProps = {
  caption?: string | undefined;
  className?: string | undefined;
  contentClassName?: string | undefined;
  children: ReactNode;
};

export function Figure({ caption, className, contentClassName, children }: FigureProps) {
  return (
    <figure className={cn("rounded-card border border-line bg-panel shadow-card", className)}>
      <div className={cn("overflow-hidden rounded-card", contentClassName)}>{children}</div>
      {caption ? (
        <figcaption className="border-t border-line px-4 py-3 text-meta text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
