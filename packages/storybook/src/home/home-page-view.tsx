import { PortfolioHero } from "../hero";
import { CertificationsSection } from "./certifications-section/certifications-section";
import { ContactSection } from "./contact-section/contact-section";
import { EducationSection } from "./education-section/education-section";
import type { HomePageViewProps } from "./presentation-types";
import { ProjectsSection } from "./projects-section/projects-section";
import styles from "./page-shell/page-shell.module.css";
import { SummarySection } from "./summary-section/summary-section";
import { WorkHistorySection } from "./work-history-section/work-history-section";

export function HomePageView(props: HomePageViewProps) {
  const {
    downloadHref,
    name,
    role,
    summary,
    location,
    phone,
    phoneHref,
    email,
    linkedin,
    contactLinks,
    summaryHighlights,
    techStack,
    workHistory,
    education,
    certifications,
    personalProjects,
  } = props;

  return (
    <div className={styles.pageRoot}>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <div className={styles.container}>
        <PortfolioHero
          name={name}
          role={role}
          summary={summary}
          location={location}
          phone={phone}
          phoneHref={phoneHref}
          email={email}
          links={contactLinks}
          downloadHref={downloadHref}
        />

        <main id="main" className={styles.main}>
          <SummarySection summaryHighlights={summaryHighlights} techStack={techStack} />
          <WorkHistorySection workHistory={workHistory} />
          <EducationSection education={education} />
          <CertificationsSection certifications={certifications} />
          <ProjectsSection projects={personalProjects} />
          <ContactSection
            location={location}
            phone={phone}
            phoneHref={phoneHref}
            email={email}
            linkedin={linkedin}
          />
        </main>

        <footer className={styles.footer}>
          <p>
            {name} - {role}
          </p>
        </footer>
      </div>
    </div>
  );
}
