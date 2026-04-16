import type { ReactNode } from "react";

import styles from "./page-shell/page-shell.module.css";

export type HomePageShellProps = {
  hero: ReactNode;
  children: ReactNode;
};

export function HomePageShell({ hero, children }: HomePageShellProps) {
  return (
    <div className={styles.pageRoot}>
      <div className={styles.container}>
        {hero}
        <main id="main" tabIndex={-1} className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
