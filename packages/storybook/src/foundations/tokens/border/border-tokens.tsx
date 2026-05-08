import { TokenSection } from "../../shared/token-section";
import styles from "./border-tokens.module.css";

type BorderToken = {
  name: string;
  value: string;
  role: string;
};

const BORDER_TOKENS: readonly BorderToken[] = [
  {
    name: "--border-width-default",
    value: "1px",
    role: "Default surfaces, cards, and dividers",
  },
  {
    name: "--border-width-strong",
    value: "2px",
    role: "Emphasized controls and media frames",
  },
  {
    name: "--outline-width-default",
    value: "2px",
    role: "Keyboard focus on compact controls",
  },
  {
    name: "--outline-width-strong",
    value: "3px",
    role: "Keyboard focus on major interactive elements",
  },
  {
    name: "--outline-offset-tight",
    value: "2px",
    role: "Tight focus offset",
  },
  {
    name: "--outline-offset-default",
    value: "3px",
    role: "Default focus offset",
  },
];

export function BorderTokens() {
  return (
    <TokenSection
      title="Borders"
      description="Border and outline primitives normalize widths and offsets across cards, controls, and focus states."
    >
      <ul className={styles.tokenList}>
        {BORDER_TOKENS.map((token) => (
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
