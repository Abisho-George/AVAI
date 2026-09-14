import { CtaBand } from '../../components/CtaBand';
import { EvidenceNote } from '../../components/EvidenceNote';
import { FindingCard } from '../../components/FindingCard';
import { PageHeader } from '../../components/PageHeader';
import { ConfidenceMeter } from '../../components/ConfidenceMeter';
import styles from './findings.module.css';

export const metadata = {
  title: 'What Avai finds — Avai',
  description:
    'A finding is always the same unit: what it costs, how urgent it is for the Board, and how sure Avai is that the pattern is real.',
};

const RISK_GROUPS = [
  {
    name: 'High potential gap',
    count: '34 students',
    confidence: 'high' as const,
    body: 'Close to the next attainment band. They know the concept but lose application marks. The smallest intervention here produces the largest movement in Board marks.',
    foot: 'Top blockers: Mathematics application, Physics numericals',
  },
  {
    name: 'High academic risk',
    count: '28 students',
    confidence: 'medium' as const,
    body: 'Repeated loss across several tested areas rather than one identifiable blocker. Needs sustained support, not a targeted drill.',
  },
];

export default function Findings() {
  return (
    <main>
      <PageHeader
        eyebrow="What Avai finds"
        title="Lost marks are lost Board potential"
        lede="Avai's output is not a score and not a dashboard. It is a set of findings. A finding is always the same unit, never a bare statistic, and it always carries what it costs, how urgent it is, and how sure we are."
      />

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.lead}>
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
                  '61% of analysed students demonstrate the underlying concept but lose marks when the same concept appears in application-style questions.',
                action: 'application-focused revision, Board-style question practice',
              }}
            />
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>Marks loss intelligence</h2>
          <p className={styles.body}>
            The first screen a principal sees after opening an assessment.
            Findings are ranked by what they are costing, not by how bad the
            average looks.
          </p>

          <div className={styles.cards}>
            <FindingCard
              subject="Physics"
              chapter="Electricity"
              competency="Numericals"
              studentsAffected={{ scope: 'count', affected: 122, outOf: 240 }}
              avgMarksLost={{ scope: 'student', marks: 3.8 }}
              signals={{
                attention: 'immediate',
                urgency: { level: 'high', years: 3 },
                confidence: 'high',
              }}
              body={{
                kind: 'observation',
                observation:
                  'Students consistently lose marks converting the concept into a numerical answer, though the underlying law is generally understood.',
                action: 'numerical-practice drill sets',
              }}
            />

            <FindingCard
              subject="Physics"
              chapter="Light"
              competency="Whole chapter, no single sub-skill"
              studentsAffected={{ scope: 'count', affected: 84, outOf: 240 }}
              avgMarksLost={{ scope: 'student', marks: 2.7 }}
              signals={{
                attention: 'investigation-required',
                urgency: { level: 'high', years: 3 },
                confidence: 'high',
              }}
              body={{ kind: 'note', note: { state: 'cause-not-localised' } }}
            />
          </div>

          {/*
            Cause not localised is designed and not yet running, so this reads
            in the conditional. The card itself carries the plain caption.
          */}
          <p className={styles.note}>
            Note the second card. The problem is real and high-confidence, and
            when Avai cannot localise a cause it will decline to name one. The
            finding will be routed to investigation rather than given an
            intervention it has not earned.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>Two groups, named carefully</h2>
          <p className={styles.body}>
            Avai splits students who need attention into two groups that need
            completely different responses. Neither is ever called "weak
            students", and each carries its own confidence value.
          </p>

          <div className={styles.groups}>
            {RISK_GROUPS.map((group) => (
              <div key={group.name} className={styles.group}>
                {/* A group is not a finding, so it carries no attention
                    value: attention answers what to do about a finding. */}
                <ConfidenceMeter confidence={group.confidence} />
                <h3 className={styles.groupName}>
                  {group.name} · {group.count}
                </h3>
                <p className={styles.groupBody}>{group.body}</p>
                {group.foot && <p className={styles.groupFoot}>{group.foot}</p>}
              </div>
            ))}
          </div>

          <div className={styles.singleNote}>
            <EvidenceNote state="early-signal" />
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>What should the school act on now?</h2>
          {/*
            The priority score is backend work, so the ranking is described as
            designed rather than as running, and the table carries the caption.
          */}
          <p className={styles.body}>
            Priority will combine student impact, marks exposure, Board
            recurrence and confidence. A confirmed problem without a localised
            cause will be routed to investigation rather than given an
            intervention it has not earned.
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Priority</th>
                  <th scope="col">Finding</th>
                  <th scope="col">Why it ranks here</th>
                  <th scope="col">Urgency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    Maths · Quadratic Equations
                    <span className={styles.sub}>Application problems</span>
                  </td>
                  <td>
                    Large number affected, meaningful marks exposure, strong
                    Board recurrence, high-confidence evidence
                  </td>
                  <td>Very high</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    Physics · Electricity
                    <span className={styles.sub}>Numericals</span>
                  </td>
                  <td>
                    High student impact and strong, consistent Board recurrence
                  </td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>Investigate</td>
                  <td>
                    Physics · Light
                    <span className={styles.sub}>Whole chapter</span>
                  </td>
                  <td>
                    Problem confirmed, cause not localised, manual review
                    recommended first
                  </td>
                  <td>High</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.caption}>
            Designed. Not yet running in the current build.
          </p>
        </div>
      </section>

      <CtaBand
        title="See it on your own students"
        body="One question paper, one mark register. We return the findings."
        action={{ href: '/contact', label: 'Request a pilot' }}
        secondary={{ href: '/how-it-works', label: 'How Avai reasons' }}
      />
    </main>
  );
}
