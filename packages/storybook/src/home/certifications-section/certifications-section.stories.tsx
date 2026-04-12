import type { Meta, StoryObj } from "@storybook/react";

import {
  certificationsSectionArgs,
  certificationsSectionEmptyArgs,
  certificationsSectionLongContentArgs,
  certificationsSectionManyItemsArgs,
  narrowMobileStory,
} from "@ui/fixtures/cv-story-args";
import { CertificationsSection } from "./certifications-section";
import {
  certificationsSectionDefaultPlay,
  certificationsSectionEmptyPlay,
  certificationsSectionLongContentPlay,
  certificationsSectionManyItemsPlay,
  certificationsSectionNarrowViewportPlay,
} from "./certifications-section.stories.test";

const meta = {
  title: "UI/Sections/CertificationsSection",
  component: CertificationsSection,
  tags: ["autodocs"],
} satisfies Meta<typeof CertificationsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: certificationsSectionArgs(),
  play: certificationsSectionDefaultPlay,
};

export const Empty: Story = {
  args: certificationsSectionEmptyArgs(),
  play: certificationsSectionEmptyPlay,
};

export const LongContent: Story = {
  args: certificationsSectionLongContentArgs(),
  play: certificationsSectionLongContentPlay,
};

export const ManyItems: Story = {
  args: certificationsSectionManyItemsArgs(),
  play: certificationsSectionManyItemsPlay,
};

export const NarrowViewport: Story = {
  args: certificationsSectionArgs(),
  ...narrowMobileStory,
  play: certificationsSectionNarrowViewportPlay,
};
