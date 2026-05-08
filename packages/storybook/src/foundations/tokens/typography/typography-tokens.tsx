import { TokenSection } from "../../shared/token-section";
import styles from "./typography-tokens.module.css";

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
