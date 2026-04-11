import { Card, SectionHeading, Title } from "../../primitives";

import styles from "./certifications-section.module.css";

type CertificationsSectionProps = {
  certifications: readonly string[];
};

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section aria-labelledby="certifications-heading">
      <SectionHeading id="certifications-heading">Certifications</SectionHeading>
      {certifications.length === 0 ? (
        <p className={styles.emptyState} role="status">
          No certifications listed.
        </p>
      ) : (
        <ul className={styles.certificationList}>
          {certifications.map((certification, index) => (
            <li key={`${index}-${certification}`}>
              <Card as="article" radius="md" padding="compact">
                <Title level={3} size="sm">
                  {certification}
                </Title>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
