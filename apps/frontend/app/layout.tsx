import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Observability } from "@/app/_shell/observability";
import { AnalyticsClickCapture } from "@/app/_shell/analytics-click-capture";
import { AnalyticsShell } from "@/app/_shell/analytics-shell";
import { buildSiteChromeProps } from "@/lib/site/site-chrome-props";
import { queryParamsInlineBootstrapScript } from "@/lib/analytics/query-params-inline-script";
import { themeInlineBootstrapScript } from "@/lib/theme/theme-inline-script";
import { siteMetadata } from "@/app/_shell/layout.metadata";
import { SiteChromeClient } from "@/app/_shell/site-chrome-client";
import { ThemeProvider } from "@/app/_shell/theme-provider";
import "@portfolio/storybook/globals.css";
import styles from "@portfolio/storybook/layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rootTitleDefault =
  typeof siteMetadata.title === "string"
    ? siteMetadata.title
    : "Lucas Abritta | Senior Software Engineer · Tech Lead";

export const metadata: Metadata = {
  description: siteMetadata.description,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
  },
  title: {
    default: rootTitleDefault,
    template: "%s | Lucas Abritta",
  },
};

const siteChrome = buildSiteChromeProps();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${styles.htmlRoot}`}
      suppressHydrationWarning
    >
      <body className={styles.bodyRoot}>
        <Script
          id="portfolio-theme-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInlineBootstrapScript() }}
        />
        <Script
          id="portfolio-query-params-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: queryParamsInlineBootstrapScript() }}
        />
        <ThemeProvider>
          <SiteChromeClient {...siteChrome}>{children}</SiteChromeClient>
        </ThemeProvider>
        <Observability />
        <AnalyticsClickCapture />
        <Suspense fallback={null}>
          <AnalyticsShell />
        </Suspense>
      </body>
    </html>
  );
}
