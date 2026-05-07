import { type Locator, type Page } from "@playwright/test";

import { PAGE_COPY } from "../helpers/strings";

export class HomePage {
  readonly page: Page;
  readonly skipLink: Locator;
  readonly primaryNavigation: Locator;
  readonly heroHeading: Locator;
  readonly leadHeader: Locator;
  readonly storybookEntryLink: Locator;
  readonly footer: Locator;
  readonly footerGithubLink: Locator;
  readonly footerStorybookLink: Locator;
  readonly resumeSectionHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.skipLink = page.getByRole("link", { name: /skip to content/i });
    this.primaryNavigation = page.getByRole("navigation", { name: "Primary" });
    this.heroHeading = page.getByRole("heading", { level: 1, name: PAGE_COPY.homeHeroName });
    this.leadHeader = page.locator("header").filter({
      has: this.heroHeading,
    });
    this.storybookEntryLink = page.getByRole("link", { name: "Open Storybook" }).first();
    this.footer = page.getByRole("contentinfo");
    this.footerGithubLink = this.footer.getByRole("link", { name: "GitHub" });
    this.footerStorybookLink = this.footer.getByRole("link", {
      name: /Component library \(Storybook\)/i,
    });
    this.resumeSectionHeading = page.getByRole("heading", {
      name: PAGE_COPY.resumeSectionHeading,
    });
  }

  primaryNavLink(label: string) {
    return this.primaryNavigation.getByRole("link", { name: label });
  }

  async goto(options?: Parameters<Page["goto"]>[1]) {
    await this.page.goto("/", options);
  }

  async gotoResumeSection() {
    await this.page.goto("/#resume");
  }

  async openProjectsFromPrimaryNav() {
    await Promise.all([
      this.page.waitForURL(/\/projects$/),
      this.primaryNavLink("Projects").click(),
    ]);
  }

  async openBuildFromPrimaryNav() {
    await Promise.all([
      this.page.waitForURL(/\/site-architecture$/),
      this.primaryNavLink("Site architecture").click(),
    ]);
  }
}
