import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const layoutTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Layout Tokens" })).toBeVisible();
  expect(canvas.getByText("--layout-container-max")).toBeVisible();
  expect(canvas.getByText("--size-avatar-md")).toBeVisible();
};
