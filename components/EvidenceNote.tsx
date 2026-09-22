import styles from "./EvidenceNote.module.css";
import type { EvidenceState } from "./types";

type StateConfig = {
  tone: "neu" | "warn" | "info";
  icon: string;
  title: string;
  /** Copy verbatim from CLAUDE.md. Render as calm information, never an error. */
  defaultDetail: string;
};

const STATES: Record<EvidenceState, StateConfig> = {
  "cause-not-localised": {
    tone: "neu",
    icon: "⚒",
    title: "Cause not localised",
    defaultDetail: "Problem confirmed. Cause not localised. Manual review recommended.",
  },
  "paper-under-tests": {
    tone: "warn",
    icon: "⚠",
    title: "Paper under-tests this area",
    defaultDetail:
      "This assessment included too few application questions to confidently assess application readiness.",
  },
  "early-signal": {
    tone: "warn",
    icon: "✦",
    title: "Early signal",
    defaultDetail:
      "A possible pattern is visible, but there is not yet enough evidence for a strong conclusion.",
  },
  "trend-not-available": {
    tone: "info",
    icon: "ℹ",
    title: "Trend not yet available",
    defaultDetail:
      "Trend and consistency insights require at least one additional analysed assessment.",
  },
};

type EvidenceNoteProps = {
  state: EvidenceState;
  /** Overrides the default copy for this context, e.g. citing the specific shortfall. */
  detail?: string;
  className?: string;
};

/** The four limited-evidence states. Soft border, never red, never an error. */
export function EvidenceNote({ state, detail, className }: EvidenceNoteProps) {
  const config = STATES[state];
  return (
    <div className={[styles.note, styles[config.tone], className].filter(Boolean).join(" ")}>
      <span className={styles.icon} aria-hidden="true">
        {config.icon}
      </span>
      <div>
        <span className={styles.title}>{config.title}</span>
        <span className={styles.desc}>{detail ?? config.defaultDetail}</span>
      </div>
    </div>
  );
}
