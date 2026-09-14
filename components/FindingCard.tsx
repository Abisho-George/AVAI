import { EvidenceNote, type EvidenceNoteProps } from './EvidenceNote';
import { SignalCluster, type SignalClusterProps } from './SignalCluster';
import { formatCount, formatPerStudent, type Count, type PerStudent } from './signals';
import styles from './FindingCard.module.css';

/**
 * Two shapes, made structural rather than documented.
 *
 * `observation` carries what was seen, and an action where one has been
 * earned. The action is optional: an Insufficient evidence finding has an
 * observation to state and no intervention it can justify.
 * `note` is the Light card: the cause could not be localised, so the note
 * replaces both. A Light card that also carries a suggested action cannot be
 * constructed, which is the point.
 */
export type FindingBody =
  | { kind: 'observation'; observation: string; action?: string }
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

      {body.kind === 'observation' ? (
        <>
          <p className={styles.observation}>{body.observation}</p>
          {body.action && <p className={styles.action}>Suggested: {body.action}</p>}
        </>
      ) : (
        <EvidenceNote {...body.note} className={styles.bodyNote} />
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
