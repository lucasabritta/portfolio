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
    </TokenSection>
  );
}
