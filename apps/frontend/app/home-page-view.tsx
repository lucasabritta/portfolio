"use client";

import type { ReactNode } from "react";

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

import { usePreservedHrefDecorator } from "@/lib/analytics/use-preserve-internal-href";
import type { HomePageModel } from "@/lib/site/home-page-model";

export function HomePageView({ model }: { model: HomePageModel }): ReactNode {
  const decorateHref = usePreservedHrefDecorator();
  const { marketing, resume } = model;
  const marketingWithParams = {
    ...marketing,
    homeLeadHero: {
      ...marketing.homeLeadHero,
      projectsHref: decorateHref(marketing.homeLeadHero.projectsHref),
    },
    featuredWork: {
      ...marketing.featuredWork,
      flagship: {
        ...marketing.featuredWork.flagship,
        href: decorateHref(marketing.featuredWork.flagship.href),
      },
      supporting: [
        {
          ...marketing.featuredWork.supporting[0],
          href: decorateHref(marketing.featuredWork.supporting[0].href),
        },
        {
          ...marketing.featuredWork.supporting[1],
          href: decorateHref(marketing.featuredWork.supporting[1].href),
        },
      ] as typeof marketing.featuredWork.supporting,
    },
    buildTeaser: {
      ...marketing.buildTeaser,
      buildHref: decorateHref(marketing.buildTeaser.buildHref),
      storybookHref: decorateHref(marketing.buildTeaser.storybookHref),
    },
  };

  return (
    <HomePageShell hero={<HomeLeadHero {...marketingWithParams.homeLeadHero} />}>
      <CredibilityStrip {...marketingWithParams.credibilityStrip} />
      <FeaturedWorkPreview {...marketingWithParams.featuredWork} />
      <BuildStorybookTeaser {...marketingWithParams.buildTeaser} />
      <CondensedCvPreview {...marketingWithParams.condensedCv} />
      <HomeResumeAnchor id={resume.anchorId}>
        <EducationSection education={resume.education} />
        <CertificationsSection certifications={resume.certifications} />
        <ProjectsSection projects={resume.projects} />
        <ContactSection {...resume.contact} />
      </HomeResumeAnchor>
    </HomePageShell>
  );
}
