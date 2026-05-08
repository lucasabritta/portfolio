import { TokenSection } from "../../shared/token-section";
import styles from "./theme-mode-tokens.module.css";

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
