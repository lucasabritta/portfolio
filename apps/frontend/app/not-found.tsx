import Link from "next/link";

import styles from "./status.module.css";

export const metadata = {
  title: "Page not found",
  description: "The requested page could not be found on this portfolio.",
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className={styles.status}>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.body}>
        The page you are looking for does not exist or has been moved. Try the homepage or
        projects.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.action}>
          Back to home
        </Link>
        <Link href="/projects" className={styles.action}>
          View projects
        </Link>
      </div>
    </main>
  );
}
