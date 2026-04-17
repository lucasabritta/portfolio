import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { StatusPageView } from "./status-page-view";
import {
  statusPageDefaultPlay,
  statusPageErrorPlay,
  statusPageLoadingPlay,
} from "./status-page-view.stories.test";

const meta = {
  title: "UI/StatusPage/StatusPageView",
  component: StatusPageView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof StatusPageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
  args: {
    heading: "Page not found",
    body: "The page you are looking for does not exist or has been moved. Try the homepage or projects.",
    actions: [
      { kind: "link", label: "Back to home", href: "/" },
      { kind: "link", label: "View projects", href: "/projects" },
    ],
  },
  play: statusPageDefaultPlay,
};

export const Loading: Story = {
  args: {
    heading: "Loading\u2026",
    body: "Preparing this page.",
    live: "polite",
  },
  play: statusPageLoadingPlay,
};

export const Error: Story = {
  args: {
    heading: "Something went wrong",
    body: "An unexpected error interrupted this page. Try again, or return home.",
    actions: [
      { kind: "button", label: "Try again", onClick: fn() },
      { kind: "link", label: "Back to home", href: "/" },
    ],
  },
  play: statusPageErrorPlay,
};
