import { CtaBand } from '../../components/CtaBand';
import { FindingCard } from '../../components/FindingCard';
import { PageHeader } from '../../components/PageHeader';
import { Reveal } from '../../components/Reveal';
import { StudentReportCard } from '../../components/StudentReportCard';
import styles from './how.module.css';

export const metadata = {
  title: 'How it works — Avai',
  description:
    'Send the question paper and the marks from an exam you already ran. Avai sends back a report for every student, and one dashboard for the principal.',
};

/* The scorecard as a teacher hands it over. Shown, not explained. */
const MARKS = [
  '2/2', '3/3', '1/1', '2/2', '3/4', '2/2',
  '1/3', '3/3', '2/2', '4/4', '2/3', '1/4',
];

export default function HowItWorks() {
  return (
    <main>
      <PageHeader
        eyebrow="How it works"
        title="Send the paper. Avai sends back the reports."
        lede="The exam you already ran is all Avai needs. No new tests to set, and nothing for teachers to do beyond the marks they already enter."
      />

      <section className={styles.steps}>
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.step}>
              <div className={styles.stepText}>
                <span className={styles.stepN}>1</span>
                <h2 className={styles.stepTitle}>
                  Send the question paper and the marks
                </h2>
                <p className={styles.stepBody}>
                  The exam you already ran, and the marks your teachers already
                  entered.
                </p>
              </div>
              <div className={styles.stepVisual}>
                <div className={styles.paper}>
                  <p className={styles.paperHead}>Unit Test 2 · Class X · Mathematics</p>
                  <div className={styles.grid}>
                    {MARKS.map((mark, index) => (
                      <span key={index} className={styles.cell}>
                        <span className={styles.cellQ}>Q{index + 1}</span>
                        <span className={`${styles.cellMark} tnum`}>{mark}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className={styles.step}>
              <div className={styles.stepText}>
                <span className={styles.stepN}>2</span>
                <h2 className={styles.stepTitle}>Avai analyses it</h2>
                <p className={styles.stepBody}>
                  Nothing else is required from the school. No new exam, no
                  software for teachers to learn, about an hour of their time per
                  paper.
                </p>
              </div>
              <div className={styles.stepVisual}>
                <div className={styles.flow} aria-hidden="true">
                  <span className={styles.flowDot} />
                  <span className={styles.flowLine} />
                  <span className={styles.flowDot} />
                  <span className={styles.flowLine} />
                  <span className={styles.flowDot} />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className={styles.step}>
              <div className={styles.stepText}>
                <span className={styles.stepN}>3</span>
                <h2 className={styles.stepTitle}>Reports appear</h2>
                <p className={styles.stepBody}>
                  One for every student, in plain language. And a single
                  dashboard where the principal sees every class, section and
                  subject.
                </p>
              </div>
              <div className={styles.stepVisual}>
                <div className={styles.outcomes}>
                  <StudentReportCard
                    studentName="Aditi R."
                    assessment="Mathematics · Term 2"
                    score={{ scope: 'score', marks: 78, outOf: 80 }}
                    trend="up"
                    line="Your recall answers held up. The marks you lost were on application-style quadratic equations."
                    strengths={['Recall-based questions', 'Basic algebra']}
                    focus={['Quadratic equations, application-style questions']}
                  />
                  <FindingCard
                    subject="Mathematics"
                    chapter="Quadratic Equations"
                    competency="Application problems"
                    studentsAffected={{ scope: 'count', affected: 146, outOf: 240 }}
                    avgMarksLost={{ scope: 'student', marks: 4.2 }}
                    signals={{ attention: 'immediate' }}
                    body={{
                      kind: 'observation',
                      observation:
                        '61% of analysed students demonstrate the underlying concept but lose marks when it appears in application-style questions.',
                      action: 'application-focused revision, Board-style question practice',
                    }}
                    compact
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.wrap}>
          <Reveal>
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt className={styles.statFigure}>0</dt>
                <dd className={styles.statLabel}>new exams a school has to write</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statFigure}>~1 hr</dt>
                <dd className={styles.statLabel}>of teacher time per exam</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statFigure}>1</dt>
                <dd className={styles.statLabel}>login for the whole school</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="See it on your own students"
        body="One question paper, one mark register. We return the findings."
        action={{ href: '/contact', label: 'Request a pilot' }}
        secondary={{ href: '/findings', label: 'What Avai finds' }}
      />
    </main>
  );
}
