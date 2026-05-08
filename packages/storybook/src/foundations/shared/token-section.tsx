import type { ReactNode } from "react";

import styles from "./token-section.module.css";

export type TokenSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function sectionTitleId(title: string): string {
  return `${title.toLowerCase().replaceAll(" ", "-")}-title`;
}

export function TokenSection({ title, description, children }: TokenSectionProps) {
  const titleId = sectionTitleId(title);

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.sectionIntro}>
        <h2 id={titleId} className={styles.sectionTitle}>
          {title}
        </h2>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
      {children}
    </section>
  );
}
