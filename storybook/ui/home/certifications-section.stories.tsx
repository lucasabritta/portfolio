import type { Meta, StoryObj } from "@storybook/react";

import { cvData } from "@/lib/cv-data";
import { CertificationsSection } from "@/storybook/ui/home/certifications-section";

const meta = {
  title: "UI/Home/CertificationsSection",
  component: CertificationsSection,
} satisfies Meta<typeof CertificationsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    certifications: cvData.certifications,
  },
};
