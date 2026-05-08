import type { Meta, StoryObj } from "@storybook/react";

import { ActionLink } from "./link";
import { linkAccentUnderlinePlay, linkInlineAccentPlay, linkInlineNeutralPlay } from "./link.stories.test";

const demoHref = "https://example.com";

const meta = {
  title: "Components/Links/ActionLink",
  component: ActionLink,
  tags: ["autodocs"],
  args: {
    href: demoHref,
    children: "Link",
  },
} satisfies Meta<typeof ActionLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InlineNeutral: Story = {
  args: {
    variant: "inlineNeutral",
    children: "Phone number",
  },
  decorators: [
    (Story) => (
      <div style={{ color: "var(--muted)", fontSize: "var(--text-size-label)" }}>
        <Story />
      </div>
    ),
  ],
  play: linkInlineNeutralPlay,
};

export const InlineAccent: Story = {
  args: {
    variant: "inlineAccent",
    children: "Email",
  },
  decorators: [
    (Story) => (
      <div style={{ color: "var(--foreground)", fontSize: "var(--text-size-label)" }}>
        <Story />
      </div>
    ),
  ],
  play: linkInlineAccentPlay,
};

export const AccentUnderline: Story = {
  args: {
    variant: "accentUnderline",
    children: "View project",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  play: linkAccentUnderlinePlay,
};
