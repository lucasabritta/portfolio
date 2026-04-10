import { buildHomepageWorkEntryKey } from "@/app/page-data";
import styles from "@/app/page.module.css";
import type { ExperienceEntry } from "@/lib/cv-data";

type WorkHistorySectionProps = {
  workHistory: readonly ExperienceEntry[];
};

export function WorkHistorySection({ workHistory }: WorkHistorySectionProps) {
  return (
    <section aria-labelledby="experience-heading">
      <h2 id="experience-heading" className={styles.sectionTitle}>
        Work history
      </h2>
      <div className={styles.workList}>
        {workHistory.map((entry) => (
          <article key={buildHomepageWorkEntryKey(entry)} className={styles.workCard}>
            <div className={styles.workHeader}>
              <div>
                <h3 className={styles.workTitle}>
                  {entry.company} / {entry.role}
                </h3>
                <p className={styles.workLocation}>{entry.location}</p>
              </div>
              <p className={styles.workPeriod}>{entry.period}</p>
            </div>
            <p className={styles.workSummary}>{entry.summary}</p>
            {entry.achievements.length > 0 ? (
              <ul className={styles.achievementList}>
                {entry.achievements.map((achievement) => (
                  <li key={achievement} className={styles.achievementItem}>
                    <span className={styles.achievementBullet} aria-hidden="true">
                      *
                    </span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
