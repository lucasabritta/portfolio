import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, userEvent, within } from "storybook/test";

export const projectsSectionDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const links = canvas.getAllByRole("link", { name: /view project/i });
  expect(links.length).toBeGreaterThan(0);
  links[0]!.focus();
  expect(links[0]).toHaveFocus();
  if (links.length > 1) {
    await userEvent.tab();
    expect(links[1]).toHaveFocus();
  }
};

export const projectsSectionEmptyPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByRole("status")).toHaveTextContent(
    /no personal projects listed/i,
  );
};

export const projectsSectionLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /view project/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const projectsSectionManyItemsPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const links = canvas.getAllByRole("link", { name: /view project/i });
  expect(links.length).toBeGreaterThan(1);
  links[0]!.focus();
  await userEvent.tab();
  expect(links[1]).toHaveFocus();
};

export const projectsSectionNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const links = canvas.getAllByRole("link", { name: /view project/i });
  expect(links.length).toBeGreaterThan(0);
  links[0]!.focus();
  expect(links[0]).toHaveFocus();
};
