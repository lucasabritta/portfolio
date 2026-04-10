import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Observability } from "@/components/observability";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Abritta | Engineering Manager",
  description:
    "Engineering Manager portfolio and CV for Lucas Abritta, covering startup growth, platform excellence, and software delivery leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full font-sans">
        {children}
        <Observability />
      </body>
    </html>
  );
}
