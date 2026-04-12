import type { Meta, StoryObj } from "@storybook/react";

import {
  contactSectionArgs,
  contactSectionEmptyArgs,
  contactSectionLongContentArgs,
  narrowMobileStory,
} from "@ui/fixtures/cv-story-args";
import { ContactSection } from "./contact-section";
import {
  contactSectionDefaultPlay,
  contactSectionEmptyPlay,
  contactSectionLongContentPlay,
  contactSectionNarrowViewportPlay,
} from "./contact-section.stories.test";

const meta = {
  title: "UI/Sections/ContactSection",
  component: ContactSection,
  tags: ["autodocs"],
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: contactSectionArgs(),
  play: contactSectionDefaultPlay,
};

export const Empty: Story = {
  args: contactSectionEmptyArgs(),
  play: contactSectionEmptyPlay,
};

export const LongContent: Story = {
  args: contactSectionLongContentArgs(),
  play: contactSectionLongContentPlay,
};

export const NarrowViewport: Story = {
  args: contactSectionArgs(),
  ...narrowMobileStory,
  play: contactSectionNarrowViewportPlay,
};
