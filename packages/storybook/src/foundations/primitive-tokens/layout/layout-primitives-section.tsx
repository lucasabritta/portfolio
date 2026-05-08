import { TokenSection } from "../../shared/token-section";
import { PrimitiveList } from "../shared/primitive-list";
import sharedStyles from "../shared/reference-shared.module.css";
import type { PrimitiveToken } from "../shared/primitive-types";
import sectionStyles from "./layout-primitives-section.module.css";

const TOKENS: readonly PrimitiveToken[] = [
  { name: "--size-layout-container-max", value: "70rem", role: "Raw container width primitive" },
  { name: "--size-layout-content-max", value: "64rem", role: "Raw content width primitive" },
  { name: "--size-layout-scroll-offset", value: "5rem", role: "Raw anchor offset primitive" },
  { name: "--size-control-hit-sm", value: "2.25rem", role: "Raw compact hit target size" },
  { name: "--size-control-hit-md", value: "2.75rem", role: "Raw default hit target size" },
];

export function LayoutPrimitives() {
  return (
    <TokenSection
      title="Layout Primitives"
      description="Primitive size values that semantic layout tokens map into page and interaction roles."
    >
      <PrimitiveList tokens={TOKENS} />
      <div className={sharedStyles.demoGroup}>
        <h3 className={sharedStyles.demoTitle}>Layout width demo</h3>
        <div className={sectionStyles.layoutBars}>
          <div className={sectionStyles.layoutBarRow}>
            <code className={sharedStyles.swatchLabel}>--size-layout-container-max</code>
            <span className={sectionStyles.layoutBarContainer}>
              <span
                className={sectionStyles.layoutBar}
                style={{ width: "calc(var(--size-layout-container-max) / 8)" }}
              />
            </span>
          </div>
          <div className={sectionStyles.layoutBarRow}>
            <code className={sharedStyles.swatchLabel}>--size-layout-content-max</code>
            <span className={sectionStyles.layoutBarContainer}>
              <span className={sectionStyles.layoutBar} style={{ width: "calc(var(--size-layout-content-max) / 8)" }} />
            </span>
          </div>
        </div>
        <h3 className={sharedStyles.demoTitle}>Hit target demo</h3>
        <div className={sectionStyles.hitTargetRow}>
          <button type="button" className={sectionStyles.hitTargetSm}>
            sm
          </button>
          <button type="button" className={sectionStyles.hitTargetMd}>
            md
          </button>
        </div>
      </div>
    </TokenSection>
  );
}
