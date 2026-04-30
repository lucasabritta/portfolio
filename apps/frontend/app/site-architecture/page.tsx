import type { Metadata } from "next";

import { BuildPageView } from "@portfolio/storybook/build-page";

import { buildPageContent } from "@/lib/site/build-site";

export const metadata: Metadata = {
  title: "Site architecture",
  description:
    "How this portfolio is structured: Next.js, Storybook, multi-package layout, CI, Vercel, and Cloudflare.",
};

export default function SiteArchitecturePage() {
  return <BuildPageView {...buildPageContent} />;
}
