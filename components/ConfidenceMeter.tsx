import { CONFIDENCE, type Confidence } from './signals';
import styles from './ConfidenceMeter.module.css';

export type ConfidenceMeterProps = { confidence: Confidence; className?: string };

/**
 * The three-dot meter on its own, for surfaces that carry a confidence value
 * without being findings: the risk groups, for instance, which have no
 * attention value because attention answers "what do we do about this finding"
 * and a group is not a finding.
 *
 * SignalCluster renders this too, so the meter cannot drift between the two.
 */
export function ConfidenceMeter({ confidence, className }: ConfidenceMeterProps) {
  return (
    <span className={[styles.meter, className].filter(Boolean).join(' ')}>
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
  );
}
