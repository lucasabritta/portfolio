import { describe, expect, it } from "vitest";

import { buildWorkEntryStableKey } from "./work-entry-stable-key";
import { resumeData } from "./index";
import type { ResumeExperienceEntry } from "./types";

/**
 * Structural invariants over the shipped `resumeData`. These guard the two
 * external surfaces that consume it without type-level help:
 *
 *  1. The CV PDF pipeline (`apps/frontend/lib/cv-pdf`) — empty strings would
 *     render as blank rows; work entries missing `role`/`company`/`period`
 *     would collide under the shared stable-key algorithm.
 *  2. The home marketing presentation (`@portfolio/storybook`) — the home
 *     timeline derives keys from the same algorithm (mirrored as
 *     `presentationWorkEntryKey`); duplicates break React reconciliation.
 */

describe("resumeData — top-level required fields", () => {
  it.each([
    ["name"],
    ["role"],
    ["location"],
    ["phone"],
    ["email"],
    ["linkedin"],
    ["summary"],
  ] as const)("has a non-empty %s", (field) => {
    const value = resumeData[field];
    expect(typeof value).toBe("string");
    expect(value.trim().length).toBeGreaterThan(0);
  });

  it("has a syntactically valid email", () => {
    expect(resumeData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("has an https linkedin URL", () => {
    expect(resumeData.linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com\//);
  });

  it("has non-empty summaryHighlights and techStack lists", () => {
    expect(resumeData.summaryHighlights.length).toBeGreaterThan(0);
    expect(resumeData.techStack.length).toBeGreaterThan(0);
    for (const highlight of resumeData.summaryHighlights) {
      expect(highlight.trim().length).toBeGreaterThan(0);
    }
    for (const tech of resumeData.techStack) {
      expect(tech.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("resumeData.workHistory — per-entry invariants", () => {
  it("has at least one entry", () => {
    expect(resumeData.workHistory.length).toBeGreaterThan(0);
  });

  it("has non-empty role, company, period, summary on every entry", () => {
    for (const entry of resumeData.workHistory) {
      for (const field of ["role", "company", "period", "summary"] as const) {
        const value: ResumeExperienceEntry[typeof field] = entry[field];
        expect(
          value.trim().length,
          `entry ${entry.company} / ${entry.role} is missing ${field}`,
        ).toBeGreaterThan(0);
      }
      // Achievements are optional (older roles may ship with an empty list),
      // but any entry present in the list must be a non-blank bullet.
      for (const achievement of entry.achievements) {
        expect(achievement.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

describe("resumeData.workHistory — stable-key uniqueness", () => {
  // Mirrors the contract pinned in
  // `apps/frontend/lib/cv-pdf/work-history.test.ts` — keep both suites in sync
  // if the stable-key algorithm changes.
  it("buildWorkEntryStableKey produces a unique key per entry", () => {
    const keys = resumeData.workHistory.map((entry) => buildWorkEntryStableKey(entry));
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("resumeData — list invariants", () => {
  it("education entries have institution, date, and degree", () => {
    expect(resumeData.education.length).toBeGreaterThan(0);
    for (const entry of resumeData.education) {
      expect(entry.institution.trim().length).toBeGreaterThan(0);
      expect(entry.date.trim().length).toBeGreaterThan(0);
      expect(entry.degree.trim().length).toBeGreaterThan(0);
    }
  });

  it("personal projects have title and an absolute https URL", () => {
    expect(resumeData.personalProjects.length).toBeGreaterThan(0);
    for (const project of resumeData.personalProjects) {
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(project.description.trim().length).toBeGreaterThan(0);
      expect(project.href).toMatch(/^https:\/\//);
    }
  });

  it("contactLinks each have a label and non-empty href", () => {
    expect(resumeData.contactLinks.length).toBeGreaterThan(0);
    for (const link of resumeData.contactLinks) {
      expect(link.label.trim().length).toBeGreaterThan(0);
      expect(link.href.trim().length).toBeGreaterThan(0);
    }
  });

  it("certifications are non-blank strings", () => {
    expect(resumeData.certifications.length).toBeGreaterThan(0);
    for (const certification of resumeData.certifications) {
      expect(typeof certification).toBe("string");
      expect(certification.trim().length).toBeGreaterThan(0);
    }
  });
});
