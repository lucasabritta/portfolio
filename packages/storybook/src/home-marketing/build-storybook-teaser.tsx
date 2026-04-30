import { ActionLink, SectionHeading } from "../primitives";

import type { BuildStorybookTeaserProps } from "./home-marketing-types";
import styles from "./build-storybook-teaser.module.css";

export function BuildStorybookTeaser({
  id = "build-teaser",
  heading,
  lead,
  buildHref,
  storybookHref,
}: BuildStorybookTeaserProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className={styles.section} id={id}>
      <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
      <p className={styles.lead}>{lead}</p>
      <div className={styles.row}>
        <ActionLink variant="primary" href={buildHref}>
          Site architecture
        </ActionLink>
        <ActionLink
          variant="secondary"
          href={storybookHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Storybook
          <span className={styles.visuallyHidden}> (opens in a new tab)</span>
        </ActionLink>
      </div>
    </section>
  );
}
