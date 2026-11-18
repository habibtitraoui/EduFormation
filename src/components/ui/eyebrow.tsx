import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string | undefined }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
