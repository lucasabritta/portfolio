import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Observability } from "@/app/observability";
import { siteMetadata } from "@/app/layout.metadata";
import "@portfolio/web-ui/globals.css";
import styles from "@portfolio/web-ui/layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${styles.htmlRoot}`}
    >
      <body className={styles.bodyRoot}>
        {children}
        <Observability />
      </body>
    </html>
  );
}
