import { GraduationCap } from "lucide-react";

import { BRAND_MONOGRAM, BRAND_NAME, PRODUCT_NAME } from "../lib/brand";
import { cn } from "../lib/cn";

export type WordmarkTone = "ink" | "paper";

/** EduFormation's site wordmark; the sample document uses the owner's imprint. */
export function Wordmark({ tone = "ink", className }: { tone?: WordmarkTone; className?: string | undefined }) {
  return (
    <span dir="ltr" className={cn("inline-flex items-center gap-2.5", className)}>
      {tone === "paper" ? (
        <>
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-control bg-paper-fg text-meta font-semibold text-paper">
            {BRAND_MONOGRAM}
          </span>
          <span className="text-body font-semibold text-paper-fg">{BRAND_NAME}</span>
        </>
      ) : (
        <>
          <span className="brand-mark"><GraduationCap className="size-5" aria-hidden="true" /></span>
          <span className="display-type text-[1.125rem] text-fg">{PRODUCT_NAME}</span>
        </>
      )}
    </span>
  );
}
