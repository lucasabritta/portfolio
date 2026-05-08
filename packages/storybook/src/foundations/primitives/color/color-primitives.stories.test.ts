import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const colorPrimitivesPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Color Primitives" })).toBeVisible();
  expect(canvas.getByText("--color-neutral-0")).toBeVisible();
  expect(canvas.getByText("--color-blue-600")).toBeVisible();
};
