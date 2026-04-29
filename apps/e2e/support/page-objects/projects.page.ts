import { type Locator, type Page } from "@playwright/test";

import { PAGE_COPY } from "../helpers/strings";

export class ProjectsPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly flagshipHeading: Locator;
  readonly pinnedRepositoriesHeading: Locator;
  readonly hardestProblemHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole("heading", { name: PAGE_COPY.projectsHeading });
    this.flagshipHeading = page.getByRole("heading", { name: PAGE_COPY.projectsFlagshipTitle });
    this.pinnedRepositoriesHeading = page.getByRole("heading", {
      name: PAGE_COPY.projectsPinnedHeading,
    });
    this.hardestProblemHeading = page.getByRole("heading", {
      name: PAGE_COPY.projectsHardestHeading,
    });
  }

  async goto() {
    await this.page.goto("/projects");
  }
}
