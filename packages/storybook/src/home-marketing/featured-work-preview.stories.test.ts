import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const featuredWorkPreviewDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const region = canvas.getByRole("region", { name: /recent work/i });

  const flagshipHeading = within(region).getByRole("heading", {
    name: /flagship: echoes/i,
  });
  expect(flagshipHeading).toBeVisible();

  const openOnPlay = within(region).getByRole("link", {
    name: /Google Play.*opens in a new tab/i,
  });
  expect(openOnPlay).toHaveAttribute("target", "_blank");
  expect(openOnPlay.getAttribute("rel") ?? "").toMatch(/noopener/);
  const medium = within(region).getByRole("link", {
    name: /Medium article.*opens in a new tab/i,
  });
  expect(medium).toHaveAttribute(
    "href",
    "https://medium.com/@lucasabritta_93729/what-i-learned-building-an-android-game-with-ai-agents-5f64d23024fe",
  );
  expect(medium.querySelector("svg")).toBeTruthy();

  expect(within(region).getByRole("link", { name: "View Projects" })).toHaveAttribute(
    "href",
    "/projects",
  );
  expect(within(region).getByRole("link", { name: "Read site architecture" })).toHaveAttribute(
    "href",
    "/site-architecture",
  );
};
