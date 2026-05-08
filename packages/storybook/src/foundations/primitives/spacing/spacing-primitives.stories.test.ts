import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const spacingPrimitivesPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Spacing Primitives" })).toBeVisible();
  expect(canvas.getByText("--space-2")).toBeVisible();
  expect(canvas.getByText("--space-10")).toBeVisible();
};
