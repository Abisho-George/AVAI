import { AttainmentBar } from './AttainmentBar';
import {
  SECTION_NON_ATTRIBUTION,
  formatShare,
  type Share,
} from './signals';
import styles from './EvidencePanel.module.css';

export type QuestionEvidence = {
  /** "Q7 · 3 marks" or "Concept MCQ Q2". Never the question text itself. */
  ref: string;
  reading: Share;
};

export type SectionEvidence = { section: string; affected: Share };

export type EvidencePanelProps = {
  questions: QuestionEvidence[];
  sections: SectionEvidence[];
};

/**
 * The per-question reading and the per-section spread behind one finding.
 * Question text is never reproduced on the public site, so each row is a
 * reference and a reading.
 *
 * The section chart is always higher-is-worse: the value is the share of
 * students affected. It always carries the non-attribution note.
 */
export function EvidencePanel({ questions, sections }: EvidencePanelProps) {
  return (
    <div className={styles.panel}>
      <section>
        <h4 className={styles.heading}>Evidence from this paper</h4>
        <ul className={styles.questions}>
          {questions.map((question) => (
            <li key={question.ref} className={styles.question}>
              <span className={styles.ref}>{question.ref}</span>
              <span className={styles.reading}>{formatShare(question.reading)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className={styles.heading}>Students affected, by section</h4>
        <div className={styles.bars}>
          {sections.map((section) => (
            <AttainmentBar
              key={section.section}
              label={section.section}
              value={section.affected}
              polarity="higher-is-worse"
            />
          ))}
        </div>
        <p className={styles.note}>{SECTION_NON_ATTRIBUTION}</p>
      </section>
    </div>
  );
}
