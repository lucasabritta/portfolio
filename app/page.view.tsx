import { cvData } from "@/lib/cv-data";
import { buildPhoneHref, buildWorkEntryKey } from "@/app/page-data";
import styles from "@/app/page.module.css";
import { PortfolioHero } from "@/components/portfolio-hero";

export function HomePageView() {
  return (
    <div className={styles.pageRoot}>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <div className={styles.container}>
        <PortfolioHero
          name={cvData.name}
          role={cvData.role}
          summary={cvData.summary}
          location={cvData.location}
          phone={cvData.phone}
          email={cvData.email}
          links={cvData.contactLinks}
          downloadHref="/api/cv"
        />

        <main id="main" className={styles.main}>
          <section aria-labelledby="summary-heading">
            <h2 id="summary-heading" className={styles.sectionTitle}>
              Professional summary
            </h2>
            <ul className={styles.summaryList}>
              {cvData.summaryHighlights.map((item) => (
                <li key={item} className={styles.summaryCard}>
                  {item}
                </li>
              ))}
            </ul>
            <div className={styles.techList}>
              {cvData.techStack.map((item) => (
                <span key={item} className={styles.techItem}>
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section aria-labelledby="experience-heading">
            <h2 id="experience-heading" className={styles.sectionTitle}>
              Work history
            </h2>
            <div className={styles.workList}>
              {cvData.workHistory.map((entry) => (
                <article key={buildWorkEntryKey(entry)} className={styles.workCard}>
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

          <section aria-labelledby="education-heading">
            <h2 id="education-heading" className={styles.sectionTitle}>
              Education
            </h2>
            <div className={styles.educationList}>
              {cvData.education.map((entry) => (
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

          <section aria-labelledby="certifications-heading">
            <h2 id="certifications-heading" className={styles.sectionTitle}>
              Certifications
            </h2>
            <ul className={styles.certificationList}>
              {cvData.certifications.map((certification) => (
                <li key={certification}>
                  <article className={styles.certificationCard}>
                    <h3 className={styles.certificationTitle}>{certification}</h3>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="projects-heading">
            <h2 id="projects-heading" className={styles.sectionTitle}>
              Personal projects
            </h2>
            <div className={styles.projectList}>
              {cvData.personalProjects.map((project) => (
                <article key={project.title} className={styles.projectCard}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <a
                    href={project.href}
                    className={styles.projectLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View project
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className={styles.sectionTitle}>
              Contact
            </h2>
            <div className={styles.contactCard}>
              <p className={styles.contactLocation}>Based in {cvData.location}</p>
              <div className={styles.contactLinks}>
                <a className={styles.contactLink} href={buildPhoneHref(cvData.phone)}>
                  {cvData.phone}
                </a>
                <a className={styles.contactLink} href={`mailto:${cvData.email}`}>
                  {cvData.email}
                </a>
                <a
                  className={styles.contactLink}
                  href={cvData.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {cvData.linkedin}
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>
            {cvData.name} - {cvData.role}
          </p>
        </footer>
      </div>
    </div>
  );
}
