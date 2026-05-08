import { TokenSection } from "../../shared/token-section";
import styles from "./layout-tokens.module.css";

type LayoutToken = {
  name: string;
  value: string;
  role: string;
};

const LAYOUT_TOKENS: readonly LayoutToken[] = [
  { name: "--layout-container-max", value: "70rem", role: "Main page content container" },
  { name: "--layout-reading-max", value: "42rem", role: "Readable long-form text width" },
  { name: "--layout-scroll-offset", value: "5rem", role: "Anchor and skip-link offset" },
  { name: "--control-hit-size-md", value: "2.75rem", role: "Minimum tap target size" },
  { name: "--size-avatar-md", value: "5rem", role: "Default profile/avatar size" },
] as const;

export function LayoutTokens() {
  return (
    <TokenSection
      title="Layout Tokens"
      description="Semantic layout tokens map the primitive size scale to page structure and interaction targets."
    >
      <ul className={styles.tokenList}>
        {LAYOUT_TOKENS.map((token) => (
          <li key={token.name} className={styles.tokenRow}>
            <code className={styles.tokenName}>{token.name}</code>
            <code className={styles.tokenValue}>{token.value}</code>
            <span className={styles.tokenRole}>{token.role}</span>
          </li>
        ))}
      </ul>
      <div className={styles.demoGroup}>
        <h3 className={styles.demoTitle}>Container and reading width</h3>
        <div className={styles.widthDemo}>
          <div className={styles.widthRow}>
            <code className={styles.demoLabel}>--layout-container-max</code>
            <span className={styles.widthTrack}>
              <span className={styles.widthContainer} />
            </span>
          </div>
          <div className={styles.widthRow}>
            <code className={styles.demoLabel}>--layout-reading-max</code>
            <span className={styles.widthTrack}>
              <span className={styles.widthReading} />
            </span>
          </div>
        </div>

        <h3 className={styles.demoTitle}>Hit target sizes</h3>
        <div className={styles.hitTargetRow}>
          <button type="button" className={styles.hitTargetSm}>
            sm
          </button>
          <button type="button" className={styles.hitTargetMd}>
            md
          </button>
        </div>

        <h3 className={styles.demoTitle}>Avatar sizing</h3>
        <div className={styles.avatarRow}>
          <span className={styles.avatarSample} />
          <code className={styles.demoLabel}>--size-avatar-md</code>
        </div>
      </div>
    </TokenSection>
  );
}
