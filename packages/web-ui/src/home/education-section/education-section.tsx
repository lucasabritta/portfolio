import type { EducationEntry } from "@portfolio/cv";
import heading from "../shared/section-heading.module.css";
import styles from "./education-section.module.css";

type EducationSectionProps = {
  education: readonly EducationEntry[];
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section aria-labelledby="education-heading">
      <h2 id="education-heading" className={heading.sectionTitle}>
        Education
      </h2>
      <div className={styles.educationList}>
        {education.map((entry) => (
          <article key={entry.institution} className={styles.educationCard}>
            <div className={styles.educationHeader}>
              <div>
                <h3 className={styles.educationName}>{entry.institution}</h3>
                <p className={styles.educationLocation}>{entry.location}</p>
              </div>
              <p className={styles.educationDate}>{entry.date}</p>
            </div>
            <p className={styles.educationDegree}>{entry.degree}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
