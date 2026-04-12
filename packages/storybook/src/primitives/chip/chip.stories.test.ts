import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const chipDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByText("TypeScript")).toBeVisible();
};

const CHIP_LABELS = ["React", "Next.js", "TypeScript", "Node.js"] as const;

export const chipManyPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  for (const label of CHIP_LABELS) {
    expect(canvas.getByText(label)).toBeVisible();
  }
};

export const chipNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  for (const label of CHIP_LABELS) {
    expect(canvas.getByText(label)).toBeVisible();
  }
};
