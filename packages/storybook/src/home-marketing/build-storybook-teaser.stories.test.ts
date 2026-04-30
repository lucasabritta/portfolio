import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const buildStorybookTeaserDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const region = canvas.getByRole("region", { name: /site & component library/i });

  const buildLink = within(region).getByRole("link", {
    name: /site architecture/i,
  });
  expect(buildLink).toHaveAttribute("href", "/site-architecture");

  const storybookLink = within(region).getByRole("link", {
    name: /open storybook/i,
  });
  expect(storybookLink).toHaveAttribute("href", "/storybook");
  expect(storybookLink).toHaveAttribute("target", "_blank");
  expect(storybookLink.getAttribute("rel") ?? "").toMatch(/noopener/);
};
