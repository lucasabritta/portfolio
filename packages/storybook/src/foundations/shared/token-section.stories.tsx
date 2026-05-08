import type { Meta, StoryObj } from "@storybook/react";

import { tokenSectionPlay } from "./token-section.stories.test";
import { TokenSection } from "./token-section";

const meta = {
  title: "Foundations/Shared/TokenSection",
  component: TokenSection,
  tags: ["autodocs"],
} satisfies Meta<typeof TokenSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Spacing primitives",
    description: "Raw spacing scale tokens for element spacing, gaps, and column spacing.",
    children: (
      <ul>
        <li>--space-1</li>
        <li>--space-2</li>
        <li>--space-3</li>
      </ul>
    ),
  },
  play: tokenSectionPlay,
};
