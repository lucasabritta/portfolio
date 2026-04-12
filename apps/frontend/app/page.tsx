import { buildPhoneHref, resumeData } from "@portfolio/resume-content";
import { HomePageView } from "@portfolio/storybook";

export default function Home() {
  return (
    <HomePageView
      downloadHref="/api/cv"
      name={resumeData.name}
      role={resumeData.role}
      summary={resumeData.summary}
      location={resumeData.location}
      phone={resumeData.phone}
      phoneHref={buildPhoneHref(resumeData.phone)}
      email={resumeData.email}
      linkedin={resumeData.linkedin}
      contactLinks={resumeData.contactLinks}
      summaryHighlights={resumeData.summaryHighlights}
      techStack={resumeData.techStack}
      workHistory={resumeData.workHistory}
      education={resumeData.education}
      certifications={resumeData.certifications}
      personalProjects={resumeData.personalProjects}
    />
  );
}
