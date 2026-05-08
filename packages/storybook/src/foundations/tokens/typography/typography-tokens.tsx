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
      <div className={styles.typeScale}>
        <h3 className={styles.groupTitle}>Type scale demo</h3>
        <p className={styles.scaleCaption}>caption · --text-size-caption</p>
        <p className={styles.scaleLabel}>label · --text-size-label</p>
        <p className={styles.scaleBody}>body · --text-size-body-md</p>
        <p className={styles.scaleTitle}>title · --text-size-title-md</p>
      </div>
      <div className={styles.typeScale}>
        <h3 className={styles.groupTitle}>Weight and tracking demo</h3>
        <p className={styles.weightMedium}>weight medium · --text-weight-medium</p>
        <p className={styles.weightSemibold}>weight semibold · --text-weight-semibold</p>
        <p className={styles.weightBold}>weight bold · --text-weight-bold</p>
        <p className={styles.trackingWide}>TRACKING WIDE · --text-tracking-wide-2xl</p>
      </div>
    </TokenSection>
  );
}
