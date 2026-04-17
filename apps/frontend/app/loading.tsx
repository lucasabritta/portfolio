import styles from "./status.module.css";

export default function Loading() {
  return (
    <main id="main" tabIndex={-1} className={styles.status}>
      <div role="status" aria-live="polite">
        <p className={styles.heading}>Loading…</p>
        <p className={styles.body}>Preparing this page.</p>
      </div>
    </main>
  );
}
