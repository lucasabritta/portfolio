import type { Meta, StoryObj } from "@storybook/react";

import { SiteShell } from "./site-shell";
import { SkipToMain } from "./skip-to-main";
import { siteShellPlay } from "./site-shell.stories.test";

const meta = {
  title: "UI/SiteChrome/SiteShell",
  component: SiteShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SiteShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    skipLink: <SkipToMain />,
    header: (
      <header style={{ padding: "1rem", background: "#0f172a", color: "#fff" }}>
        Header slot
      </header>
    ),
    children: (
      <div style={{ padding: "2rem" }}>Page body content (flex-grown slot).</div>
    ),
    footer: (
      <footer style={{ padding: "1rem", background: "#f1f5f9" }}>Footer slot</footer>
    ),
  },
  play: siteShellPlay,
};
