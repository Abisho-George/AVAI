import { EvidenceNote, type EvidenceNoteProps } from './EvidenceNote';
import { SignalCluster, type SignalClusterProps } from './SignalCluster';
import { formatCount, formatPerStudent, type Count, type PerStudent } from './signals';
import styles from './FindingCard.module.css';

/**
 * Two shapes, made structural rather than documented.
 *
 * Three kinds, one per epistemic state, each asserting exactly what it can
 * support. The type says which state a card is in rather than leaving it to
 * whether someone filled a field in:
 *
 *   observation       the problem is confirmed and an action is justified
 *   observation-only  something was observed, no action is justified yet
 *   note              the Light card: cause not localised, so neither holds
 *
 * A confirmed finding therefore cannot ship without an action, and a Light card
 * cannot carry one. Both are structural, not documented.
 */
export type FindingBody =
  | { kind: 'observation'; observation: string; action: string }
  | { kind: 'observation-only'; observation: string }
  | { kind: 'note'; note: EvidenceNoteProps };

export type FindingCardProps = {
  subject: string;
  chapter: string;
  competency: string;
  studentsAffected: Count;
  avgMarksLost: PerStudent;
  signals: SignalClusterProps;
  body: FindingBody;
  /** Supplementary notes, below the body. */
  notes?: EvidenceNoteProps[];
  href?: string;
};

/** Never a bare stat: the unit comes off the measure type, not off the caller. */
function Stat({ label, value }: { label: string; value: string }) {
  const [figure, ...rest] = value.split(' ');
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>
        <strong>{figure}</strong> {rest.join(' ')}
      </span>
    </div>
  );
}

export function FindingCard({
  subject,
  chapter,
  competency,
  studentsAffected,
  avgMarksLost,
  signals,
  body,
  notes,
  href,
}: FindingCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <p className={styles.subject}>
          {subject} · <strong>{chapter}</strong>
        </p>
        <p className={styles.competency}>{competency}</p>
      </header>

      <div className={styles.stats}>
        <Stat label="Students affected" value={formatCount(studentsAffected)} />
        <Stat label="Avg marks lost" value={formatPerStudent(avgMarksLost)} />
      </div>

      <SignalCluster {...signals} className={styles.signals} />

      {body.kind === 'note' ? (
        <EvidenceNote {...body.note} className={styles.bodyNote} />
      ) : (
        <>
          <p className={styles.observation}>{body.observation}</p>
          {body.kind === 'observation' && (
            <p className={styles.action}>Suggested: {body.action}</p>
          )}
        </>
      )}

      {notes?.map((note) => (
        <EvidenceNote key={note.state} {...note} className={styles.bodyNote} />
      ))}

      {href && (
        <a className={styles.open} href={href}>
          Open finding <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}
