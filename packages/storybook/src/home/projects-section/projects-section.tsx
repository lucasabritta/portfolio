import { ActionLink, Card, SectionHeading, Title } from "../../primitives";

import type { PresentationPersonalProject } from "../presentation-types";

import styles from "./projects-section.module.css";

export type ProjectsSectionProps = {
  projects: readonly PresentationPersonalProject[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section aria-labelledby="projects-heading">
      <SectionHeading id="projects-heading">Personal projects</SectionHeading>
      {projects.length === 0 ? (
        <p className={styles.emptyState} role="status">
          No personal projects listed.
        </p>
      ) : (
        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <Card key={`${index}-${project.href}`} as="article" elevated radius="md" padding="compact">
              <Title level={3} size="md">
                {project.title}
              </Title>
              <p className={styles.projectDescription}>{project.description}</p>
              <ActionLink
                variant="accentUnderline"
                href={project.href}
                className={styles.projectLink}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={`View project: ${project.title}`}
              >
                View project
              </ActionLink>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
