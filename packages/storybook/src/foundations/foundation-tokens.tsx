import type { CSSProperties, ReactNode } from "react";

import styles from "./foundation-tokens.module.css";

export type ColorToken = {
  name: string;
  value: string;
  role: string;
};

export type SpacingToken = {
  name: string;
  value: string;
  role: string;
};

const COLOR_TOKENS = [
  { name: "--background", value: "#fafafa / #0a0a0a", role: "Page background" },
  { name: "--foreground", value: "#0a0a0a / #fafafa", role: "Primary text" },
  { name: "--muted", value: "#525252 / #a3a3a3", role: "Secondary text and metadata" },
  { name: "--card", value: "#ffffff / #171717", role: "Elevated surfaces" },
  { name: "--border", value: "#e5e5e5 / #262626", role: "Dividers and card borders" },
  { name: "--accent", value: "#2563eb / #60a5fa", role: "Links, CTAs, and focus emphasis" },
] as const satisfies readonly ColorToken[];

const SPACING_TOKENS = [
  { name: "0.25rem", value: "4px", role: "Tight inline gaps" },
  { name: "0.5rem", value: "8px", role: "Chip and control gaps" },
  { name: "1rem", value: "16px", role: "Default content padding" },
  { name: "1.5rem", value: "24px", role: "Card and section internal rhythm" },
  { name: "3.5rem", value: "56px", role: "Mobile section rhythm" },
  { name: "5rem", value: "80px", role: "Desktop section rhythm" },
] as const satisfies readonly SpacingToken[];

function TokenSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      className={styles.section}
      aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
    >
      <div className={styles.sectionIntro}>
        <h2
          id={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
          className={styles.sectionTitle}
        >
          {title}
        </h2>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
      {children}
    </section>
  );
}

export function ColorTokens() {
  return (
    <TokenSection
      title="Color Tokens"
      description="CSS custom properties from globals.css drive the web UI theme in both the Next app and Storybook."
    >
      <div className={styles.colorGrid}>
        {COLOR_TOKENS.map((token) => (
          <article key={token.name} className={styles.colorCard}>
            <span
              aria-hidden="true"
              className={styles.swatch}
              style={{ "--foundation-token-color": `var(${token.name})` } as CSSProperties}
            />
            <div>
              <h3 className={styles.tokenName}>{token.name}</h3>
              <p className={styles.tokenRole}>{token.role}</p>
              <code className={styles.tokenValue}>{token.value}</code>
            </div>
          </article>
        ))}
      </div>
    </TokenSection>
  );
}

export function TypographyTokens() {
  return (
    <TokenSection
      title="Typography"
      description="Geist Sans and Geist Mono are exposed through CSS variables so the app and Storybook preview share the same type contract."
    >
      <div className={styles.typeSpecimen}>
        <p className={styles.eyebrow}>--font-geist-mono</p>
        <p className={styles.displayText}>Engineering systems with clear ownership.</p>
        <p className={styles.bodyText}>
          Body copy uses Geist Sans with readable line-height, while small technical labels use
          Geist Mono.
        </p>
      </div>
    </TokenSection>
  );
}

export function SpacingTokens() {
  return (
    <TokenSection
      title="Spacing"
      description="Spacing examples document the current rhythm used by cards, chips, and sections."
    >
      <ul className={styles.spacingList}>
        {SPACING_TOKENS.map((token) => (
          <li key={token.name} className={styles.spacingRow}>
            <code className={styles.tokenName}>{token.name}</code>
            <span className={styles.spacingTrack}>
              <span className={styles.spacingBar} style={{ width: token.value }} />
            </span>
            <span className={styles.tokenRole}>{token.role}</span>
          </li>
        ))}
      </ul>
    </TokenSection>
  );
}

export function ThemeModeTokens() {
  return (
    <TokenSection
      title="Theme Modes"
      description="The app sets data-theme on the html element; these examples pin the same light and dark token overrides locally."
    >
      <div className={styles.themeGrid}>
        {(["light", "dark"] as const).map((mode) => (
          <article key={mode} className={styles.themeCard} data-theme={mode}>
            <p className={styles.eyebrow}>{mode} mode</p>
            <h3 className={styles.themeTitle}>Theme preview</h3>
            <p className={styles.themeText}>
              Background, foreground, muted, card, border, and accent tokens all change together.
            </p>
            <span className={styles.themeAccent}>Accent sample</span>
          </article>
        ))}
      </div>
    </TokenSection>
  );
}
