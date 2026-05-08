import type { Meta, StoryObj } from "@storybook/react";

import { BrandIcon } from "./brand-icon";
import { brandIconGithubPlay, brandIconLinkedinPlay, brandIconMediumPlay } from "./brand-icon.stories.test";

const meta = {
  title: "Components/Icons/BrandIcon",
  component: BrandIcon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["github", "linkedin", "medium"],
    },
  },
  args: {
    name: "github",
  },
} satisfies Meta<typeof BrandIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GitHubIcon: Story = {
  name: "GitHub",
  args: { name: "github" },
  play: brandIconGithubPlay,
};

export const LinkedInIcon: Story = {
  name: "LinkedIn",
  args: { name: "linkedin" },
  play: brandIconLinkedinPlay,
};

export const MediumIcon: Story = {
  name: "Medium",
  args: { name: "medium" },
  play: brandIconMediumPlay,
};
