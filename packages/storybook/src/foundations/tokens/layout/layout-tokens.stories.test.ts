import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const layoutTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Layout Tokens" })).toBeVisible();
  expect(canvas.getByText("Main page content container")).toBeVisible();
  expect(canvas.getByText("Default profile/avatar size")).toBeVisible();
  expect(canvas.getByText("Container and reading width")).toBeVisible();
  expect(canvas.getByText("Hit target sizes")).toBeVisible();
  expect(canvas.getByText("Avatar sizing")).toBeVisible();
};
