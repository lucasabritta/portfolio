import type { Meta, StoryObj } from "@storybook/react";

import { Title } from "./title";
import {
  titleDefaultPlay,
  titleLargePlay,
  titleLongContentPlay,
  titleMediumPlay,
  titleSmallPlay,
} from "./title.stories.test";

const meta = {
  title: "Foundations/Typography/Title",
  component: Title,
  tags: ["autodocs"],
  args: {
    level: 3 as const,
    size: "md" as const,
    children: "Card title",
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: titleDefaultPlay,
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Certification name",
  },
  play: titleSmallPlay,
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Education or project title",
  },
  play: titleMediumPlay,
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Company / role",
  },
  play: titleLargePlay,
};

export const LongContent: Story = {
  args: {
    size: "md",
    children: "Very long institution name that should wrap across multiple lines in narrow layouts",
  },
  play: titleLongContentPlay,
};
