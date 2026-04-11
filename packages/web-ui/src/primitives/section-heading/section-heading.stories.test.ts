import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const sectionHeadingDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heading = canvas.getByRole("heading", { level: 2, name: "Section label" });
  expect(heading).toHaveAttribute("id", "demo-heading");
};

export const sectionHeadingLongLabelPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heading = canvas.getByRole("heading", {
    level: 2,
    name: "Professional experience and engagements",
  });
  expect(heading).toHaveAttribute("id", "long-heading");
};
