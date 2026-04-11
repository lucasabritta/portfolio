import type { Meta, StoryObj } from "@storybook/react";

import { cvData } from "@/lib/cv-data";
import { PortfolioHero } from "@/storybook/ui/hero";

const meta = {
  title: "UI/Hero/PortfolioHero",
  component: PortfolioHero,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PortfolioHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: cvData.name,
    role: cvData.role,
    summary: cvData.summary,
    location: cvData.location,
    phone: cvData.phone,
    email: cvData.email,
    links: cvData.contactLinks,
    downloadHref: "/api/cv",
  },
};
