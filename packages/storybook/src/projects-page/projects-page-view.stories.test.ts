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

  const medium = canvas.getByRole("link", { name: /Medium article.*opens in a new tab/i });
  expect(medium).toHaveAttribute(
    "href",
    "https://medium.com/@lucasabritta_93729/what-i-learned-building-an-android-game-with-ai-agents-5f64d23024fe",
  );
  expect(medium.querySelector("svg")).toBeTruthy();

  const repoGithub = canvas.getByRole("link", {
    name: /view on github\s*: example\/portfolio/i,
  });
  expect(repoGithub).toHaveAttribute("href", "https://github.com/example/portfolio");
  expect(repoGithub.querySelector("svg")).toBeTruthy();
};
