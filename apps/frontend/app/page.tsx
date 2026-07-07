import type { Metadata } from "next";

import { resumeData } from "@portfolio/resume-content";

import { HomePageView } from "@/app/home-page-view";
import { buildHomePageModel } from "@/lib/site/home-page-model";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio for Lucas Abritta — startup engineering, platform reliability, and hands-on delivery from seed through scale.",
};

export default function Home() {
  return <HomePageView model={buildHomePageModel(resumeData)} />;
}
