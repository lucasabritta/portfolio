import heading from "./section-heading.module.css";
import styles from "./certifications-section.module.css";

type CertificationsSectionProps = {
  certifications: readonly string[];
};

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section aria-labelledby="certifications-heading">
      <h2 id="certifications-heading" className={heading.sectionTitle}>
        Certifications
      </h2>
      <ul className={styles.certificationList}>
        {certifications.map((certification) => (
          <li key={certification}>
            <article className={styles.certificationCard}>
              <h3 className={styles.certificationTitle}>{certification}</h3>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
