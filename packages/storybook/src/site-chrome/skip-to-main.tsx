import styles from "./skip-to-main.module.css";

export function SkipToMain() {
  return (
    <a href="#main" className={styles.skip}>
      Skip to content
    </a>
  );
}
