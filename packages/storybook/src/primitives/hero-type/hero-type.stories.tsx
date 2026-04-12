import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { HeroLead, HeroName, HeroRole, HeroTypeComposition } from "./hero-type";
import {
  heroTypeDefaultPlay,
  heroTypeLeadPlay,
  heroTypeLongContentPlay,
  heroTypeNamePlay,
  heroTypeRolePlay,
} from "./hero-type.stories.test";

const meta = {
  title: "Foundations/Typography/HeroType",
  component: HeroTypeComposition,
  subcomponents: { HeroRole, HeroName, HeroLead },
  tags: ["autodocs"],
} satisfies Meta<typeof HeroTypeComposition>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    role: "Staff software engineer",
    name: "Jordan Example",
    lead: "Building resilient web platforms with a focus on accessibility and performance.",
  },
  play: heroTypeDefaultPlay,
};

export const LongContent: Story = {
  args: {
    role: "Principal engineer — platform infrastructure and developer experience",
    name: "Alexandria Montgomery-Hughes",
    lead:
      "A longer professional summary that still respects the max width of the lead paragraph and demonstrates how the clamped display name and multi-line summary interact in realistic CV-style layouts.",
  },
  play: heroTypeLongContentPlay,
};

export const Role = {
  render: (args: ComponentProps<typeof HeroRole>) => (
    <HeroRole {...args}>Staff software engineer</HeroRole>
  ),
  play: heroTypeRolePlay,
} satisfies StoryObj<typeof HeroRole>;

export const Name = {
  render: (args: ComponentProps<typeof HeroName>) => (
    <HeroName {...args}>Jordan Example</HeroName>
  ),
  play: heroTypeNamePlay,
} satisfies StoryObj<typeof HeroName>;

export const Lead = {
  render: (args: ComponentProps<typeof HeroLead>) => (
    <HeroLead {...args}>
      Building resilient web platforms with a focus on accessibility and performance.
    </HeroLead>
  ),
  play: heroTypeLeadPlay,
} satisfies StoryObj<typeof HeroLead>;
