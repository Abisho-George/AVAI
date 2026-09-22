import styles from "./Logo.module.css";

type LogoProps = {
  /** Use on dark surfaces — the footer, the portal panel. */
  dark?: boolean;
  className?: string;
};

/** The AVAI wordmark lockup: icon + "AVAI" with a teal A, "LEARN GROW ACHIEVE" beneath. */
export function Logo({ dark = false, className }: LogoProps) {
  return (
    <span className={[styles.mark, dark ? styles.dark : "", className].filter(Boolean).join(" ")}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect width="30" height="30" rx="8" fill="var(--ink)" />
        <path d="M8 21 C12 15 17 10 23 7 C19 13 15 18 11 22 Z" fill="var(--gold)" />
        <path d="M7 22 C11 16 16 11 22 8 C17 14 12 19 9 23 Z" fill="var(--teal)" />
      </svg>
      <span>
        <span className={styles.markTxt}>
          AV<i className={styles.markA}>A</i>I
        </span>
        <span className={styles.markSub}>LEARN GROW ACHIEVE</span>
      </span>
    </span>
  );
}
