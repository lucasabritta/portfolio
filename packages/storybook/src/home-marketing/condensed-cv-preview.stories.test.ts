import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const condensedCvPreviewDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Recent roles" })).toBeVisible();
  const resumeLink = canvas.getByRole("link", { name: /continue to full résumé/i });
  expect(resumeLink).toHaveAttribute("href", "#resume");
};
