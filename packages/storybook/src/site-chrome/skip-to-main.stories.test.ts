import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, userEvent, within } from "storybook/test";

export const skipToMainDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const link = canvas.getByRole("link", { name: /skip to content/i });
  expect(link).toHaveAttribute("href", "#main");

  await userEvent.tab();
  expect(link).toHaveFocus();
};
