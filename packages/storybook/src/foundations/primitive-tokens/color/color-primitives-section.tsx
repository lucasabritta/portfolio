import type { CSSProperties } from "react";

import { TokenSection } from "../../shared/token-section";
import { PrimitiveList } from "../shared/primitive-list";
import sharedStyles from "../shared/reference-shared.module.css";
import type { PrimitiveToken } from "../shared/primitive-types";
import sectionStyles from "./color-primitives-section.module.css";

const TOKENS: readonly PrimitiveToken[] = [
  { name: "--color-neutral-0", value: "#ffffff", role: "White/inverse text source" },
  { name: "--color-neutral-200", value: "#e5e5e5", role: "Neutral divider tone" },
  { name: "--color-neutral-950", value: "#0a0a0a", role: "Dark text/canvas tone" },
  { name: "--color-blue-600", value: "#2563eb", role: "Primary accent primitive" },
  { name: "--color-blue-700", value: "#1d4ed8", role: "Focus ring primitive" },
  { name: "--color-indigo-950", value: "#172554", role: "Project gradient start" },
  { name: "--color-slate-400", value: "#94a3b8", role: "Project secondary text" },
];

export function ColorPrimitives() {
  return (
    <TokenSection
      title="Color Primitives"
      description="Primitive color variables that feed semantic tokens and component styles."
    >
      <PrimitiveList tokens={TOKENS} />
      <div className={sharedStyles.demoGroup}>
        <h3 className={sharedStyles.demoTitle}>Visual swatches</h3>
        <ul className={sectionStyles.colorSwatchList}>
          {TOKENS.map((token) => (
            <li key={token.name} className={sectionStyles.colorSwatchItem}>
              <span
                className={sectionStyles.colorSwatch}
                style={{ "--primitive-swatch-color": `var(${token.name})` } as CSSProperties}
              />
              <code className={sharedStyles.swatchLabel}>{token.name}</code>
            </li>
          ))}
        </ul>
      </div>
    </TokenSection>
  );
}
