import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Observability } from "@/app/observability";
import { buildSiteChromeProps } from "@/lib/site-chrome-props";
import { themeInlineBootstrapScript } from "@/lib/theme-inline-script";
import { siteMetadata } from "@/app/layout.metadata";
import { SiteChromeClient } from "@/app/site-chrome-client";
import { ThemeProvider } from "@/app/theme-provider";
import "@portfolio/storybook/globals.css";
import "@/lib/cv-pdf/cv-pdf.css";
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
  typeof siteMetadata.title === "string" ? siteMetadata.title : "Lucas Abritta | Engineering Manager";

export const metadata: Metadata = {
  description: siteMetadata.description,
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
      </body>
    </html>
  );
}
