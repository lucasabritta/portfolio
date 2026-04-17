import type { Meta, StoryObj } from "@storybook/react";

import { SiteFooter } from "./site-footer";
import { siteFooterDefaultPlay } from "./site-footer.stories.test";

const links = [
  { label: "GitHub", href: "https://github.com/example", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/example", external: true },
  { label: "Component library (Storybook)", href: "/storybook" },
  { label: "How this site is built", href: "/build" },
  { label: "Download CV", href: "/api/cv" },
];

const meta = {
  title: "UI/SiteChrome/Footer",
  component: SiteFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    name: "Lucas Abritta",
    descriptor: "Engineering Manager",
    links,
    colophon: "Built with Next.js, Storybook, and Vercel.",
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: siteFooterDefaultPlay,
};
