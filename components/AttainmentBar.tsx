import styles from "./AttainmentBar.module.css";
import type { BarTone } from "./types";

type AttainmentBarProps = {
  label: string;
  /** 0–100. Drives the fill width. */
  percent: number;
  /** What the track shows, e.g. "41%" or "42/80". Never inferred — always explicit. */
  value: string;
  tone: BarTone;
};

/** Label, track, fill, value. Fill colour from the wing gradient. */
export function AttainmentBar({ label, percent, value, tone }: AttainmentBarProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${styles.fill} ${styles[`f-${tone}`]}`}
          style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        />
      </div>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
