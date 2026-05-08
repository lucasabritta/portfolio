import type { Meta, StoryObj } from "@storybook/react";

import { homePageShellPlay } from "./home-page-shell.stories.test";
import { HomePageShell } from "./home-page-shell";

const meta = {
  title: "Patterns/Sections/HomePageShell",
  component: HomePageShell,
  tags: ["autodocs"],
} satisfies Meta<typeof HomePageShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hero: (
      <section aria-label="Hero">
        <h1>Hero section</h1>
        <p>Intro copy for the homepage shell hero slot.</p>
      </section>
    ),
    children: (
      <>
        <section>
          <h2>Featured work</h2>
          <p>Feature section content.</p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Contact section content.</p>
        </section>
      </>
    ),
  },
  play: homePageShellPlay,
};
