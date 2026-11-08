import { cn } from "../lib/cn";
import { BRAND_MONOGRAM, BRAND_NAME } from "../lib/brand";

/**
 * The product's own mark (§5.6): a 28px ink square with `EF`, 8px from the
 * word. `paper` is the variant used inside the certificate illustration, which
 * is a light document in both themes.
 */
export type WordmarkTone = "ink" | "paper";

const tones: Record<WordmarkTone, { mark: string; name: string }> = {
  ink: { mark: "bg-ink text-ink-fg", name: "text-fg" },
  paper: { mark: "bg-paper-fg text-paper", name: "text-paper-fg" },
};

export function Wordmark({ tone = "ink", className }: { tone?: WordmarkTone; className?: string | undefined }) {
  const style = tones[tone];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "grid h-7 w-7 shrink-0 place-items-center rounded-control text-[12px] leading-4 font-semibold tracking-tight",
          style.mark,
        )}
      >
        {BRAND_MONOGRAM}
      </span>
      <span className={cn("text-body font-semibold tracking-tight", style.name)}>{BRAND_NAME}</span>
    </span>
  );
}
