import { TokenSection } from "../../shared/token-section";
import { PrimitiveList } from "../shared/primitive-list";
import sharedStyles from "../shared/reference-shared.module.css";
import type { PrimitiveToken } from "../shared/primitive-types";
import sectionStyles from "./typography-primitives-section.module.css";

const TOKENS: readonly PrimitiveToken[] = [
  { name: "--font-size-sm", value: "0.875rem", role: "Small body text" },
  { name: "--font-size-lg", value: "1.125rem", role: "Large body text" },
  { name: "--font-weight-medium", value: "500", role: "Medium emphasis" },
  { name: "--font-weight-semibold", value: "600", role: "Strong emphasis" },
  { name: "--line-height-reading", value: "1.55", role: "Readable body line-height" },
  { name: "--tracking-wide-2xl", value: "0.08em", role: "Uppercase labels" },
];

export function TypographyPrimitives() {
  return (
    <TokenSection
      title="Typography Primitives"
      description="Primitive typography values for type scale, weights, line-heights, and tracking."
    >
      <PrimitiveList tokens={TOKENS} />
      <div className={sharedStyles.demoGroup}>
        <h3 className={sharedStyles.demoTitle}>Typography specimen demo</h3>
        <div className={sectionStyles.typographyDemo}>
          <p className={sectionStyles.typeSizeSm}>Size sample using --font-size-sm</p>
          <p className={sectionStyles.typeSizeLg}>Size sample using --font-size-lg</p>
          <p className={sectionStyles.typeWeightMedium}>Weight sample using --font-weight-medium</p>
          <p className={sectionStyles.typeWeightSemibold}>Weight sample using --font-weight-semibold</p>
          <p className={sectionStyles.typeTrackingWide}>TRACKING SAMPLE USING --tracking-wide-2xl</p>
          <p className={sectionStyles.typeReadingLineHeight}>
            Body line-height sample using --line-height-reading for readable, multi-line copy across
            broader cards.
          </p>
        </div>
      </div>
    </TokenSection>
  );
}
