import type { PersonalProject } from "@portfolio/cv";
import heading from "../shared/section-heading.module.css";
import styles from "./projects-section.module.css";

type ProjectsSectionProps = {
  projects: readonly PersonalProject[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading" className={heading.sectionTitle}>
        Personal projects
      </h2>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <article key={project.title} className={styles.projectCard}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
            <a
              href={project.href}
              className={styles.projectLink}
              rel="noopener noreferrer"
              target="_blank"
              aria-label={`View project: ${project.title}`}
            >
              View project
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
