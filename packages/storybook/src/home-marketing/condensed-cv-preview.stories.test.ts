import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const condensedCvPreviewDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Work history" })).toBeVisible();
  expect(canvas.getAllByRole("listitem").length).toBeGreaterThan(1);
};
