import styles from './EvidenceNote.module.css';

export type EvidenceState =
  | 'cause-not-localised'
  | 'paper-under-tests'
  | 'early-signal'
  | 'trend-not-available';

type Glyph = 'warning' | 'sparkle' | 'info' | 'magnifier';

type NoteSpec = {
  title: string;
  body: string;
  glyph: Glyph;
  /** Surface tint. Calm is a constraint on intensity, not a mandate for
   *  uniformity: four identical cards mean a principal cannot tell "your paper
   *  was too weak to support this" from "come back after another assessment". */
  tint: string;
  ink: string;
};

/** Copy is verbatim from CLAUDE.md. Callers pick a state, never a string. */
const NOTES: Record<EvidenceState, NoteSpec> = {
  'paper-under-tests': {
    title: 'Paper under-tests this area',
    body: 'This assessment included too few application questions to confidently assess application readiness.',
    glyph: 'warning',
    tint: 'var(--gold-tint)',
    ink: 'var(--gold-deep)',
  },
  'early-signal': {
    title: 'Early signal',
    body: 'A possible pattern is visible, but there is not yet enough evidence for a strong conclusion.',
    glyph: 'sparkle',
    tint: 'var(--gold-tint)',
    ink: 'var(--gold-deep)',
  },
  'trend-not-available': {
    title: 'Trend not yet available',
    body: 'Trend and consistency insights require at least one additional analysed assessment.',
    glyph: 'info',
    tint: 'var(--tint)',
    ink: 'var(--blue)',
  },
  'cause-not-localised': {
    title: 'Cause not localised',
    body: 'Problem confirmed. Cause not localised. Manual review recommended.',
    glyph: 'magnifier',
    tint: 'var(--paper-2)',
    ink: 'var(--body)',
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
    <div
      className={[styles.note, className].filter(Boolean).join(' ')}
      style={{ background: note.tint }}
    >
      <Glyph kind={note.glyph} colour={note.ink} />
      <div className={styles.text}>
        <p className={styles.title}>{note.title}</p>
        <p className={styles.body}>{note.body}</p>
        {UNBUILT.has(state) && <p className={styles.unbuilt}>{UNBUILT_LABEL}</p>}
      </div>
    </div>
  );
}

/** One glyph per state, so the four are told apart without reading the
 *  heading, and without colour doing the work alone. */
function Glyph({ kind, colour }: { kind: Glyph; colour: string }) {
  const common = {
    fill: 'none',
    stroke: colour,
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" className={styles.icon}>
      {kind === 'warning' && (
        <>
          <path d="M8 1.9 L15 14.1 L1 14.1 Z" {...common} />
          <path d="M8 6.2 L8 9.8" {...common} />
          <circle cx="8" cy="11.9" r="0.85" fill={colour} />
        </>
      )}
      {kind === 'sparkle' && (
        <>
          <path d="M6.2 1.5 L7.5 5 L11 6.3 L7.5 7.6 L6.2 11.1 L4.9 7.6 L1.4 6.3 L4.9 5 Z" {...common} />
          <path d="M12 9.4 L12.7 11.3 L14.6 12 L12.7 12.7 L12 14.6 L11.3 12.7 L9.4 12 L11.3 11.3 Z" {...common} />
        </>
      )}
      {kind === 'info' && (
        <>
          <circle cx="8" cy="8" r="6.6" {...common} />
          <circle cx="8" cy="4.7" r="0.9" fill={colour} />
          <path d="M8 7.1 L8 11.5" {...common} />
        </>
      )}
      {kind === 'magnifier' && (
        <>
          <circle cx="6.8" cy="6.8" r="4.8" {...common} />
          <path d="M10.4 10.4 L14.3 14.3" {...common} />
        </>
      )}
    </svg>
  );
}
