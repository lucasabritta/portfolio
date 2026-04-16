import type { Metadata } from "next";

import { buildPhoneHref, resumeData } from "@portfolio/resume-content";
import {
  CertificationsSection,
  ContactSection,
  EducationSection,
  HomePageShell,
  PortfolioHero,
  ProjectsSection,
  SummarySection,
  WorkHistorySection,
} from "@portfolio/storybook";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Engineering Manager portfolio and CV for Lucas Abritta — startup growth, platform excellence, and software delivery leadership.",
};

export default function Home() {
  const phoneHref = buildPhoneHref(resumeData.phone);

  return (
    <HomePageShell
      hero={
        <PortfolioHero
          name={resumeData.name}
          role={resumeData.role}
          summary={resumeData.summary}
          location={resumeData.location}
          phone={resumeData.phone}
          phoneHref={phoneHref}
          email={resumeData.email}
          links={resumeData.contactLinks}
          downloadHref="/api/cv"
        />
      }
    >
      <div id="resume">
        <SummarySection summaryHighlights={resumeData.summaryHighlights} techStack={resumeData.techStack} />
      </div>
      <WorkHistorySection workHistory={resumeData.workHistory} />
      <EducationSection education={resumeData.education} />
      <CertificationsSection certifications={resumeData.certifications} />
      <ProjectsSection projects={resumeData.personalProjects} />
      <ContactSection
        location={resumeData.location}
        phone={resumeData.phone}
        phoneHref={phoneHref}
        email={resumeData.email}
        linkedin={resumeData.linkedin}
      />
    </HomePageShell>
  );
}
