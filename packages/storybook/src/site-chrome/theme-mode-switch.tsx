"use client";

import type { ReactNode } from "react";

import styles from "./theme-mode-switch.module.css";

export type SiteThemePreference = "system" | "light" | "dark";

export type ThemeModeSwitchProps = {
  value: SiteThemePreference;
  onChange: (value: SiteThemePreference) => void;
  idPrefix?: string;
};

type ThemeOption = {
  key: SiteThemePreference;
  label: string;
  icon: ReactNode;
};

const iconProps = {
  "aria-hidden": true as const,
  focusable: false,
  height: 16,
  width: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SystemIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
  </svg>
);

const SunIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M4.93 19.07l1.41-1.41" />
    <path d="M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg {...iconProps}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

const OPTIONS: readonly ThemeOption[] = [
  { key: "system", label: "System", icon: <SystemIcon /> },
  { key: "light", label: "Light", icon: <SunIcon /> },
  { key: "dark", label: "Dark", icon: <MoonIcon /> },
];

export function ThemeModeSwitch({ value, onChange, idPrefix = "theme" }: ThemeModeSwitchProps) {
  return (
    <div className={styles.group} role="group" aria-label="Theme">
      {OPTIONS.map(({ key, label, icon }) => {
        const id = `${idPrefix}-${key}`;
        const pressed = value === key;
        return (
          <button
            key={key}
            id={id}
            type="button"
            className={pressed ? styles.segmentPressed : styles.segment}
            aria-pressed={pressed}
            aria-label={label}
            title={label}
            onClick={() => onChange(key)}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}
