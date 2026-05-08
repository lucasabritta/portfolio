import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const spacingTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Spacing" })).toBeVisible();
  expect(canvas.getByText("Spacing primitives")).toBeVisible();
  expect(canvas.getByText("Element spacing tokens")).toBeVisible();
  expect(canvas.getByText("Gap tokens")).toBeVisible();
  expect(canvas.getByText("Space-column tokens")).toBeVisible();
  expect(canvas.getByText("Radius tokens")).toBeVisible();
  expect(canvas.getByText("--space-2 (16px)")).toBeVisible();
  expect(canvas.getByText("Default block spacing")).toBeVisible();
  expect(canvas.getByText("Radius visual demo")).toBeVisible();
  expect(canvas.getByText("Gap visual demo")).toBeVisible();
  expect(canvas.getByText("Space-column visual demo")).toBeVisible();
};
