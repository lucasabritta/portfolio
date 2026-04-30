import { type Locator, type Page } from "@playwright/test";

import { PAGE_COPY } from "../helpers/strings";

export class BuildPage {
  readonly page: Page;
  readonly main: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole("main");
    this.pageHeading = this.main.getByRole("heading", {
      level: 1,
      name: PAGE_COPY.buildHeading,
    });
  }

  async goto() {
    await this.page.goto("/site-architecture");
  }
}
