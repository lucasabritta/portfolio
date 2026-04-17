import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const siteFooterDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const footer = canvas.getByRole("contentinfo");
  expect(footer).toBeInTheDocument();

  const github = within(footer).getByRole("link", { name: "GitHub" });
  expect(github).toHaveAttribute("href", "https://github.com/example");
  expect(github).toHaveAttribute("rel", "noopener noreferrer");
  expect(github).toHaveAttribute("target", "_blank");

  const storybook = within(footer).getByRole("link", {
    name: "Component library (Storybook)",
  });
  expect(storybook).toHaveAttribute("href", "/storybook");
  expect(storybook).not.toHaveAttribute("target");

  expect(
    within(footer).getByRole("link", { name: "Download CV" }),
  ).toHaveAttribute("href", "/api/cv");

  expect(
    within(footer).getByText(/built with next\.js, storybook, and vercel/i),
  ).toBeInTheDocument();
};
