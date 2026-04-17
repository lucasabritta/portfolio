import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const buildPageDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heading = canvas.getByRole("heading", { level: 2, name: /how this site is built/i });
  expect(heading).toBeInTheDocument();
  const cta = canvas.getByRole("link", { name: /open storybook/i });
  cta.focus();
  expect(cta).toHaveFocus();
};
