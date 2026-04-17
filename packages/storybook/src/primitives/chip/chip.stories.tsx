import type { Meta, StoryObj } from "@storybook/react";

import { narrowMobileStory } from "@ui/fixtures/cv-story-args";

import { Chip } from "./chip";
import { chipDefaultPlay, chipManyPlay, chipNarrowViewportPlay } from "./chip.stories.test";

const meta = {
  title: "Foundations/Surfaces/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    children: "TypeScript",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: chipDefaultPlay,
};

export const Many: Story = {
  render: (args) => (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {["React", "Next.js", "TypeScript", "Node.js"].map((label) => (
        <li key={label}>
          <Chip {...args}>{label}</Chip>
        </li>
      ))}
    </ul>
  ),
  play: chipManyPlay,
};

export const NarrowViewport: Story = {
  ...narrowMobileStory,
  render: () => (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {["React", "Next.js", "TypeScript", "Node.js"].map((label) => (
        <li key={label}>
          <Chip>{label}</Chip>
        </li>
      ))}
    </ul>
  ),
  play: chipNarrowViewportPlay,
};
