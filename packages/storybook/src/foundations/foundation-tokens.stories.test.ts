import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const colorTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Color Tokens" })).toBeVisible();
  expect(canvas.getByText("--background")).toBeVisible();
  expect(canvas.getByText("--accent")).toBeVisible();
};

export const typographyTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Typography" })).toBeVisible();
  expect(canvas.getByText("Engineering systems with clear ownership.")).toBeVisible();
};

export const spacingTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Spacing" })).toBeVisible();
  expect(canvas.getByText("1rem")).toBeVisible();
  expect(canvas.getByText("Default content padding")).toBeVisible();
};

export const themeModeTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Theme Modes" })).toBeVisible();
  expect(canvas.getByText("light mode")).toBeVisible();
  expect(canvas.getByText("dark mode")).toBeVisible();
};
