import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const credibilityStripDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const region = canvas.getByRole("region", { name: /how i work/i });

  expect(region).toBeInTheDocument();
  expect(within(region).getAllByRole("listitem")).toHaveLength(3);
  expect(within(region).getByRole("heading", { level: 3, name: "Startup growth" })).toBeVisible();
};
