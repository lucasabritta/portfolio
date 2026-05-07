import { ActionLink, HeroName, HeroRole } from "../primitives";

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
        <div className={styles.heroGrid}>
          <div className={styles.copyCol}>
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
              <ActionLink variant="primary" href={projectsHref}>
                View Projects
              </ActionLink>
              <ActionLink
                variant="secondary"
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub profile
                <span className={styles.visuallyHidden}> (opens in a new tab)</span>
              </ActionLink>
            </div>
          </div>
          <div className={styles.proofCard}>
            <p className={styles.proofTitle}>Proof points</p>
            <ul className={styles.proofList}>
              {proofPoints.map((point) => (
                <li key={point.title} className={styles.proofItem}>
                  <span className={styles.proofMetric}>{point.metric ?? point.title}</span>
                  <span className={styles.proofHeading}>{point.title}</span>
                  <span className={styles.proofBody}>{point.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
