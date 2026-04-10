import { cvData } from "@/lib/cv-data";
import styles from "@/app/page.module.css";
import { CertificationsSection } from "@/components/home/certifications-section";
import { ContactSection } from "@/components/home/contact-section";
import { EducationSection } from "@/components/home/education-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { SummarySection } from "@/components/home/summary-section";
import { WorkHistorySection } from "@/components/home/work-history-section";
import { PortfolioHero } from "@/components/hero";

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
