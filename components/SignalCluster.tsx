import {
  ATTENTION,
  CONFIDENCE,
  URGENCY,
  type Attention,
  type Confidence,
  type Urgency,
} from './signals';
import styles from './SignalCluster.module.css';

export type SignalClusterProps = {
  /** Always present: every finding has an answer to "what do we do about it". */
  attention: Attention;
  /**
   * Absent when the competency has not been checked against recent Board
   * papers. Nothing renders in its place: a grey "unknown" chip would state
   * something Avai does not know.
   */
  urgency?: Urgency;
  /** Absent for the same reason. Nothing renders in its place. */
  confidence?: Confidence;
  className?: string;
};

/**
 * Three independent signals, three different treatments, never collapsed into
 * one colour scale:
 *
 *   attention  solid pill,     no glyph
 *   urgency    outlined chip,  flame glyph, transparent fill
 *   confidence three-dot meter, always beside its label
 *
 * A finding can be very-high urgency on emerging confidence. Nothing here
 * reconciles that disagreement, by design.
 */
export function SignalCluster({
  attention,
  urgency,
  confidence,
  className,
}: SignalClusterProps) {
  const pill = ATTENTION[attention];

  return (
    <div className={[styles.cluster, className].filter(Boolean).join(' ')}>
      <span
        className={styles.pill}
        style={{
          background: pill.bg,
          color: pill.fg,
          borderColor: pill.border,
        }}
      >
        {pill.label}
      </span>

      {urgency && (
        <span
          className={styles.chip}
          style={{ borderColor: URGENCY[urgency.level].colour }}
        >
          <Flame colour={URGENCY[urgency.level].colour} />
          <span>
            {URGENCY[urgency.level].label} · {urgency.years}/4 years
          </span>
        </span>
      )}

      {confidence && (
        <span className={styles.meter}>
          <span className={styles.dots} aria-hidden="true">
            {[1, 2, 3].map((dot) => (
              <span
                key={dot}
                className={
                  dot <= CONFIDENCE[confidence].dots
                    ? `${styles.dot} ${styles.dotOn}`
                    : styles.dot
                }
              />
            ))}
          </span>
          {CONFIDENCE[confidence].label}
        </span>
      )}
    </div>
  );
}

/** The urgency glyph. Colour is never the only carrier, so the chip is
 *  labelled too, but the flame is what separates urgency from attention at a
 *  glance. */
function Flame({ colour }: { colour: string }) {
  return (
    <svg
      viewBox="0 0 12 14"
      width="11"
      height="13"
      aria-hidden="true"
      className={styles.flame}
    >
      <path
        d="M6 0.5 C7.6 3.2 10.8 4.6 10.8 8.2 C10.8 11.2 8.6 13.5 6 13.5 C3.4 13.5 1.2 11.2 1.2 8.2 C1.2 6.3 2.2 5.2 3.2 4 C3.5 5.2 4.1 5.9 4.9 6.2 C4.6 4.2 5 2.1 6 0.5 Z"
        fill="none"
        stroke={colour}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
