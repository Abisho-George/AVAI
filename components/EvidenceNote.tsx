import styles from './EvidenceNote.module.css';

export type EvidenceState =
  | 'cause-not-localised'
  | 'paper-under-tests'
  | 'early-signal'
  | 'trend-not-available';

/** Copy is verbatim from CLAUDE.md. Callers pick a state, never a string. */
const NOTES: Record<EvidenceState, { title: string; body: string }> = {
  'cause-not-localised': {
    title: 'Cause not localised',
    body: 'Problem confirmed. Cause not localised. Manual review recommended.',
  },
  'paper-under-tests': {
    title: 'Paper under-tests this area',
    body: 'This assessment included too few application questions to confidently assess application readiness.',
  },
  'early-signal': {
    title: 'Early signal',
    body: 'A possible pattern is visible, but there is not yet enough evidence for a strong conclusion.',
  },
  'trend-not-available': {
    title: 'Trend not yet available',
    body: 'Trend and consistency insights require at least one additional analysed assessment.',
  },
};

/**
 * States that are designed but not running. The component carries the label
 * itself rather than trusting every call site to remember it, so the claim
 * cannot be dropped by accident on one page out of nine. When the backend
 * ships, deleting the entry removes the label everywhere at once.
 */
const UNBUILT: ReadonlySet<EvidenceState> = new Set(['cause-not-localised']);

const UNBUILT_LABEL = 'Designed. Not yet running in the current build.';

export type EvidenceNoteProps = { state: EvidenceState; className?: string };

/** Calm information. Never an error, never red. */
export function EvidenceNote({ state, className }: EvidenceNoteProps) {
  const note = NOTES[state];

  return (
    <div className={[styles.note, className].filter(Boolean).join(' ')}>
      <Info />
      <div className={styles.text}>
        <p className={styles.title}>{note.title}</p>
        <p className={styles.body}>{note.body}</p>
        {UNBUILT.has(state) && <p className={styles.unbuilt}>{UNBUILT_LABEL}</p>}
      </div>
    </div>
  );
}

function Info() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" className={styles.icon}>
      <circle cx="8" cy="8" r="7" fill="none" stroke="var(--muted)" strokeWidth="1.3" />
      <circle cx="8" cy="4.6" r="0.95" fill="var(--muted)" />
      <path d="M8 7 L8 11.6" stroke="var(--muted)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
