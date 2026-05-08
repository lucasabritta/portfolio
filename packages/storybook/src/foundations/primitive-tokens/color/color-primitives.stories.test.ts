import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const colorPrimitivesPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Color Primitives" })).toBeVisible();
  expect(canvas.getByText("White/inverse text source")).toBeVisible();
  expect(canvas.getByText("Primary accent primitive")).toBeVisible();
  expect(canvas.getByText("Visual swatches")).toBeVisible();
  expect(canvas.getByText("Project secondary text")).toBeVisible();
};
