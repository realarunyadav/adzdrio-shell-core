import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { appConfig } from "@/config/app.config";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
  allowUserToggle: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemMode(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(appConfig.theme.defaultMode);
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">(
    appConfig.theme.defaultMode === "dark" ? "dark" : "light",
  );

  // Read persisted preference after hydration to avoid SSR mismatches.
  useEffect(() => {
    const stored = window.localStorage.getItem(appConfig.theme.storageKey) as ThemeMode | null;
    if (stored === "light" || stored === "dark" || stored === "system") setModeState(stored);
  }, []);

  useEffect(() => {
    const next = mode === "system" ? systemMode() : mode;
    setResolvedMode(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(appConfig.theme.storageKey, next);
    } catch {
      // Storage unavailable — preference stays session-only.
    }
  }, []);

  const toggle = useCallback(() => {
    setMode(resolvedMode === "dark" ? "light" : "dark");
  }, [resolvedMode, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolvedMode, setMode, toggle, allowUserToggle: appConfig.theme.allowUserToggle }),
    [mode, resolvedMode, setMode, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within <ThemeProvider>.");
  return context;
}