import type { Metadata } from "next";

import { buildPhoneHref, resumeData } from "@portfolio/resume-content";
import {
  BuildStorybookTeaser,
  CertificationsSection,
  CondensedCvPreview,
  ContactSection,
  CredibilityStrip,
  EducationSection,
  FeaturedWorkPreview,
  HomeLeadHero,
  HomePageShell,
  ProjectsSection,
  SummarySection,
  WorkHistorySection,
} from "@portfolio/storybook";

import { buildHomeMarketing, HOME_RESUME_ANCHOR_ID } from "@/lib/home-site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Engineering Manager portfolio and CV for Lucas Abritta — startup growth, platform excellence, and software delivery leadership.",
};

export default function Home() {
  const phoneHref = buildPhoneHref(resumeData.phone);
  const marketing = buildHomeMarketing(resumeData);

  return (
    <HomePageShell hero={<HomeLeadHero {...marketing.homeLeadHero} />}>
      <CredibilityStrip {...marketing.credibilityStrip} />
      <FeaturedWorkPreview {...marketing.featuredWork} />
      <BuildStorybookTeaser {...marketing.buildTeaser} />
      <CondensedCvPreview {...marketing.condensedCv} />
      <div
        id={HOME_RESUME_ANCHOR_ID}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          scrollMarginTop: "5rem",
        }}
      >
        <SummarySection summaryHighlights={resumeData.summaryHighlights} techStack={resumeData.techStack} />
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
      </div>
    </HomePageShell>
  );
}
