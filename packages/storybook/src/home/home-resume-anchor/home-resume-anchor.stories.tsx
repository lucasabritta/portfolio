import type { Meta, StoryObj } from "@storybook/react";

import { HomeResumeAnchor } from "./home-resume-anchor";
import { homeResumeAnchorPlay } from "./home-resume-anchor.stories.test";

const meta = {
  title: "UI/Sections/HomeResumeAnchor",
  component: HomeResumeAnchor,
  tags: ["autodocs"],
} satisfies Meta<typeof HomeResumeAnchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "resume",
    children: (
      <>
        <section>
          <h2>Summary</h2>
          <p>Short summary block representing a résumé section card.</p>
        </section>
        <section>
          <h2>Work history</h2>
          <p>Work history sample block — illustrates the 4rem gap between cards.</p>
        </section>
        <section>
          <h2>Education</h2>
          <p>Education sample block.</p>
        </section>
      </>
    ),
  },
  play: homeResumeAnchorPlay,
};
