import type { Meta, StoryObj } from "@storybook/react";

import { homePageArgs, narrowMobileStory } from "@ui/fixtures/cv-story-args";
import {
  condensedCvPreviewFromHomePageProps,
  featuredWorkPreviewFromHomePageProps,
  homeLeadHeroFromHomePageProps,
  SYNTH_BUILD_TEASER,
  SYNTH_CREDIBILITY_ITEMS,
} from "@ui/fixtures/home-marketing-story";
import { BuildStorybookTeaser } from "@ui/home-marketing/build-storybook-teaser";
import { CondensedCvPreview } from "@ui/home-marketing/condensed-cv-preview";
import { CredibilityStrip } from "@ui/home-marketing/credibility-strip";
import { FeaturedWorkPreview } from "@ui/home-marketing/featured-work-preview";
import { HomeLeadHero } from "@ui/home-marketing/home-lead-hero";
import { CertificationsSection } from "@ui/home/certifications-section/certifications-section";
import { ContactSection } from "@ui/home/contact-section/contact-section";
import { EducationSection } from "@ui/home/education-section/education-section";
import { HomePageShell } from "@ui/home/home-page-shell";
import type { HomePageProps } from "@ui/home/presentation-types";
import { SkipToMain } from "@ui/site-chrome/skip-to-main";
import { ProjectsSection } from "@ui/home/projects-section/projects-section";
import { SummarySection } from "@ui/home/summary-section/summary-section";
import { WorkHistorySection } from "@ui/home/work-history-section/work-history-section";

import { homePageDefaultPlay } from "./home-page.stories.test";

function HomePageStory(props: HomePageProps) {
  const homeLead = homeLeadHeroFromHomePageProps(props);
  const featured = featuredWorkPreviewFromHomePageProps("Featured work", props.personalProjects);
  const condensed = condensedCvPreviewFromHomePageProps(props);

  return (
    <>
      <SkipToMain />
      <HomePageShell hero={<HomeLeadHero {...homeLead} />}>
        <CredibilityStrip id="how-i-work" items={SYNTH_CREDIBILITY_ITEMS} />
        <FeaturedWorkPreview {...featured} />
        <BuildStorybookTeaser {...SYNTH_BUILD_TEASER} />
        <CondensedCvPreview {...condensed} />
        <div id="resume">
          <SummarySection summaryHighlights={props.summaryHighlights} techStack={props.techStack} />
          <WorkHistorySection workHistory={props.workHistory} />
          <EducationSection education={props.education} />
          <CertificationsSection certifications={props.certifications} />
          <ProjectsSection projects={props.personalProjects} />
          <ContactSection
            location={props.location}
            phone={props.phone}
            phoneHref={props.phoneHref}
            email={props.email}
            linkedin={props.linkedin}
          />
        </div>
      </HomePageShell>
    </>
  );
}

const meta = {
  title: "Pages/Home",
  component: HomePageStory,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof HomePageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: homePageArgs(),
  play: homePageDefaultPlay,
};

export const NarrowViewport: Story = {
  args: homePageArgs(),
  ...narrowMobileStory,
  play: homePageDefaultPlay,
};
