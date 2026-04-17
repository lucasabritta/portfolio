import type { Metadata } from "next";

import { BuildPageView } from "@portfolio/storybook";

import { buildPageContent } from "@/lib/build-site";

export const metadata: Metadata = {
  title: "Build",
  description:
    "How this portfolio is structured — Next.js, Storybook, multi-package layout, CI, and deployment on Vercel.",
};

export default function BuildPage() {
  return <BuildPageView {...buildPageContent} />;
}
