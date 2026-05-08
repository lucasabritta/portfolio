import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const spacingTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Spacing" })).toBeVisible();
  expect(canvas.getByText("Spacing primitives")).toBeVisible();
  expect(canvas.getByText("--space-2 (16px)")).toBeVisible();
  expect(canvas.getByText("Default block spacing")).toBeVisible();
};
