import { cvData } from "@portfolio/cv";
import { PortfolioHero } from "../hero";
import { CertificationsSection } from "./certifications-section/certifications-section";
import { ContactSection } from "./contact-section/contact-section";
import { EducationSection } from "./education-section/education-section";
import { ProjectsSection } from "./projects-section/projects-section";
import styles from "./page-shell/page-shell.module.css";
import { SummarySection } from "./summary-section/summary-section";
import { WorkHistorySection } from "./work-history-section/work-history-section";

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
          <SummarySection summaryHighlights={cvData.summaryHighlights} techStack={cvData.techStack} />
          <WorkHistorySection workHistory={cvData.workHistory} />
          <EducationSection education={cvData.education} />
          <CertificationsSection certifications={cvData.certifications} />
          <ProjectsSection projects={cvData.personalProjects} />
          <ContactSection
            location={cvData.location}
            phone={cvData.phone}
            email={cvData.email}
            linkedin={cvData.linkedin}
          />
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
