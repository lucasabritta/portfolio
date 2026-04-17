import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, userEvent, within } from "storybook/test";

export const siteHeaderDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  expect(canvas.getByRole("banner")).toBeInTheDocument();
  const primary = canvas.getByRole("navigation", { name: "Primary" });
  expect(within(primary).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  expect(within(primary).getByRole("link", { name: "Projects" })).toHaveAttribute(
    "href",
    "/projects",
  );
  expect(within(primary).getByRole("link", { name: "Build" })).toHaveAttribute("href", "/build");
  expect(within(primary).getByRole("link", { name: "CV" })).toHaveAttribute("href", "/#resume");

  expect(canvas.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/api/cv");

  const active = within(primary).getByRole("link", { name: "Build" });
  expect(active).toHaveAttribute("aria-current", "page");
};

export const siteHeaderActivePlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const primary = canvas.getByRole("navigation", { name: "Primary" });

  const active = within(primary).getByRole("link", { name: "Projects" });
  expect(active).toHaveAttribute("aria-current", "page");

  for (const label of ["Home", "Build", "CV"]) {
    expect(within(primary).getByRole("link", { name: label })).not.toHaveAttribute("aria-current");
  }
};

export const siteHeaderMobileMenuPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // The menu button is always rendered (CSS-gated, not DOM-gated); use
  // `hidden: true` so the assertion does not depend on the viewport-specific
  // `display` rule from `site-header.module.css`.
  const menuButton = canvas.getByRole("button", {
    name: /open navigation menu/i,
    hidden: true,
  });
  expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await userEvent.click(menuButton);

  const toggled = canvas.getByRole("button", {
    name: /close navigation menu/i,
    hidden: true,
  });
  expect(toggled).toHaveAttribute("aria-expanded", "true");
  expect(toggled).toHaveAttribute("aria-controls");

  const mobileNav = canvas.getByRole("navigation", {
    name: "Primary mobile",
    hidden: true,
  });
  expect(within(mobileNav).getByRole("link", { name: "Projects", hidden: true })).toHaveAttribute(
    "aria-current",
    "page",
  );

  await userEvent.click(toggled);
  expect(
    canvas.getByRole("button", {
      name: /open navigation menu/i,
      hidden: true,
    }),
  ).toHaveAttribute("aria-expanded", "false");
};
