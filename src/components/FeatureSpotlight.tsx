import type { ReactNode } from "react";

import { cn } from "../lib/cn";

import { Eyebrow, SectionShell } from "./ui";

type FeatureSpotlightProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  figure: ReactNode;
  reverse?: boolean;
  children: ReactNode;
};

/** Alternating product details with a consistent stage for the sample UI. */
export function FeatureSpotlight({ id, eyebrow, title, description, figure, reverse = false, children }: FeatureSpotlightProps) {
  const headingId = `${id}-title`;

  return (
    <SectionShell id={id} ariaLabelledby={headingId} className="border-t border-line">
      <div className="spotlight-grid">
        <div className="min-w-0">
          <Eyebrow className="mb-4 sm:mb-5">{eyebrow}</Eyebrow>
          <h2 id={headingId} className="display-type spotlight-title">{title}</h2>
          <p className="mt-4 max-w-prose text-body text-muted">{description}</p>
          {children}
        </div>
        <div className={cn("showcase-frame", reverse && "lg:order-first")}>{figure}</div>
      </div>
    </SectionShell>
  );
}
