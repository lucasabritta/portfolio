import type { CSSProperties } from "react";

import { TokenSection } from "../../shared/token-section";
import styles from "./color-tokens.module.css";

export type ColorToken = {
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
