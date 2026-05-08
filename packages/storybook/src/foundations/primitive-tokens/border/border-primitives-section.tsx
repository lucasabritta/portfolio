import { TokenSection } from "../../shared/token-section";
import { PrimitiveList } from "../shared/primitive-list";
import sharedStyles from "../shared/reference-shared.module.css";
import type { PrimitiveToken } from "../shared/primitive-types";
import sectionStyles from "./border-primitives-section.module.css";

const TOKENS: readonly PrimitiveToken[] = [
  { name: "--border-width-1", value: "1px", role: "Hairline border primitive" },
  { name: "--border-width-2", value: "2px", role: "Strong border primitive" },
  { name: "--border-width-3", value: "3px", role: "Accent border primitive" },
  { name: "--outline-offset-2", value: "2px", role: "Tight focus offset primitive" },
  {
    name: "--shadow-surface-sm-raw",
    value: "0 1px 3px rgba(...)",
    role: "Surface shadow primitive",
  },
];

export function BorderPrimitives() {
  return (
    <TokenSection
      title="Border Primitives"
      description="Primitive border widths, offsets, and shadows that feed semantic border and elevation tokens."
    >
      <PrimitiveList tokens={TOKENS} />
      <div className={sharedStyles.demoGroup}>
        <h3 className={sharedStyles.demoTitle}>Border width demo</h3>
        <div className={sectionStyles.borderSampleRow}>
          <div className={sectionStyles.borderSampleSm}>1px</div>
          <div className={sectionStyles.borderSampleMd}>2px</div>
          <div className={sectionStyles.borderSampleLg}>3px</div>
        </div>
        <h3 className={sharedStyles.demoTitle}>Outline offset demo</h3>
        <div className={sectionStyles.outlineSampleRow}>
          <button type="button" className={sectionStyles.outlineTight}>
            offset tight
          </button>
          <button type="button" className={sectionStyles.outlineDefault}>
            offset default
          </button>
        </div>
        <h3 className={sharedStyles.demoTitle}>Shadow demo</h3>
        <div className={sectionStyles.shadowSample}>Shadow surface sample</div>
      </div>
    </TokenSection>
  );
}
