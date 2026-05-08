import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const tokenSectionPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Spacing primitives" })).toBeVisible();
  expect(
    canvas.getByText("Raw spacing scale tokens for element spacing, gaps, and column spacing."),
  ).toBeVisible();
  expect(canvas.getByText("--space-2")).toBeVisible();
  expect(canvas.getByText("--space-1")).toBeVisible();
  expect(canvas.getByText("--space-3")).toBeVisible();
};
