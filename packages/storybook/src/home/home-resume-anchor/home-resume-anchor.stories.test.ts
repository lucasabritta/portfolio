import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const homeResumeAnchorPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heading = canvas.getByRole("heading", { level: 2, name: /summary/i });
  expect(heading).toBeInTheDocument();
  expect(canvas.getByText(/work history sample/i)).toBeInTheDocument();
};
