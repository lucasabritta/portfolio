import type { Meta, StoryObj } from "@storybook/react";

import { SectionHeading } from "./section-heading";
import {
  sectionHeadingDefaultPlay,
  sectionHeadingLongLabelPlay,
} from "./section-heading.stories.test";

const meta = {
  title: "Foundations/Typography/SectionHeading",
  component: SectionHeading,
  tags: ["autodocs"],
  args: {
    id: "demo-heading",
    children: "Section label",
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: sectionHeadingDefaultPlay,
};

export const LongLabel: Story = {
  args: {
    id: "long-heading",
    children: "Professional experience and engagements",
  },
  play: sectionHeadingLongLabelPlay,
};
