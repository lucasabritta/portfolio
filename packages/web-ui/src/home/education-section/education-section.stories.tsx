import type { Meta, StoryObj } from "@storybook/react";

import {
  narrowMobileStory,
  educationSectionArgs,
  educationSectionEmptyArgs,
  educationSectionLongContentArgs,
  educationSectionManyItemsArgs,
} from "@ui/fixtures/cv-story-args";
import { EducationSection } from "./education-section";
import {
  educationSectionDefaultPlay,
  educationSectionEmptyPlay,
  educationSectionLongContentPlay,
  educationSectionManyItemsPlay,
  educationSectionNarrowViewportPlay,
} from "./education-section.stories.test";

const meta = {
  title: "UI/Sections/EducationSection",
  component: EducationSection,
  tags: ["autodocs"],
} satisfies Meta<typeof EducationSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: educationSectionArgs(),
  play: educationSectionDefaultPlay,
};

export const Empty: Story = {
  args: educationSectionEmptyArgs(),
  play: educationSectionEmptyPlay,
};

export const LongContent: Story = {
  args: educationSectionLongContentArgs(),
  play: educationSectionLongContentPlay,
};

export const ManyItems: Story = {
  args: educationSectionManyItemsArgs(),
  play: educationSectionManyItemsPlay,
};

export const NarrowViewport: Story = {
  args: educationSectionArgs(),
  ...narrowMobileStory,
  play: educationSectionNarrowViewportPlay,
};
