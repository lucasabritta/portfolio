import type { Meta, StoryObj } from "@storybook/react";

import { cvData } from "@/lib/cv-data";
import { ContactSection } from "@/storybook/ui/home/contact-section";

const meta = {
  title: "UI/Home/ContactSection",
  component: ContactSection,
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    location: cvData.location,
    phone: cvData.phone,
    email: cvData.email,
    linkedin: cvData.linkedin,
  },
};
