import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const titleDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByRole("heading", { level: 3, name: "Card title" })).toBeVisible();
};

export const titleSmallPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByRole("heading", { level: 3, name: "Certification name" })).toBeVisible();
};

export const titleMediumPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(
    within(canvasElement).getByRole("heading", { level: 3, name: "Education or project title" }),
  ).toBeVisible();
};

export const titleLargePlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByRole("heading", { level: 3, name: "Company / role" })).toBeVisible();
};

export const titleLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(
    within(canvasElement).getByRole("heading", {
      level: 3,
      name: /Very long institution name/,
    }),
  ).toBeVisible();
};
