import Link from 'next/link';
import { AttainmentBar } from '../components/AttainmentBar';
import { CtaBand } from '../components/CtaBand';
import { SignalExplorer } from '../components/SignalExplorer';
import { HeroLoop } from '../components/HeroLoop';
import styles from './page.module.css';

export const metadata = {
  title: 'Avai — what is stopping students from scoring higher?',
  description:
    'Avai reads question-wise marks from the exams a school already runs and names the competency costing students marks, how urgent it is for the Board, and how sure it is.',
};

const REGISTER = [
  { label: 'Mathematics', value: 42 },
  { label: 'Science', value: 49 },
  { label: 'Social Science', value: 63 },
];

const TIERS = [
  { label: 'Recall tier', value: 88 },
  { label: 'Understanding tier', value: 74 },
  { label: 'Application tier', value: 31 },
  { label: '…same in Science', value: 34 },
  { label: '…but not Social Sci.', value: 81 },
];

/*
 * The honesty argument rests on the three states that are built and running.
 * The static site led with Cause not localised and carried No dominant common
 * blocker third; both are backend work, so neither leads here. They keep their
 * designed shapes on /how-it-works, with the caption that says so.
 */
const HONESTY = [
  {
    title: 'Trend not yet available',
    body: 'One analysed assessment is one data point. Avai says so, and holds back trend and consistency insights until a second assessment has been analysed rather than drawing a line through a single mark.',
  },
  {
    title: 'Paper under-tests this area',
    body: 'Avai will criticise your own question paper. If a test carried too few application questions to judge application readiness, it says so and marks every related finding as lower-strength.',
  },
  {
    title: 'Early signal',
    body: 'When a pattern is visible but the evidence behind it is thin, the finding is published as an early signal rather than promoted to a conclusion it has not earned.',
  },
  {
    title: 'Section gaps are never teaching quality',
    body: 'Section comparisons carry an explicit non-attribution note. Avai describes tested performance on one assessment. It does not evaluate teachers, and it never will.',
  },
];

const PILOT = [
  { figure: '5', label: 'CBSE schools, onboarded one per week' },
  { figure: 'X & XII', label: 'Board-examination years' },
  { figure: '0', label: 'new exams a school has to write' },
  { figure: '~1 hr', label: 'of teacher time per exam' },
];

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>
              A diagnostic layer on the exams you already run
            </p>
            <h1 className={styles.h1}>
              What is stopping students from scoring higher?
            </h1>
            <p className={styles.lede}>
              Avai reads question-wise marks against a Board-mapped question
              paper and names the competency costing your students marks: how
              many it affects, how urgent it is for the Board, and how sure we
              are.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primary} href="/contact">
                Request a pilot
              </Link>
              <Link className={styles.ghost} href="/findings">
                See a sample finding
              </Link>
            </div>
            <p className={styles.running}>
              Running now in 5 CBSE schools across Krishnagiri district, Tamil
              Nadu.
            </p>
          </div>
          <div className={styles.heroLoop}>
            <HeroLoop />
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>Lost marks are lost Board potential</h2>
          <p className={styles.body}>
            A report card tells you a student scored 42 out of 80. It does not
            tell you that all 38 lost marks were application questions, that the
            same pattern shows up in Science but not in Social Science, or that
            the competency behind it has appeared in four of the last four Board
            papers.
          </p>

          <div className={styles.compare}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>What a mark register says</h3>
              <table className={styles.register}>
                <tbody>
                  {REGISTER.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.value}/80</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={styles.conclusion}>
                Conclusion available: <em>needs more practice in Maths.</em>
              </p>
            </div>

            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>What Avai says</h3>
              <div className={styles.bars}>
                {TIERS.map((tier) => (
                  <AttainmentBar
                    key={tier.label}
                    label={tier.label}
                    value={{
                      scope: 'share',
                      percent: tier.value,
                      of: 'the tested marks in this tier',
                    }}
                    polarity="higher-is-better"
                  />
                ))}
              </div>
              <p className={styles.conclusion}>
                Conclusion available:{' '}
                <em>a transferable application gap.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>
            Three signals that never collapse into one colour
          </h2>
          <p className={styles.body}>
            Most dashboards merge everything into a single red-amber-green. Avai
            keeps them apart, because "this matters a lot for the Board" and "we
            are sure this is real" are different claims, and a principal
            deserves to see when they disagree. Change any one control below.
            The other two hold still.
          </p>

          <SignalExplorer />
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>
            The unusual part: Avai tells you when it doesn't know
          </h2>
          <p className={styles.body}>
            Every analytics product you have been shown produces an answer for
            every question. That is a design choice, and it is the wrong one. A
            confident wrong diagnosis costs a school a term.
          </p>

          <div className={styles.honesty}>
            {HONESTY.map((item) => (
              <div key={item.title} className={styles.honestyCard}>
                <h3 className={styles.honestyTitle}>{item.title}</h3>
                <p className={styles.honestyBody}>{item.body}</p>
              </div>
            ))}
          </div>

          <p className={styles.footnote}>
            Two further states are designed and not yet running in the current
            build. They are shown, and labelled as such, on{' '}
            <Link href="/how-it-works">How Avai reasons</Link>.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>Running now in Krishnagiri</h2>
          <dl className={styles.stats}>
            {PILOT.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statFigure}>{stat.figure}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
          <blockquote className={styles.quote}>
            <p>
              The District Collector has expressed support for a free
              diagnostics and scholarship programme in government schools across
              the district.
            </p>
            <footer>Thiru C. Dinesh Kumar, District Collector, Krishnagiri</footer>
          </blockquote>
        </div>
      </section>

      <CtaBand
        title="Bring Avai to your school"
        body="Send us one question paper and one mark register. We will send back the findings from your own students."
        action={{ href: '/contact', label: 'Request a pilot' }}
        secondary={{ href: '/pilot', label: 'What a pilot involves' }}
        mascot
      />
    </main>
  );
}
