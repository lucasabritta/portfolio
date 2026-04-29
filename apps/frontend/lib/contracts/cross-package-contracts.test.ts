import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  CV_FILENAME_PATTERN,
  buildWorkEntryStableKey,
  resumeData,
} from "@portfolio/resume-content";
import { presentationWorkEntryKey } from "@portfolio/storybook/home";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const e2eStringsPath = path.resolve(dirname, "../../../../apps/e2e/fixtures/strings.ts");

describe("cross-package presentation contracts", () => {
  it("keeps Storybook work-entry keys aligned with resume-content", () => {
    for (const entry of resumeData.workHistory) {
      expect(presentationWorkEntryKey(entry)).toBe(buildWorkEntryStableKey(entry));
    }
  });
});

describe("cross-package CV filename contracts", () => {
  it("keeps the E2E filename mirror aligned with the canonical regex", () => {
    const e2eStrings = fs.readFileSync(e2eStringsPath, "utf8");
    const match = e2eStrings.match(/export const CV_FILENAME_BODY = "([^"]+)";/);

    expect(match?.[1]).toBeDefined();
    const mirroredFilenameBody = JSON.parse(`"${match?.[1] ?? ""}"`) as string;
    expect(new RegExp(`^${mirroredFilenameBody}$`).source).toBe(CV_FILENAME_PATTERN.source);
  });
});
