import type { Meta, StoryObj } from "@storybook/react";

import { narrowMobileStory } from "@ui/fixtures/cv-story-args";

import { Card } from "./card";
import {
  cardDefaultPlay,
  cardElevatedPlay,
  cardNarrowViewportPlay,
  cardRadiusLgPlay,
} from "./card.stories.test";

const meta = {
  title: "Foundations/Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    as: "div" as const,
    radius: "md" as const,
    padding: "compact" as const,
    elevated: false,
    children: "Card content",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: cardDefaultPlay,
};

export const Elevated: Story = {
  args: {
    elevated: true,
  },
  play: cardElevatedPlay,
};

export const RadiusLg: Story = {
  args: {
    radius: "lg",
    padding: "comfortable",
  },
  play: cardRadiusLgPlay,
};

export const NarrowViewport: Story = {
  args: {
    elevated: true,
    children: "Narrow viewport card",
  },
  ...narrowMobileStory,
  play: cardNarrowViewportPlay,
};
