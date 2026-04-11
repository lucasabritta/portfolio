import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import {
  narrowMobileStory,
  projectsSectionArgs,
  projectsSectionEmptyArgs,
  projectsSectionLongContentArgs,
  projectsSectionManyItemsArgs,
} from "@ui/fixtures/cv-story-args";
import { ProjectsSection } from "./projects-section";

const meta = {
  title: "UI/Home/ProjectsSection",
  component: ProjectsSection,
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: projectsSectionArgs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link", { name: /view project/i });
    expect(links.length).toBeGreaterThan(0);
    links[0]!.focus();
    expect(links[0]).toHaveFocus();
    if (links.length > 1) {
      await userEvent.tab();
      expect(links[1]).toHaveFocus();
    }
  },
};

export const Empty: Story = {
  args: projectsSectionEmptyArgs(),
};

export const LongContent: Story = {
  args: projectsSectionLongContentArgs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: /view project/i });
    link.focus();
    expect(link).toHaveFocus();
  },
};

export const ManyItems: Story = {
  args: projectsSectionManyItemsArgs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link", { name: /view project/i });
    expect(links.length).toBeGreaterThan(1);
    links[0]!.focus();
    await userEvent.tab();
    expect(links[1]).toHaveFocus();
  },
};

export const NarrowViewport: Story = {
  args: projectsSectionArgs(),
  ...narrowMobileStory,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link", { name: /view project/i });
    expect(links.length).toBeGreaterThan(0);
    links[0]!.focus();
    expect(links[0]).toHaveFocus();
  },
};
