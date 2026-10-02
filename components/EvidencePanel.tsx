import styles from "./EvidencePanel.module.css";
import { AttainmentBar } from "./AttainmentBar";
import { EvidenceNote } from "./EvidenceNote";
import type { BarTone, EvidenceState } from "./types";

type EvidenceRow = {
  label: string;
  result: string;
};

type SectionRow = {
  label: string;
  percent: number;
  value: string;
  tone: BarTone;
};

type EvidencePanelProps = {
  questions: EvidenceRow[];
  conclusion: string;
  sections?: SectionRow[];
  sectionsLabel?: string;
  note?: EvidenceState;
  noteDetail?: string;
};

/** Per-question breakdown plus a per-section bar chart. */
export function EvidencePanel({
  questions,
  conclusion,
  sections,
  sectionsLabel = "Students affected, by section",
  note,
  noteDetail,
}: EvidencePanelProps) {
  return (
    <div className={styles.evid}>
      <p className={styles.label}>Evidence from this paper</p>
      <ul className={styles.list}>
        {questions.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <b>{row.result}</b>
          </li>
        ))}
      </ul>
      <div className={styles.concl}>{conclusion}</div>

      {sections && sections.length > 0 ? (
        <>
          <p className={styles.sectionHead}>{sectionsLabel}</p>
          <div className={styles.bars}>
            {sections.map((row) => (
              <AttainmentBar
                key={row.label}
                label={row.label}
                percent={row.percent}
                value={row.value}
                tone={row.tone}
              />
            ))}
          </div>
        </>
      ) : null}

      {note ? <EvidenceNote className={styles.note} state={note} detail={noteDetail} /> : null}
    </div>
  );
}
