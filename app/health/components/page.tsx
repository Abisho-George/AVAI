import type { Metadata } from 'next';
import { AttainmentBar } from '../../../components/AttainmentBar';
import { EvidenceNote } from '../../../components/EvidenceNote';
import { EvidencePanel } from '../../../components/EvidencePanel';
import { FindingCard } from '../../../components/FindingCard';
import { SignalCluster } from '../../../components/SignalCluster';
import { StudentReportCard } from '../../../components/StudentReportCard';
import type { Attention, BoardUrgency, Confidence, Share } from '../../../components/signals';
import styles from './components.module.css';

export const metadata: Metadata = {
  title: 'Components · Avai',
  robots: { index: false, follow: false },
};

const share = (percent: number, of: string): Share => ({ scope: 'share', percent, of });

const ATTENTIONS: Attention[] = [
  'immediate',
  'watch',
  'on-track',
  'investigation-required',
  'insufficient-evidence',
];
const URGENCIES: BoardUrgency[] = ['very-high', 'high', 'medium', 'low'];
const CONFIDENCES: Confidence[] = ['high', 'medium', 'emerging'];

/* Demo figures come from reference/static-site and are listed in the approved
   facts in CLAUDE.md. Nothing here is invented. */
const MATHS = {
  subject: 'Mathematics',
  chapter: 'Quadratic Equations',
  competency: 'Application problems',
  studentsAffected: { scope: 'count', affected: 146, outOf: 240 },
  avgMarksLost: { scope: 'student', marks: 4.2 },
} as const;

const ELECTRICITY = {
  subject: 'Physics',
  chapter: 'Electricity',
  competency: 'Numericals',
  studentsAffected: { scope: 'count', affected: 122, outOf: 240 },
  avgMarksLost: { scope: 'student', marks: 3.8 },
} as const;

const LIGHT = {
  subject: 'Physics',
  chapter: 'Light',
  competency: 'Whole chapter, no single sub-skill',
  studentsAffected: { scope: 'count', affected: 84, outOf: 240 },
  avgMarksLost: { scope: 'student', marks: 2.7 },
} as const;

function Block({
  title,
  lede,
  children,
  band,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
  band?: boolean;
}) {
  return (
    <section className={band ? `${styles.block} ${styles.band}` : styles.block}>
      <h2>{title}</h2>
      {lede && <p className={styles.lede}>{lede}</p>}
      {children}
    </section>
  );
}

export default function ComponentsHealth() {
  return (
    <main className={styles.page}>
      <header>
        <h1>Components</h1>
        <p className={styles.lede}>
          Every display component in every state, including the awkward ones.
          Figures are the approved demo data. Not linked from the site and not
          indexed.
        </p>
      </header>

      <Block
        title="SignalCluster"
        lede="Three independent signals. Attention is a solid pill with no glyph, Board urgency an outlined chip with a flame, confidence a three-dot meter."
      >
        <h3 className={styles.sub}>All five attention values</h3>
        <div className={styles.stack}>
          {ATTENTIONS.map((attention) => (
            <SignalCluster key={attention} attention={attention} />
          ))}
        </div>

        <h3 className={styles.sub}>All four Board urgency levels</h3>
        <div className={styles.stack}>
          {URGENCIES.map((level, index) => (
            <SignalCluster
              key={level}
              attention="watch"
              urgency={{ level, years: (4 - index) as 1 | 2 | 3 | 4 }}
            />
          ))}
        </div>

        <h3 className={styles.sub}>All three confidence levels</h3>
        <div className={styles.stack}>
          {CONFIDENCES.map((confidence) => (
            <SignalCluster key={confidence} attention="watch" confidence={confidence} />
          ))}
        </div>

        <h3 className={styles.sub}>The disagreement case</h3>
        <p className={styles.lede}>
          Very high urgency on emerging confidence. The Board will almost
          certainly test this; Avai does not yet know whether this cohort has a
          problem with it. Nothing reconciles the two.
        </p>
        <div className={styles.stack}>
          <SignalCluster
            attention="insufficient-evidence"
            urgency={{ level: 'very-high', years: 4 }}
            confidence="emerging"
          />
        </div>

        <h3 className={styles.sub}>Urgency and confidence absent</h3>
        <p className={styles.lede}>
          Nothing renders in their place. A grey placeholder chip would state
          something Avai does not know.
        </p>
        <div className={styles.stack}>
          <SignalCluster attention="on-track" />
        </div>
      </Block>

      <Block
        title="FindingCard"
        lede="Never a bare stat: every figure carries its denominator or unit, and the unit comes off the measure type rather than the call site."
      >
        <div className={styles.cards}>
          <FindingCard
            {...MATHS}
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
            href="#"
          />

          <FindingCard
            {...ELECTRICITY}
            signals={{
              attention: 'immediate',
              urgency: { level: 'high', years: 3 },
              confidence: 'high',
            }}
            body={{
              kind: 'observation',
              observation:
                'Students consistently lose marks converting the concept into a numerical answer, though the underlying law is generally understood.',
              action: 'numerical-practice drill sets, worked-example walkthroughs',
            }}
            notes={[{ state: 'trend-not-available' }]}
          />

          <FindingCard
            {...LIGHT}
            signals={{
              attention: 'investigation-required',
              urgency: { level: 'high', years: 3 },
              confidence: 'high',
            }}
            body={{ kind: 'note', note: { state: 'cause-not-localised' } }}
          />

          <FindingCard
            {...ELECTRICITY}
            signals={{ attention: 'insufficient-evidence' }}
            body={{
              kind: 'observation',
              observation:
                'Not enough of this competency was tested in this assessment to confirm whether a pattern exists.',
            }}
          />
        </div>
        <p className={styles.lede}>
          Card three is the Light card: the note replaces the observation and
          the suggested action, and the type makes a Light card with an action
          impossible to construct. Card four is the Insufficient evidence
          shape, which is a different thing: no note, no urgency, no
          confidence, an observation and no suggested action, because nothing
          has been confirmed that an intervention could answer. It reuses the
          Electricity figures rather than inventing a fourth finding.
        </p>
      </Block>

      <Block
        title="FindingCard on a band"
        lede="The same cards on --paper-2, where the unbordered neutral pill and the neutral note tint are at risk of disappearing into the surface."
        band
      >
        <div className={styles.cards}>
          <FindingCard
            {...LIGHT}
            signals={{
              attention: 'investigation-required',
              urgency: { level: 'high', years: 3 },
              confidence: 'high',
            }}
            body={{ kind: 'note', note: { state: 'cause-not-localised' } }}
          />
          <FindingCard
            {...ELECTRICITY}
            signals={{ attention: 'insufficient-evidence' }}
            body={{
              kind: 'observation',
              observation:
                'Not enough of this competency was tested in this assessment to confirm whether a pattern exists.',
            }}
          />
          <div className={styles.stack}>
            <EvidenceNote state="trend-not-available" />
            <EvidenceNote state="paper-under-tests" />
            <EvidenceNote state="early-signal" />
            <EvidenceNote state="cause-not-localised" />
          </div>
        </div>
      </Block>

      <Block
        title="EvidenceNote"
        lede="Four states, calm information, never red. Cause not localised carries its own unbuilt caption; the component adds it, not the caller."
      >
        <div className={styles.notes}>
          <EvidenceNote state="trend-not-available" />
          <EvidenceNote state="paper-under-tests" />
          <EvidenceNote state="early-signal" />
          <EvidenceNote state="cause-not-localised" />
        </div>
      </Block>

      <Block
        title="AttainmentBar"
        lede="Four bands, boundaries at 60 and 80, full mastery its own band. Fill colour comes from the band, never from a call site."
      >
        <h3 className={styles.sub}>higher-is-better: class attainment</h3>
        <div className={styles.bars}>
          {[100, 88, 72, 61, 47, 0].map((percent) => (
            <AttainmentBar
              key={percent}
              label={`${percent}% attainment`}
              value={share(percent, 'tested Board marks')}
              polarity="higher-is-better"
            />
          ))}
        </div>

        <h3 className={styles.sub}>higher-is-worse: students affected</h3>
        <p className={styles.lede}>
          The opposite meaning, on its own five-band scale. X-A at 41% and
          X-D at 72% have to separate: the section chart exists so a principal
          can compare sections, and one where the best and the worst paint
          identically has failed at that.
        </p>
        <div className={styles.bars}>
          {[72, 55, 41, 28, 12, 0].map((percent) => (
            <AttainmentBar
              key={percent}
              label={`${percent}% affected`}
              value={share(percent, 'the section')}
              polarity="higher-is-worse"
            />
          ))}
        </div>
      </Block>

      <Block
        title="EvidencePanel"
        lede="The per-question reading and the per-section spread behind the Quadratic Equations finding. Question text is never reproduced."
      >
        <EvidencePanel
          questions={[
            { ref: 'Q7 · 3 marks', reading: share(58, 'analysed students took partial credit') },
            { ref: 'Q12 · 4 marks', reading: share(41, 'analysed students attempted it') },
            { ref: 'Concept MCQ Q2', reading: share(87, 'analysed students answered correctly') },
          ]}
          sections={[
            { section: 'X-A', affected: share(41, 'the section') },
            { section: 'X-B', affected: share(66, 'the section') },
            { section: 'X-C', affected: share(55, 'the section') },
            { section: 'X-D', affected: share(72, 'the section') },
            { section: 'X-E', affected: share(58, 'the section') },
          ]}
        />
      </Block>

      <Block
        title="StudentReportCard"
        lede="The only one of the six that touches Mascot. No classmate, no rank, no percentile, no class average, no compare affordance."
      >
        <div className={styles.reports}>
          <StudentReportCard
            studentName="Aditi R."
            assessment="Unit Test 2 · Science"
            score={{ scope: 'score', marks: 16, outOf: 17 }}
            trend="up"
            line="Your application answers held up better this time than on the last analysed assessment."
            strengths={['Chemical reactions', 'Balancing equations']}
            focus={['Nothing is currently holding your marks back']}
            download={{ href: '#', label: 'Download this report' }}
          />
          <StudentReportCard
            studentName="Riya"
            assessment="Unit Test 2 · Science"
            score={{ scope: 'score', marks: 16, outOf: 17 }}
            trend="flat"
            line="Your score is level with the last analysed assessment. The same area is carrying the lost marks."
            strengths={['Acids, bases and salts']}
            focus={['Physics numericals']}
          />
          <StudentReportCard
            studentName="Rahul"
            assessment="Unit Test 2 · Science"
            score={{ scope: 'score', marks: 12, outOf: 17 }}
            trend="down"
            line="Most of the marks lost this time were on application questions in Maths. That is one area to work on, and it is a specific one."
            strengths={['Chemical reactions']}
            focus={['Maths application questions']}
          />
        </div>
        <p className={styles.lede}>
          The down card is the one to read hard. The pose is neutral, the arrow
          is down, and the line is factual and forward-looking rather than
          consoling. No exclamation marks on any trend, and achieve is
          unreachable from this component.
        </p>
        <p className={styles.lede}>
          Three birds in one scroll frame breaks the one-bird-per-viewport rule.
          That is deliberate here, because this page exists to compare states
          side by side. No site page may do it.
        </p>
      </Block>
    </main>
  );
}
