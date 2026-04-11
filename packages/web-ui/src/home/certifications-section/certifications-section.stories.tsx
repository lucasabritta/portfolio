import type { Meta, StoryObj } from "@storybook/react";

import {
  certificationsSectionArgs,
  certificationsSectionEmptyArgs,
  certificationsSectionLongContentArgs,
  certificationsSectionManyItemsArgs,
  narrowMobileStory,
} from "@ui/fixtures/cv-story-args";
import { CertificationsSection } from "./certifications-section";

const meta = {
  title: "UI/Home/CertificationsSection",
  component: CertificationsSection,
  tags: ["autodocs"],
} satisfies Meta<typeof CertificationsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: certificationsSectionArgs(),
};

export const Empty: Story = {
  args: certificationsSectionEmptyArgs(),
};

export const LongContent: Story = {
  args: certificationsSectionLongContentArgs(),
};

export const ManyItems: Story = {
  args: certificationsSectionManyItemsArgs(),
};

export const NarrowViewport: Story = {
  args: certificationsSectionArgs(),
  ...narrowMobileStory,
};
