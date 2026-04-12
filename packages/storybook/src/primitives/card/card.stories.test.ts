import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const cardDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByText("Card content")).toBeVisible();
};

export const cardElevatedPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByText("Card content")).toBeVisible();
};

export const cardRadiusLgPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByText("Card content")).toBeVisible();
};

export const cardNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByText("Narrow viewport card")).toBeVisible();
};
