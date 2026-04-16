import { ActionLink, SectionHeading } from "../primitives";

import type { CondensedCvPreviewProps } from "./home-marketing-types";
import styles from "./condensed-cv-preview.module.css";

export function CondensedCvPreview({
  id = "cv-preview",
  heading,
  entries,
  resumeAnchorId,
  continueLabel,
}: CondensedCvPreviewProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className={styles.section} id={id}>
      <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
      <ul className={styles.list}>
        {entries.map((e) => (
          <li key={`${e.company}-${e.period}`} className={styles.row}>
            <p className={styles.company}>{e.company}</p>
            <p className={styles.meta}>
              {e.role} · {e.period}
            </p>
          </li>
        ))}
      </ul>
      <ActionLink variant="accentUnderline" href={`#${resumeAnchorId}`} className={styles.continue}>
        {continueLabel}
      </ActionLink>
    </section>
  );
}
