import { ActionButton, ActionLink, Card, HeroName, HeroRole } from "../primitives";

import type { HomeLeadHeroProps } from "./home-marketing-types";
import styles from "./home-lead-hero.module.css";

export function HomeLeadHero({
  name,
  roleEyebrow,
  positioningLead,
  proofPoints,
  contactHint,
  contactHintLabel,
  contactHintHref,
  projectsHref,
  githubHref,
  headshotSrc,
  headshotAvifSrcSet,
  headshotWebpSrcSet,
  headshotSizes,
  headshotAlt,
}: HomeLeadHeroProps) {
  return (
    <header className={styles.shell}>
      <div className={styles.leadCol}>
        {headshotSrc ? (
          <picture>
            {headshotAvifSrcSet ? (
              <source srcSet={headshotAvifSrcSet} sizes={headshotSizes} type="image/avif" />
            ) : null}
            {headshotWebpSrcSet ? (
              <source srcSet={headshotWebpSrcSet} sizes={headshotSizes} type="image/webp" />
            ) : null}
            <img
              src={headshotSrc}
              alt={headshotAlt ?? `Portrait of ${name}`}
              className={styles.headshot}
              loading="eager"
              decoding="async"
              width="96"
              height="96"
            />
          </picture>
        ) : null}
        <HeroRole>{roleEyebrow}</HeroRole>
        <HeroName>{name}</HeroName>
        <p className={styles.positioning}>{positioningLead}</p>
        {contactHint ? (
          <p className={styles.contactHint}>
            {contactHint}
            {contactHintHref && contactHintLabel ? (
              <ActionLink variant="inlineAccent" href={contactHintHref}>
                {contactHintLabel}
              </ActionLink>
            ) : null}
          </p>
        ) : null}
        <div className={styles.ctaRow}>
          <ActionButton variant="primary" href={projectsHref}>
            View Projects
          </ActionButton>
          <ActionButton
            variant="secondary"
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub profile
            <span className={styles.visuallyHidden}> (opens in a new tab)</span>
          </ActionButton>
        </div>
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
