import styles from "./primitive-list.module.css";
import type { PrimitiveToken } from "./primitive-types";

export function PrimitiveList({ tokens }: { tokens: readonly PrimitiveToken[] }) {
  return (
    <ul className={styles.tokenList}>
      {tokens.map((token) => (
        <li key={token.name} className={styles.tokenRow}>
          <code className={styles.tokenName}>{token.name}</code>
          <code className={styles.tokenValue}>{token.value}</code>
          <span className={styles.tokenRole}>{token.role}</span>
        </li>
      ))}
    </ul>
  );
}
