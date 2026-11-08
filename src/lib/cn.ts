import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the product's named type scale. Otherwise it
// mistakes e.g. `text-body-sm` for a colour and removes `text-ink-fg`.
const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-sm", "display", "display-lg", "title", "block", "card", "body", "body-sm", "label", "meta"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return merge(clsx(inputs));
}
