import { Chip, SectionHeading } from "../../primitives";

import styles from "./summary-section.module.css";

export type SummarySectionProps = {
  summary: string;
  techStack: readonly string[];
};

export function SummarySection({ summary, techStack }: SummarySectionProps) {
  return (
    <section aria-labelledby="summary-heading">
      <SectionHeading id="summary-heading">Professional summary</SectionHeading>
      {summary ? (
        <p className={styles.summaryText}>{summary}</p>
      ) : (
        <p className={styles.emptyState} role="status">
          No professional summary listed.
        </p>
      )}
      {techStack.length === 0 ? (
        <p className={styles.emptyStateTech} role="status">
          No technologies listed.
        </p>
      ) : (
        <ul className={styles.techList}>
          {techStack.map((item, index) => (
            <li key={`${index}-${item}`}>
              <Chip>{item}</Chip>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
