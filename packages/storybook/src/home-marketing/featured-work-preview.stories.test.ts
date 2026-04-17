import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const featuredWorkPreviewDefaultPlay: StoryPlayFn = async ({
  canvasElement,
}) => {
  const canvas = within(canvasElement);

  const region = canvas.getByRole("region", { name: /recent work/i });

  const flagshipHeading = within(region).getByRole("heading", {
    name: /flagship: echoes/i,
  });
  expect(flagshipHeading).toBeVisible();

  const openOnPlay = within(region).getByRole("link", { name: "Google Play" });
  expect(openOnPlay).toHaveAttribute("target", "_blank");
  expect(openOnPlay.getAttribute("rel") ?? "").toMatch(/noopener/);

  expect(
    within(region).getByRole("link", { name: "View Projects" }),
  ).toHaveAttribute("href", "/projects");
  expect(
    within(region).getByRole("link", { name: "Read build notes" }),
  ).toHaveAttribute("href", "/build");
};
