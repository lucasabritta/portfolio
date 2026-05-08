import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const homePageDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const skip = canvas.getByRole("link", { name: /skip to content/i });
  skip.focus();
  expect(skip).toHaveFocus();
};

export const homePageNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const skip = canvas.getByRole("link", { name: /skip to content/i });
  skip.focus();
  expect(skip).toHaveFocus();

  const main = canvas.getByRole("main");
  const mainBounds = main.getBoundingClientRect();
  const canvasBounds = canvasElement.getBoundingClientRect();
  expect(mainBounds.width).toBeLessThanOrEqual(canvasBounds.width + 1);
  expect(canvas.getByRole("heading", { name: /featured work/i })).toBeVisible();
};
