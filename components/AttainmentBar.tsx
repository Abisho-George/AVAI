import {
  bandColour,
  bandFor,
  bandLabel,
  type Polarity,
  type Share,
} from './signals';
import styles from './AttainmentBar.module.css';

export type AttainmentBarProps = {
  label: string;
  value: Share;
  /**
   * Required, with no default. The same bar serves class attainment, where
   * higher is better, and students affected by section, where higher is worse.
   * Guessing wrong paints the worst-hit section teal and still looks correct,
   * so the meaning is stated at every call site.
   */
  polarity: Polarity;
};

export function AttainmentBar({ label, value, polarity }: AttainmentBarProps) {
  const band = bandFor(value.percent, polarity);

  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.track}>
        <span
          className={styles.fill}
          style={{
            width: `${Math.max(0, Math.min(100, value.percent))}%`,
            background: bandColour(band),
          }}
        />
      </span>
      <span className={styles.value}>{value.percent}%</span>
      {/* Colour is never the only carrier of meaning. */}
      <span className={styles.band}>{bandLabel(band, polarity)}</span>
    </div>
  );
}
