import styles from "@/storybook/ui/portfolio-page.module.css";
import type { PersonalProject } from "@/lib/cv-data";

type ProjectsSectionProps = {
  projects: readonly PersonalProject[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading" className={styles.sectionTitle}>
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
