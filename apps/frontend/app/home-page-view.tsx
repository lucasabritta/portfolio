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

import { preserveInternalHref } from "@/lib/analytics/query-params";
import type { HomePageModel } from "@/lib/site/home-page-model";

function withPreservedHomeMarketing(model: HomePageModel): HomePageModel {
  const { marketing, resume } = model;
  return {
    resume,
    marketing: {
      ...marketing,
      homeLeadHero: {
        ...marketing.homeLeadHero,
        projectsHref: preserveInternalHref(marketing.homeLeadHero.projectsHref),
      },
      featuredWork: {
        ...marketing.featuredWork,
        flagship: {
          ...marketing.featuredWork.flagship,
          href: preserveInternalHref(marketing.featuredWork.flagship.href),
        },
        supporting: [
          {
            ...marketing.featuredWork.supporting[0],
            href: preserveInternalHref(marketing.featuredWork.supporting[0].href),
          },
          {
            ...marketing.featuredWork.supporting[1],
            href: preserveInternalHref(marketing.featuredWork.supporting[1].href),
          },
        ],
      },
      buildTeaser: {
        ...marketing.buildTeaser,
        buildHref: preserveInternalHref(marketing.buildTeaser.buildHref),
        storybookHref: preserveInternalHref(marketing.buildTeaser.storybookHref),
      },
    },
  };
}

export function HomePageView({ model }: { model: HomePageModel }): ReactNode {
  const { marketing, resume } = withPreservedHomeMarketing(model);

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
