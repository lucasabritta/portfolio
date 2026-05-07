import type { Metadata } from "next";

import { resumeData } from "@portfolio/resume-content";
import {
  BuildStorybookTeaser,
  CondensedCvPreview,
  CredibilityStrip,
  FeaturedWorkPreview,
  HomeLeadHero,
} from "@portfolio/storybook/home-marketing";
import {
  CertificationsSection,
  ContactSection,
  EducationSection,
  HomePageShell,
  HomeResumeAnchor,
  ProjectsSection,
  SummarySection,
} from "@portfolio/storybook/home";

import { buildHomePageModel } from "@/lib/site/home-page-model";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Engineering Manager portfolio and CV for Lucas Abritta — startup growth, platform excellence, and software delivery leadership.",
};

export default function Home() {
  const { marketing, resume } = buildHomePageModel(resumeData);

  return (
    <HomePageShell hero={<HomeLeadHero {...marketing.homeLeadHero} />}>
      <CredibilityStrip {...marketing.credibilityStrip} />
      <FeaturedWorkPreview {...marketing.featuredWork} />
      <BuildStorybookTeaser {...marketing.buildTeaser} />
      <CondensedCvPreview {...marketing.condensedCv} />
      <HomeResumeAnchor id={resume.anchorId}>
        <SummarySection {...resume.summary} />
        <EducationSection education={resume.education} />
        <CertificationsSection certifications={resume.certifications} />
        <ProjectsSection projects={resume.projects} />
        <ContactSection {...resume.contact} />
      </HomeResumeAnchor>
    </HomePageShell>
  );
}
