import type { ReactNode } from "react";
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
      let wrapped: ReactNode = <Story />;
      if (title.startsWith("Foundations/")) {
        wrapped = (
          <div style={{ padding: "1.5rem", width: "100%" }}>
            <Story />
          </div>
        );
      } else if (title.startsWith("UI/Sections/")) {
        wrapped = (
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
        );
      }

      return <div className={`${geistSans.variable} ${geistMono.variable}`}>{wrapped}</div>;
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
