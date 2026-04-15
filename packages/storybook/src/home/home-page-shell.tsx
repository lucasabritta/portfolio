import type { ReactNode } from "react";

import styles from "./page-shell/page-shell.module.css";

export type HomePageShellProps = {
  name: string;
  role: string;
  hero: ReactNode;
  children: ReactNode;
};

export function HomePageShell({ name, role, hero, children }: HomePageShellProps) {
  return (
    <div className={styles.pageRoot}>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <div className={styles.container}>
        {hero}
        <main id="main" className={styles.main}>
          {children}
        </main>
        <footer className={styles.footer}>
          <p>
            {name} - {role}
          </p>
        </footer>
      </div>
    </div>
  );
}
