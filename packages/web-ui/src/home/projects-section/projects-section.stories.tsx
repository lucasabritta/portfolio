import type { Meta, StoryObj } from "@storybook/react";

import {
  narrowMobileStory,
  projectsSectionArgs,
  projectsSectionEmptyArgs,
  projectsSectionLongContentArgs,
  projectsSectionManyItemsArgs,
} from "@ui/fixtures/cv-story-args";
import { ProjectsSection } from "./projects-section";
import {
  projectsSectionDefaultPlay,
  projectsSectionEmptyPlay,
  projectsSectionLongContentPlay,
  projectsSectionManyItemsPlay,
  projectsSectionNarrowViewportPlay,
} from "./projects-section.stories.test";

const meta = {
  title: "UI/Sections/ProjectsSection",
  component: ProjectsSection,
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: projectsSectionArgs(),
  play: projectsSectionDefaultPlay,
};

export const Empty: Story = {
  args: projectsSectionEmptyArgs(),
  play: projectsSectionEmptyPlay,
};

export const LongContent: Story = {
  args: projectsSectionLongContentArgs(),
  play: projectsSectionLongContentPlay,
};

export const ManyItems: Story = {
  args: projectsSectionManyItemsArgs(),
  play: projectsSectionManyItemsPlay,
};

export const NarrowViewport: Story = {
  args: projectsSectionArgs(),
  ...narrowMobileStory,
  play: projectsSectionNarrowViewportPlay,
};
