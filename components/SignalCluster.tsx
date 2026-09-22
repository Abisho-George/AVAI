import styles from "./SignalCluster.module.css";
import {
  ATTENTION_LABEL,
  CONFIDENCE_LABEL,
  URGENCY_LABEL,
  type Attention,
  type Confidence,
  type Urgency,
} from "./types";

type SignalClusterProps = {
  attention?: Attention;
  urgency?: Urgency;
  confidence?: Confidence;
};

/**
 * Three independent signals, three different visual treatments. They never
 * collapse into one red-amber-green scale — a finding can be very-high
 * urgency with only an emerging-confidence signal, and this must be able to
 * show that disagreement.
 */
export function SignalCluster({ attention, urgency, confidence }: SignalClusterProps) {
  return (
    <div className={styles.cluster}>
      {urgency ? (
        <span className={`${styles.urg} ${styles[`urg-${urgency.level}`]}`}>
          {URGENCY_LABEL[urgency.level]} · {urgency.recurrence}
        </span>
      ) : null}
      {attention ? (
        <span className={`${styles.pill} ${styles[`pill-${attention}`]}`}>
          {ATTENTION_LABEL[attention]}
        </span>
      ) : null}
      {confidence ? (
        <span className={styles.conf}>
          <span className={styles.dots} aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`${styles.dot} ${n <= confidence ? styles.on : ""}`} />
            ))}
          </span>
          {CONFIDENCE_LABEL[confidence]}
        </span>
      ) : null}
    </div>
  );
}
