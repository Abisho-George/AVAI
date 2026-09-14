import styles from './Wordmark.module.css';

export type WordmarkProps = {
  /** 'dark' inverts for the navy footer. */
  tone?: 'light' | 'dark';
  size?: 'md' | 'lg';
  className?: string;
};

/**
 * The logo lockup: the wing mark, the AVAI wordmark with a teal A, and
 * LEARN GROW ACHIEVE beneath it.
 *
 * The strapline is the fragile part. Wide tracking on eleven uppercase
 * characters wraps at the first excuse, so it is nowrap with its tracking
 * tightened at the smaller size.
 */
export function Wordmark({ tone = 'light', size = 'md', className }: WordmarkProps) {
  return (
    <span
      className={[styles.lockup, styles[size], tone === 'dark' && styles.dark, className]
        .filter(Boolean)
        .join(' ')}
    >
      <svg viewBox="0 0 30 30" className={styles.glyph} aria-hidden="true">
        <rect width="30" height="30" rx="8" fill={tone === 'dark' ? '#0E3057' : '#06213E'} />
        <path d="M8 21 C12 15 17 10 23 7 C19 13 15 18 11 22 Z" fill="var(--gold)" />
        <path d="M7 22 C11 16 16 11 22 8 C17 14 12 19 9 23 Z" fill="var(--teal)" />
      </svg>
      <span className={styles.text}>
        <span className={styles.name}>
          AV<i>A</i>I
        </span>
        <span className={styles.strap}>Learn Grow Achieve</span>
      </span>
    </span>
  );
}
