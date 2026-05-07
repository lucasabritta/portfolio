import type { StoryPlayFn } from "@ui/storybook-play-types";
import { storyFixtureName } from "@ui/fixtures/cv-story-args";
import { expect, within } from "storybook/test";

export const homeLeadHeroDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { level: 1, name: storyFixtureName })).toBeVisible();
  expect(canvas.getByText("Proof points")).toBeVisible();
  expect(canvas.getByText("Startup growth")).toBeVisible();
  expect(canvas.getByRole("link", { name: "View Projects" })).toHaveAttribute("href", "/projects");
  expect(canvas.getByRole("link", { name: /GitHub profile.*opens in a new tab/i })).toHaveAttribute(
    "href",
    "https://github.com/example",
  );
  expect(canvas.queryByRole("link", { name: /Open Storybook/i })).toBeNull();
};
