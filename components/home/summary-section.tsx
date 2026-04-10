import styles from "@/app/page.module.css";

type SummarySectionProps = {
  summaryHighlights: readonly string[];
  techStack: readonly string[];
};

export function SummarySection({ summaryHighlights, techStack }: SummarySectionProps) {
  return (
    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading" className={styles.sectionTitle}>
        Professional summary
      </h2>
      <ul className={styles.summaryList}>
        {summaryHighlights.map((item) => (
          <li key={item} className={styles.summaryCard}>
            {item}
          </li>
        ))}
      </ul>
      <ul className={styles.techList}>
        {techStack.map((item) => (
          <li key={item} className={styles.techItem}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
