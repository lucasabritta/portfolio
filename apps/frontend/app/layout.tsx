import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Observability } from "@/app/_shell/observability";
import { AnalyticsProvider } from "@/app/_shell/analytics-provider";
import { PreserveQueryParams } from "@/app/_shell/preserve-query-params";
import { buildSiteChromeProps } from "@/lib/site/site-chrome-props";
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
    : "Lucas Abritta | Engineering Manager";

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
        <ThemeProvider>
          <SiteChromeClient {...siteChrome}>{children}</SiteChromeClient>
        </ThemeProvider>
        <Observability />
        <Suspense fallback={null}>
          <PreserveQueryParams />
          <AnalyticsProvider />
        </Suspense>
      </body>
    </html>
  );
}
