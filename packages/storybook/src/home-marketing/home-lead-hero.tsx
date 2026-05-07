import { ActionLink, HeroName, HeroRole } from "../primitives";

import type { HomeLeadHeroProps } from "./home-marketing-types";
import styles from "./home-lead-hero.module.css";

export function HomeLeadHero({
  name,
  roleEyebrow,
  positioningLead,
  contactHint,
  contactHintLabel,
  contactHintHref,
  projectsHref,
  storybookHref,
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
          <ActionLink variant="primary" href={projectsHref}>
            View Projects
          </ActionLink>
        </div>
        <ActionLink
          variant="accentUnderline"
          href={storybookHref}
          className={styles.storybookLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Storybook
          <span className={styles.visuallyHidden}> (opens in a new tab)</span>
        </ActionLink>
      </div>
    </header>
  );
}
