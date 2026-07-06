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
} from "@portfolio/storybook/home";

import { buildHomePageModel } from "@/lib/site/home-page-model";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio for Lucas Abritta — startup engineering, platform reliability, and hands-on delivery from seed through scale.",
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
        <EducationSection education={resume.education} />
        <CertificationsSection certifications={resume.certifications} />
        <ProjectsSection projects={resume.projects} />
        <ContactSection {...resume.contact} />
      </HomeResumeAnchor>
    </HomePageShell>
  );
}
