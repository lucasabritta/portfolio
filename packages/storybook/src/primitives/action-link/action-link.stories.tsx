import type { Meta, StoryObj } from "@storybook/react";

import { ActionLink } from "./action-link";
import {
  actionLinkAccentUnderlinePlay,
  actionLinkInlineAccentPlay,
  actionLinkInlineNeutralPlay,
  actionLinkPrimaryPlay,
  actionLinkSecondaryPlay,
} from "./action-link.stories.test";

const demoHref = "https://example.com";

const meta = {
  title: "Foundations/Buttons/ActionLink",
  component: ActionLink,
  tags: ["autodocs"],
  args: {
    href: demoHref,
    children: "Link",
  },
} satisfies Meta<typeof ActionLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Download CV",
  },
  play: actionLinkPrimaryPlay,
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "GitHub",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  play: actionLinkSecondaryPlay,
};

export const InlineNeutral: Story = {
  args: {
    variant: "inlineNeutral",
    children: "Phone number",
  },
  decorators: [
    (Story) => (
      <div style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
        <Story />
      </div>
    ),
  ],
  play: actionLinkInlineNeutralPlay,
};

export const InlineAccent: Story = {
  args: {
    variant: "inlineAccent",
    children: "Email",
  },
  decorators: [
    (Story) => (
      <div style={{ color: "var(--foreground)", fontSize: "0.875rem" }}>
        <Story />
      </div>
    ),
  ],
  play: actionLinkInlineAccentPlay,
};

export const AccentUnderline: Story = {
  args: {
    variant: "accentUnderline",
    children: "View project",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  play: actionLinkAccentUnderlinePlay,
};
