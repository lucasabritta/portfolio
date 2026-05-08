import type { Meta, StoryObj } from "@storybook/react";

import { SiteShell } from "./site-shell";
import { SkipToMain } from "./skip-to-main";
import { siteShellPlay } from "./site-shell.stories.test";

const meta = {
  title: "Patterns/Site Chrome/SiteShell",
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
      <header
        style={{
          padding: "var(--space-element-md)",
          background: "var(--foreground)",
          color: "var(--background)",
        }}
      >
        Header slot
      </header>
    ),
    children: (
      <div style={{ padding: "var(--space-element-xl)" }}>Page body content (flex-grown slot).</div>
    ),
    footer: (
      <footer style={{ padding: "var(--space-element-md)", background: "var(--card)" }}>
        Footer slot
      </footer>
    ),
  },
  play: siteShellPlay,
};
