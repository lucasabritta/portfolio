import type { MetadataRoute } from "next";

import { buildAbsoluteSiteUrl } from "@/lib/agent-surfaces/site-url";

const SITEMAP_ENTRIES = [
  { pathname: "/", priority: 1 },
  { pathname: "/projects", priority: 0.8 },
  { pathname: "/site-architecture", priority: 0.7 },
  { pathname: "/llms.txt", priority: 0.9 },
  { pathname: "/resume.txt", priority: 0.9 },
  { pathname: "/projects.txt", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ENTRIES.map((entry) => ({
    url: buildAbsoluteSiteUrl(entry.pathname),
    priority: entry.priority,
  }));
}
