import styles from "./FindingCard.module.css";
import { SignalCluster } from "./SignalCluster";
import type { Attention, Confidence, Urgency } from "./types";

type Metric = {
  label: string;
  value: string | number;
  /** Denominator or unit — "of 240", "per student". Never a bare number. */
  qualifier: string;
};

type FindingCardProps = {
  subject: string;
  competency: string;
  scope: string;
  urgency: Urgency;
  metrics: [Metric, Metric];
  attention: Attention;
  confidence: Confidence;
  observation: string;
  suggestedAction: string;
};

/**
 * Subject, competency, students affected, avg marks lost, the three
 * signals, one observation sentence, suggested action. Never a bare stat —
 * every number in `metrics` carries its denominator or unit.
 */
export function FindingCard({
  subject,
  competency,
  scope,
  urgency,
  metrics,
  attention,
  confidence,
  observation,
  suggestedAction,
}: FindingCardProps) {
  return (
    <article className={styles.finding}>
      <div className={styles.top}>
        <div>
          <div className={styles.subj}>{subject}</div>
          <h3>{competency}</h3>
          <div className={styles.comp}>{scope}</div>
        </div>
        <SignalCluster urgency={urgency} />
      </div>

      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <div className={styles.metric} key={metric.label}>
            <span>{metric.label}</span>
            <b>
              {metric.value}
              <em>{metric.qualifier}</em>
            </b>
          </div>
        ))}
      </div>

      <div className={styles.signals}>
        <SignalCluster attention={attention} confidence={confidence} />
      </div>

      <p className={styles.obs}>{observation}</p>
      <div className={styles.act}>Suggested: {suggestedAction}</div>
    </article>
  );
}
