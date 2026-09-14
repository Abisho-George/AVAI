'use client';

import { useState } from 'react';
import { AttainmentBar } from './AttainmentBar';
import { FindingCard } from './FindingCard';
import { StudentReportCard } from './StudentReportCard';
import styles from './RoleSwitcher.module.css';

type Role = 'principal' | 'teacher' | 'student';

const ROLES: { id: Role; label: string; tagline: string; scope: string[] }[] = [
  {
    id: 'principal',
    label: 'Principal',
    tagline: 'Sees cost, urgency and spread',
    scope: [
      'Every standard, every section, every subject',
      'Marks exposure and Board urgency',
      'Section comparison, with its non-attribution note',
      'Ranked intervention plan across the whole cohort',
    ],
  },
  {
    id: 'teacher',
    label: 'Teacher',
    tagline: 'Sees their own scope, and can act',
    scope: [
      'Their section, their subjects, nothing wider',
      'The same finding, clipped to their students',
      'Issue a report, then share it as a separate act',
      'No school-wide view, no cross-teacher comparison',
    ],
  },
  {
    id: 'student',
    label: 'Student',
    tagline: 'Sees one report, and nobody else',
    scope: [
      'Only reports a teacher has explicitly shared',
      'Opened with a one-time PIN, generated at the moment of sharing',
      'No classmates, no rank, no percentile, no class average',
      'No share or compare affordance anywhere on the screen',
    ],
  },
];

export function RoleSwitcher() {
  const [role, setRole] = useState<Role>('principal');

  return (
    <div className={styles.switcher}>
      <div className={styles.tabs} role="tablist" aria-label="View as">
        {ROLES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={role === item.id}
            className={role === item.id ? `${styles.tab} ${styles.tabOn}` : styles.tab}
            onClick={() => setRole(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.body} role="tabpanel">
        <div className={styles.copy}>
          <h2 className={styles.tagline}>
            {ROLES.find((r) => r.id === role)?.tagline}
          </h2>
          <ul className={styles.scope}>
            {ROLES.find((r) => r.id === role)?.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.demo}>
          {role === 'principal' && (
            <div className={styles.stack}>
              <FindingCard
                subject="Mathematics"
                chapter="Quadratic Equations"
                competency="Application problems"
                studentsAffected={{ scope: 'count', affected: 146, outOf: 240 }}
                avgMarksLost={{ scope: 'student', marks: 4.2 }}
                signals={{
                  attention: 'immediate',
                  urgency: { level: 'very-high', years: 4 },
                  confidence: 'high',
                }}
                body={{
                  kind: 'observation',
                  observation:
                    '61% of analysed students demonstrate the underlying concept but lose marks when it appears in application-style questions.',
                  action: 'application-focused revision, Board-style question practice',
                }}
                compact
              />
              <div className={styles.bars}>
                <AttainmentBar
                  label="X-A"
                  value={{ scope: 'share', percent: 41, of: 'the section' }}
                  polarity="higher-is-worse"
                />
                <AttainmentBar
                  label="X-B"
                  value={{ scope: 'share', percent: 66, of: 'the section' }}
                  polarity="higher-is-worse"
                />
                <AttainmentBar
                  label="X-D"
                  value={{ scope: 'share', percent: 72, of: 'the section' }}
                  polarity="higher-is-worse"
                />
              </div>
              <p className={styles.note}>
                A section gap describes tested performance on this assessment
                only. It is not a measure of teaching quality, and Avai does not
                attribute it to any teacher.
              </p>
            </div>
          )}

          {role === 'teacher' && (
            <div className={styles.stack}>
              <FindingCard
                subject="Mathematics · X-A"
                chapter="Quadratic Equations"
                competency="Application problems"
                studentsAffected={{ scope: 'count', affected: 29, outOf: 48, noun: 'students' }}
                avgMarksLost={{ scope: 'student', marks: 4.1 }}
                signals={{
                  attention: 'immediate',
                  urgency: { level: 'very-high', years: 4 },
                  confidence: 'high',
                }}
                body={{
                  kind: 'observation',
                  observation:
                    'Your students demonstrate the concept but lose marks when it appears in application-style questions.',
                  action: 'application-focused revision',
                }}
                compact
              />
              <div className={styles.chips}>
                <span className={styles.chip}>Issue report</span>
                <span className={styles.chip}>Share with student</span>
              </div>
            </div>
          )}

          {role === 'student' && (
            <div className={styles.stack}>
              <StudentReportCard
                studentName="Aditi R."
                assessment="Mathematics · Term 2"
                score={{ scope: 'score', marks: 78, outOf: 80 }}
                trend="up"
                line="Your recall answers held up. The marks you lost were on application-style quadratic equations."
                strengths={['Recall-based questions', 'Basic algebra']}
                focus={['Quadratic equations, application-style questions']}
              />
              <p className={styles.note}>
                On a flat result the tone drops to neutral and the trend arrow
                goes sideways. Avai never celebrates a result that does not
                warrant it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
