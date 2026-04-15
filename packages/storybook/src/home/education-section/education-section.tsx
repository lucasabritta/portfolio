import { Card, SectionHeading, Title } from "../../primitives";

import type { PresentationEducationEntry } from "../presentation-types";

import styles from "./education-section.module.css";

export type EducationSectionProps = {
  education: readonly PresentationEducationEntry[];
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section aria-labelledby="education-heading">
      <SectionHeading id="education-heading">Education</SectionHeading>
      {education.length === 0 ? (
        <p className={styles.emptyState} role="status">
          No education entries listed.
        </p>
      ) : (
        <div className={styles.educationList}>
          {education.map((entry, index) => (
            <Card
              key={`${index}-${entry.institution}-${entry.date}`}
              as="article"
              radius="md"
              padding="compact"
            >
              <div className={styles.educationHeader}>
                <div>
                  <Title level={3} size="md">
                    {entry.institution}
                  </Title>
                  <p className={styles.educationLocation}>{entry.location}</p>
                </div>
                <p className={styles.educationDate}>{entry.date}</p>
              </div>
              <p className={styles.educationDegree}>{entry.degree}</p>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
