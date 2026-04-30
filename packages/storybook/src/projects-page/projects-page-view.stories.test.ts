import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const projectsPageViewDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  expect(canvas.getByRole("heading", { level: 1, name: "Projects" })).toBeVisible();

  expect(canvas.getByRole("heading", { name: "Echoes of the missing cat" })).toBeVisible();
  expect(canvas.getByRole("heading", { name: /hardest problem/i })).toBeVisible();

  expect(canvas.getByRole("heading", { name: /curated github/i })).toBeVisible();

  const googlePlay = canvas.getByRole("link", { name: /Google Play.*opens in a new tab/i });
  expect(googlePlay).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=com.echoes.missingcat",
  );
  expect(googlePlay).toHaveAttribute("target", "_blank");
  expect(googlePlay.getAttribute("rel") ?? "").toMatch(/noopener/);

  expect(
    canvas.getByRole("link", {
      name: /open github repository: example\/portfolio/i,
    }),
  ).toHaveAttribute("href", "https://github.com/example/portfolio");
};
