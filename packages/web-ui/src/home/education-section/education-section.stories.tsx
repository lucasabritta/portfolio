import type { Meta, StoryObj } from "@storybook/react";

import {
  narrowMobileStory,
  educationSectionArgs,
  educationSectionEmptyArgs,
  educationSectionLongContentArgs,
  educationSectionManyItemsArgs,
} from "@ui/fixtures/cv-story-args";
import { EducationSection } from "./education-section";

const meta = {
  title: "UI/Home/EducationSection",
  component: EducationSection,
  tags: ["autodocs"],
} satisfies Meta<typeof EducationSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: educationSectionArgs(),
};

export const Empty: Story = {
  args: educationSectionEmptyArgs(),
};

export const LongContent: Story = {
  args: educationSectionLongContentArgs(),
};

export const ManyItems: Story = {
  args: educationSectionManyItemsArgs(),
};

export const NarrowViewport: Story = {
  args: educationSectionArgs(),
  ...narrowMobileStory,
};
