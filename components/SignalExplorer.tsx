'use client';

import { useState } from 'react';
import { FindingCard } from './FindingCard';
import { ATTENTION, URGENCY, type Attention, type BoardUrgency, type Confidence } from './signals';
import styles from './SignalExplorer.module.css';

const ATTENTIONS: Attention[] = [
  'immediate',
  'watch',
  'on-track',
  'investigation-required',
  'insufficient-evidence',
];
const URGENCIES: BoardUrgency[] = ['very-high', 'high', 'medium', 'low'];
const CONFIDENCES: Confidence[] = ['high', 'medium', 'emerging'];

/* Board recurrence follows the level, per the table in CLAUDE.md: very high is
   4/4 years down to low at 1/4. Not an independent control, because the years
   figure is what the level means, not a fourth axis. */
const YEARS_FOR_LEVEL: Record<BoardUrgency, 1 | 2 | 3 | 4> = {
  'very-high': 4,
  high: 3,
  medium: 2,
  low: 1,
};

const CONFIDENCE_LABEL: Record<Confidence, string> = {
  high: 'High',
  medium: 'Medium',
  emerging: 'Emerging',
};

/*
 * The Physics · Electricity finding, held fixed while the three toggles move.
 * Only Insufficient evidence changes the body: everywhere else the type
 * system would let a confirmed-sounding suggested action sit under a pill
 * that says no problem is confirmed, which is the exact contradiction the
 * five-value attention scale exists to prevent.
 */
const FINDING = {
  subject: 'Physics',
  chapter: 'Electricity',
  competency: 'Numericals',
  studentsAffected: { scope: 'count' as const, affected: 122, outOf: 240 },
  avgMarksLost: { scope: 'student' as const, marks: 3.8 },
};

export function SignalExplorer() {
  const [attention, setAttention] = useState<Attention>('immediate');
  const [urgency, setUrgency] = useState<BoardUrgency>('very-high');
  const [confidence, setConfidence] = useState<Confidence>('high');

  return (
    <div className={styles.explorer}>
      <div className={styles.controls}>
        <fieldset className={styles.group}>
          <legend className={styles.legend}>Board urgency</legend>
          <div className={styles.pills}>
            {URGENCIES.map((level) => (
              <label
                key={level}
                className={level === urgency ? `${styles.pill} ${styles.pillOn}` : styles.pill}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={level}
                  checked={level === urgency}
                  onChange={() => setUrgency(level)}
                  className={styles.input}
                />
                {URGENCY[level].label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.legend}>Confidence</legend>
          <div className={styles.pills}>
            {CONFIDENCES.map((level) => (
              <label
                key={level}
                className={
                  level === confidence ? `${styles.pill} ${styles.pillOn}` : styles.pill
                }
              >
                <input
                  type="radio"
                  name="confidence"
                  value={level}
                  checked={level === confidence}
                  onChange={() => setConfidence(level)}
                  className={styles.input}
                />
                {CONFIDENCE_LABEL[level]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.legend}>Attention</legend>
          <div className={styles.pills}>
            {ATTENTIONS.map((value) => (
              <label
                key={value}
                className={
                  value === attention ? `${styles.pill} ${styles.pillOn}` : styles.pill
                }
              >
                <input
                  type="radio"
                  name="attention"
                  value={value}
                  checked={value === attention}
                  onChange={() => setAttention(value)}
                  className={styles.input}
                />
                {ATTENTION[value].label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <p className={styles.hint} aria-live="polite">
        Move any one control. The other two hold still, because they are
        answering different questions.
      </p>

      <div className={styles.card}>
        <FindingCard
          {...FINDING}
          signals={{
            attention,
            urgency: { level: urgency, years: YEARS_FOR_LEVEL[urgency] },
            confidence,
          }}
          body={
            attention === 'insufficient-evidence'
              ? {
                  kind: 'observation-only',
                  observation:
                    'Not enough of this competency was tested in this assessment to confirm whether a pattern exists.',
                }
              : {
                  kind: 'observation',
                  observation:
                    'Students consistently lose marks converting the concept into a numerical answer, though the underlying law is generally understood.',
                  action: 'numerical-practice drill sets, worked-example walkthroughs',
                }
          }
        />
      </div>
    </div>
  );
}
