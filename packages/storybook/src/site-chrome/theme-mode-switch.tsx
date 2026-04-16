"use client";

import styles from "./theme-mode-switch.module.css";

export type SiteThemePreference = "system" | "light" | "dark";

export type ThemeModeSwitchProps = {
  value: SiteThemePreference;
  onChange: (value: SiteThemePreference) => void;
  idPrefix?: string;
};

export function ThemeModeSwitch({ value, onChange, idPrefix = "theme" }: ThemeModeSwitchProps) {
  return (
    <div className={styles.group} role="group" aria-label="Theme">
      {(
        [
          { key: "system" as const, label: "System" },
          { key: "light" as const, label: "Light" },
          { key: "dark" as const, label: "Dark" },
        ] as const
      ).map(({ key, label }) => {
        const id = `${idPrefix}-${key}`;
        const pressed = value === key;
        return (
          <button
            key={key}
            id={id}
            type="button"
            className={pressed ? styles.segmentPressed : styles.segment}
            aria-pressed={pressed}
            onClick={() => onChange(key)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
