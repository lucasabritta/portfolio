import type { Meta, StoryObj } from "@storybook/react";

import { homePageArgs, narrowMobileStory } from "@ui/fixtures/cv-story-args";
import { PortfolioHero } from "@ui/hero";
import { CertificationsSection } from "@ui/home/certifications-section/certifications-section";
import { ContactSection } from "@ui/home/contact-section/contact-section";
import { EducationSection } from "@ui/home/education-section/education-section";
import { HomePageShell } from "@ui/home/home-page-shell";
import type { HomePageProps } from "@ui/home/presentation-types";
import { ProjectsSection } from "@ui/home/projects-section/projects-section";
import { SummarySection } from "@ui/home/summary-section/summary-section";
import { WorkHistorySection } from "@ui/home/work-history-section/work-history-section";

import { homePageDefaultPlay } from "./home-page.stories.test";

function HomePageStory(props: HomePageProps) {
  return (
    <HomePageShell
      name={props.name}
      role={props.role}
      hero={
        <PortfolioHero
          name={props.name}
          role={props.role}
          summary={props.summary}
          location={props.location}
          phone={props.phone}
          phoneHref={props.phoneHref}
          email={props.email}
          links={props.contactLinks}
          downloadHref={props.downloadHref}
        />
      }
    >
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
    </HomePageShell>
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
