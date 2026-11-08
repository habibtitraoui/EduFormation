import { Monitor, Moon, Sun } from "lucide-react";

import { cn } from "../lib/cn";
import { useLocale } from "../lib/locale";
import { useTheme, type ThemeChoice } from "../lib/theme";

const ICONS: Record<ThemeChoice, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

/**
 * A 32px icon button that cycles light → dark → system (§5.5). The accessible
 * name always states the current choice, because an icon on its own cannot.
 */
export function ThemeToggle({ className }: { className?: string | undefined }) {
  const { choice, cycleChoice } = useTheme();
  const { t } = useLocale();

  const Icon = ICONS[choice];
  const names: Record<ThemeChoice, string> = {
    light: t.footer.themeLight,
    dark: t.footer.themeDark,
    system: t.footer.themeSystem,
  };
  const label = `${t.footer.theme}: ${names[choice]}`;

  return (
    <button
      type="button"
      onClick={cycleChoice}
      aria-label={label}
      aria-pressed={choice === "dark"}
      className={cn(
        "js-only grid h-8 w-8 shrink-0 place-items-center rounded-control border border-line bg-panel text-muted",
        "transition-colors duration-150 hover:bg-inset hover:text-fg",
        className,
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
