import { Card, Chip, SectionHeading } from "../../primitives";

import styles from "./summary-section.module.css";

export type SummarySectionProps = {
  summaryHighlights: readonly string[];
  techStack: readonly string[];
};

export function SummarySection({ summaryHighlights, techStack }: SummarySectionProps) {
  return (
    <section aria-labelledby="summary-heading">
      <SectionHeading id="summary-heading">Professional summary</SectionHeading>
      {summaryHighlights.length === 0 ? (
        <p className={styles.emptyState} role="status">
          No summary highlights listed.
        </p>
      ) : (
        <ul className={styles.summaryList}>
          {summaryHighlights.map((item, index) => (
            <Card key={`${index}-${item}`} as="li" className={styles.summaryItem} radius="md" padding="compact">
              {item}
            </Card>
          ))}
        </ul>
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
