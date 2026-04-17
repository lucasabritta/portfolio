import { Card, SectionHeading, Title } from "../../primitives";
import { presentationWorkEntryKey } from "../work-entry-key";

import type { PresentationWorkEntry } from "../presentation-types";

import styles from "./work-history-section.module.css";

export type WorkHistorySectionProps = {
  workHistory: readonly PresentationWorkEntry[];
};

export function WorkHistorySection({ workHistory }: WorkHistorySectionProps) {
  return (
    <section aria-labelledby="experience-heading">
      <SectionHeading id="experience-heading">Work history</SectionHeading>
      {workHistory.length === 0 ? (
        <p className={styles.emptyState} role="status">
          No work history entries listed.
        </p>
      ) : (
        <div className={styles.workList}>
          {workHistory.map((entry, index) => (
            <Card
              key={`${index}-${presentationWorkEntryKey(entry)}`}
              as="article"
              elevated
              radius="lg"
              padding="comfortable"
            >
              <div className={styles.workHeader}>
                <div>
                  <Title level={3} size="lg">
                    {entry.company} / {entry.role}
                  </Title>
                  <p className={styles.workLocation}>{entry.location}</p>
                </div>
                <p className={styles.workPeriod}>{entry.period}</p>
              </div>
              <p className={styles.workSummary}>{entry.summary}</p>
              {entry.achievements.length > 0 ? (
                <ul className={styles.achievementList}>
                  {entry.achievements.map((achievement, achievementIndex) => (
                    <li
                      key={`${achievementIndex}-${achievement}`}
                      className={styles.achievementItem}
                    >
                      <span className={styles.achievementBullet} aria-hidden="true">
                        *
                      </span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
