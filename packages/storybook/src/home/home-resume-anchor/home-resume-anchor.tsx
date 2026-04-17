import type { ReactNode } from "react";

import styles from "./home-resume-anchor.module.css";

export type HomeResumeAnchorProps = {
  /** DOM id used by in-page anchor links and the deep-link CTA. */
  id: string;
  children: ReactNode;
};

/**
 * Stacked layout for the résumé sections on the home page. Owns the gap and
 * `scroll-margin-top` so deep links land below the sticky header.
 */
export function HomeResumeAnchor({ id, children }: HomeResumeAnchorProps) {
  return (
    <div id={id} className={styles.resumeAnchor}>
      {children}
    </div>
  );
}
