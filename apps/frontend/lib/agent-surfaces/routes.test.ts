/**
 * @vitest-environment node
 */
import { afterEach, describe, expect, it, vi } from "vitest";

import { resumeData } from "@portfolio/resume-content";

import robots from "../../app/robots";
import sitemap from "../../app/sitemap";
import { GET as llmsGET } from "../../app/llms.txt/route";
import { GET as projectsGET } from "../../app/projects.txt/route";
import { GET as resumeGET } from "../../app/resume.txt/route";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("agent text routes", () => {
  it("returns llms.txt with text endpoints and absolute urls", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example/");

    const response = llmsGET();
    const text = await response.text();

    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(text).toContain(`# ${resumeData.name}`);
    expect(text).toContain("https://portfolio.example/resume.txt");
    expect(text).toContain("https://portfolio.example/projects.txt");
  });

  it("returns a plain text resume", async () => {
    const response = resumeGET();
    const text = await response.text();

    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(text).toContain("## Work History");
    expect(text).toContain(resumeData.workHistory[0].role);
  });

  it("returns plain text project content", async () => {
    const response = projectsGET();
    const text = await response.text();

    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(text).toContain("# Projects");
    expect(text).toContain("Echoes: Missing Cat");
  });
});

describe("crawler discovery routes", () => {
  it("exposes sitemap location in robots.txt metadata", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example");

    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://portfolio.example/sitemap.xml",
      host: "https://portfolio.example",
    });
  });

  it("includes agent text surfaces in the sitemap", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example");

    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual(
      expect.arrayContaining([
        "https://portfolio.example/",
        "https://portfolio.example/llms.txt",
        "https://portfolio.example/resume.txt",
        "https://portfolio.example/projects.txt",
      ]),
    );
  });
});
