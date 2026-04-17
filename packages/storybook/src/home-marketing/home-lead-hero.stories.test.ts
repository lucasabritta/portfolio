import type { StoryPlayFn } from "@ui/storybook-play-types";
import { storyFixtureName } from "@ui/fixtures/cv-story-args";
import { expect, within } from "storybook/test";

export const homeLeadHeroDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { level: 1, name: storyFixtureName })).toBeVisible();
  expect(canvas.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/api/cv");
  expect(canvas.getByRole("link", { name: "View Projects" })).toHaveAttribute("href", "/projects");
  expect(canvas.getByRole("link", { name: "Open Storybook" })).toHaveAttribute(
    "href",
    "/storybook",
  );
  expect(canvas.getByText("Proof points")).toBeVisible();
  expect(canvas.getByRole("list")).toBeVisible();
};
