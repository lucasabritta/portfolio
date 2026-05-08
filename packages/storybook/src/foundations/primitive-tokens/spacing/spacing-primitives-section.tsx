import { TokenSection } from "../../shared/token-section";
import { PrimitiveList } from "../shared/primitive-list";
import sharedStyles from "../shared/reference-shared.module.css";
import type { PrimitiveToken } from "../shared/primitive-types";
import sectionStyles from "./spacing-primitives-section.module.css";

const TOKENS: readonly PrimitiveToken[] = [
  { name: "--space-0-5", value: "0.25rem", role: "Micro spacing" },
  { name: "--space-1", value: "0.5rem", role: "Tight spacing" },
  { name: "--space-2", value: "1rem", role: "Default spacing unit" },
  { name: "--space-3", value: "1.5rem", role: "Comfort spacing" },
  { name: "--space-4", value: "2rem", role: "Section spacing" },
  { name: "--space-10", value: "5rem", role: "Large vertical rhythm" },
];

export function SpacingPrimitives() {
  return (
    <TokenSection
      title="Spacing Primitives"
      description="Raw spacing scale used by semantic spacing, gap, and column tokens."
    >
      <PrimitiveList tokens={TOKENS} />
      <div className={sharedStyles.demoGroup}>
        <h3 className={sharedStyles.demoTitle}>Spacing scale demo</h3>
        <ul className={sectionStyles.spacingBarList}>
          {TOKENS.map((token) => (
            <li key={token.name} className={sectionStyles.spacingBarItem}>
              <code className={sharedStyles.swatchLabel}>{token.name}</code>
              <span className={sectionStyles.spacingBarTrack}>
                <span
                  className={sectionStyles.spacingBarFill}
                  style={{ width: `var(${token.name})` }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </TokenSection>
  );
}
