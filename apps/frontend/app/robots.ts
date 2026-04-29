import type { MetadataRoute } from "next";

import { buildAbsoluteSiteUrl, getSiteOrigin } from "@/lib/agent-surfaces/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: buildAbsoluteSiteUrl("/sitemap.xml"),
    host: getSiteOrigin(),
  };
}
