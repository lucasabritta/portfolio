import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { GlobalErrorView, globalErrorBodyStyle } from "./global-error-view";
import { globalErrorDefaultPlay, globalErrorHasRetryPlay } from "./global-error-view.stories.test";

const meta = {
  title: "UI/StatusPage/GlobalErrorView",
  component: GlobalErrorView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={globalErrorBodyStyle}>
        <Story />
      </div>
    ),
  ],
  args: {
    onReset: fn(),
  },
} satisfies Meta<typeof GlobalErrorView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: globalErrorDefaultPlay,
};

export const CustomCopy: Story = {
  args: {
    heading: "Something unexpected happened",
    body: "We hit an error before the page finished loading. Give it another try.",
    actionLabel: "Retry",
  },
  play: globalErrorHasRetryPlay,
};
