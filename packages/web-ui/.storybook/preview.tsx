import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import { Geist, Geist_Mono } from "next/font/google";

import "../src/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const title = String(context.title ?? "");
      const sectionShell =
        title.startsWith("UI/Home/") ? (
          <div
            style={{
              maxWidth: "42rem",
              margin: "0 auto",
              padding: "1rem",
              width: "100%",
            }}
          >
            <Story />
          </div>
        ) : (
          <Story />
        );

      return (
        <div className={`${geistSans.variable} ${geistMono.variable}`}>{sectionShell}</div>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    nextjs: {
      appDirectory: true,
    },
    a11y: {
      test: "error",
    },
  },
};

export default preview;
