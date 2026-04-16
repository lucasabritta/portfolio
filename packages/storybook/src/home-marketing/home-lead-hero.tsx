import { ActionLink, Card, HeroName, HeroRole } from "../primitives";

import type { HomeLeadHeroProps } from "./home-marketing-types";
import styles from "./home-lead-hero.module.css";

export function HomeLeadHero({
  name,
  roleEyebrow,
  positioningLead,
  proofPoints,
  contactHint,
  downloadHref,
  projectsHref,
  storybookHref,
}: HomeLeadHeroProps) {
  return (
    <header className={styles.shell}>
      <div className={styles.leadCol}>
        <HeroRole>{roleEyebrow}</HeroRole>
        <HeroName>{name}</HeroName>
        <p className={styles.positioning}>{positioningLead}</p>
        {contactHint ? <p className={styles.contactHint}>{contactHint}</p> : null}
        <div className={styles.ctaRow}>
          <ActionLink variant="primary" href={downloadHref}>
            Download CV
          </ActionLink>
          <ActionLink variant="secondary" href={projectsHref}>
            View Projects
          </ActionLink>
        </div>
        <ActionLink variant="accentUnderline" href={storybookHref} className={styles.storybookLink}>
          Open Storybook
        </ActionLink>
      </div>
      <Card as="article" elevated radius="md" padding="comfortable" className={styles.proofCard}>
        <p id="home-lead-proof-points-label" className={styles.proofTitle}>
          Proof points
        </p>
        <ul aria-labelledby="home-lead-proof-points-label">
          {proofPoints.map((line, index) => (
            <li key={`proof-${index}`}>{line}</li>
          ))}
        </ul>
      </Card>
    </header>
  );
}
