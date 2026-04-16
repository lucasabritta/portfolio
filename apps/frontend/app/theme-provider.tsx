"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { isThemePreference, THEME_STORAGE_KEY, type ThemePreference } from "@/lib/theme-storage";

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (value: ThemePreference) => void;
  resolved: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readSystem(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "light" || preference === "dark") {
    return preference;
  }
  return readSystem();
}

function applyDomTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = preference;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");

  useLayoutEffect(() => {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    const next = isThemePreference(raw) ? raw : "system";
    applyDomTheme(next);
    // One-time read of persisted preference; inline script already aligned `data-theme` for paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read from localStorage into React state before paint
    setPreferenceState(next);
  }, []);

  const resolved = useMemo(() => resolveTheme(preference), [preference]);

  useEffect(() => {
    if (preference !== "system") {
      return;
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => applyDomTheme("system");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [preference]);

  const setPreference = useCallback((value: ThemePreference) => {
    setPreferenceState(value);
    localStorage.setItem(THEME_STORAGE_KEY, value);
    applyDomTheme(value);
  }, []);

  const value = useMemo(
    () => ({ preference, setPreference, resolved }),
    [preference, resolved, setPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within ThemeProvider");
  }
  return ctx;
}
