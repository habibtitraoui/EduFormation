import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

export type ThemeChoice = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "eduformation-landing-theme";
const CYCLE: readonly ThemeChoice[] = ["light", "dark", "system"];
const listeners = new Set<() => void>();
let memoryChoice: ThemeChoice = "dark";

type ThemeContextValue = {
  choice: ThemeChoice;
  resolved: ResolvedTheme;
  setChoice: (choice: ThemeChoice) => void;
  cycleChoice: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isChoice(value: string | null): value is ThemeChoice {
  return value === "light" || value === "dark" || value === "system";
}

function readStoredChoice(): ThemeChoice {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isChoice(stored) ? stored : memoryChoice;
  } catch {
    return memoryChoice;
  }
}

function readSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** The server and hydration render the same neutral icon; CSS was set in head. */
function serverChoice(): ThemeChoice {
  return "dark";
}

function subscribeChoice(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    memoryChoice = isChoice(event.newValue) ? event.newValue : "system";
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function storeChoice(choice: ThemeChoice): void {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // The in-memory choice still works when storage is blocked.
  }
  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const choice = useSyncExternalStore(subscribeChoice, readStoredChoice, serverChoice);
  const [system, setSystem] = useState<ResolvedTheme>(readSystemTheme);
  const resolved: ResolvedTheme = choice === "system" ? system : choice;

  useEffect(() => {
    // On hydration, the pre-paint script may already have applied a saved
    // choice. Do not replace it with the server's temporary "system" snapshot.
    if (choice !== readStoredChoice()) return;
    const root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    root.style.colorScheme = resolved;
  }, [choice, resolved]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setSystem(event.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const setChoice = useCallback((next: ThemeChoice) => storeChoice(next), []);
  const cycleChoice = useCallback(() => {
    const index = CYCLE.indexOf(readStoredChoice()) + 1;
    storeChoice(CYCLE[index % CYCLE.length] ?? "system");
  }, []);

  return <ThemeContext.Provider value={{ choice, resolved, setChoice, cycleChoice }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) throw new Error("useTheme must be used inside <ThemeProvider>.");
  return context;
}
