import styles from "./RingGauge.module.css";

type RingGaugeProps = {
  /** 0 to 100 */
  value: number;
  /** Where the Board expects this to be, drawn as a tick on the ring. */
  expected?: number;
  tone: "teal" | "gold" | "blue";
  label: string;
  caption: string;
};

const R = 42;

/**
 * A circular meter that sweeps to its value when its section is revealed
 * (the .ring-fill hook in globals.css). The number and caption are plain
 * text, so the ring itself is decorative.
 */
export function RingGauge({ value, expected, tone, label, caption }: RingGaugeProps) {
  const angle = expected !== undefined ? (expected / 100) * 360 - 90 : 0;
  const rad = (angle * Math.PI) / 180;
  return (
    <div className={styles.gauge}>
      <div className={styles.ringWrap}>
        <svg viewBox="0 0 100 100" className={styles.ring} aria-hidden="true">
          <circle cx="50" cy="50" r={R} className={styles.track} />
          <circle
            cx="50"
            cy="50"
            r={R}
            pathLength={100}
            className={`ring-fill ${styles.fill} ${styles[tone]}`}
            style={{ strokeDasharray: 100, strokeDashoffset: 100 - value }}
            transform="rotate(-90 50 50)"
          />
          {expected !== undefined ? (
            <line
              x1={50 + (R - 8) * Math.cos(rad)}
              y1={50 + (R - 8) * Math.sin(rad)}
              x2={50 + (R + 8) * Math.cos(rad)}
              y2={50 + (R + 8) * Math.sin(rad)}
              className={styles.tick}
            />
          ) : null}
        </svg>
        <span className={styles.value}>{value}%</span>
      </div>
      <div>
        <p className={styles.label}>{label}</p>
        <p className={styles.caption}>{caption}</p>
      </div>
    </div>
  );
}
