import type { Meta, StoryObj } from "@storybook/react";

import { ActionButton } from "./button";
import {
  buttonPrimaryAsButtonPlay,
  buttonPrimaryPlay,
  buttonSecondaryAsButtonPlay,
  buttonSecondaryPlay,
} from "./button.stories.test";

const demoHref = "https://example.com";

const meta = {
  title: "Components/Buttons/ActionButton",
  component: ActionButton,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    href: demoHref,
    children: "Open project",
  },
  play: buttonPrimaryPlay,
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    href: demoHref,
    children: "GitHub",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  play: buttonSecondaryPlay,
};

export const PrimaryAsButton: Story = {
  args: {
    variant: "primary",
    children: "Submit",
  },
  play: buttonPrimaryAsButtonPlay,
};

export const SecondaryAsButton: Story = {
  args: {
    variant: "secondary",
    children: "Cancel",
  },
  play: buttonSecondaryAsButtonPlay,
};
