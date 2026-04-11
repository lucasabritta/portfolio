import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { cvData } from "@portfolio/cv";
import {
  contactSectionArgs,
  contactSectionEmptyArgs,
  contactSectionLongContentArgs,
  narrowMobileStory,
} from "@ui/fixtures/cv-story-args";
import { ContactSection } from "./contact-section";

const meta = {
  title: "UI/Home/ContactSection",
  component: ContactSection,
  tags: ["autodocs"],
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: contactSectionArgs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("link", { name: cvData.phone }).focus();
    expect(canvas.getByRole("link", { name: cvData.phone })).toHaveFocus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: cvData.email })).toHaveFocus();
  },
};

export const Empty: Story = {
  args: contactSectionEmptyArgs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("link", { name: "Phone not provided" }).focus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: "Email not provided" })).toHaveFocus();
  },
};

export const LongContent: Story = {
  args: contactSectionLongContentArgs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("link", { name: cvData.phone }).focus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: new RegExp(cvData.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })).toHaveFocus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: "LinkedIn" })).toHaveFocus();
  },
};

export const NarrowViewport: Story = {
  args: contactSectionArgs(),
  ...narrowMobileStory,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("link", { name: cvData.phone }).focus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: cvData.email })).toHaveFocus();
  },
};
