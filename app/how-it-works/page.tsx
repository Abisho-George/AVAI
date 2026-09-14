import { CtaBand } from '../../components/CtaBand';
import { HonestyTabs } from '../../components/HonestyTabs';
import { PageHeader } from '../../components/PageHeader';
import styles from './how.module.css';

export const metadata = {
  title: 'How Avai reasons — Avai',
  description:
    'From a tagged paper to a named gap: how Avai turns marks your teachers already entered into evidence-backed findings.',
};

const STEPS = [
  {
    n: '01',
    title: 'The paper is mapped to the Board blueprint',
    body: "Every question is tagged on two layers. Curriculum: subject, class, chapter, board unit, concept family, concept variant, prerequisite concept. Assessment demand: competency tier, complexity, dependency level. This turns \"Question 14\" into \"Class 10 Maths, Quadratic Equations, applying tier, moderate complexity, depends on factorisation.\" Tagging is model-assisted with a two-pass agreement check, so ambiguous or low-confidence tags are caught before they enter the pipeline.",
  },
  {
    n: '02',
    title: 'Teachers enter marks the way they already do',
    body: 'Teachers mark the paper as normal, then transcribe question-wise marks onto a pre-printed structured scorecard, one box per question, sections mirroring the paper. Scorecards are scanned and read automatically. Four checks run before a scorecard is accepted: marks sum to the declared total, each mark is within range, the roll number resolves to a real student, and a blank is distinguished from a zero. The teacher confirms the extracted marks on screen.',
  },
  {
    n: '03',
    title: 'Avai grades the paper before it grades the students',
    body: 'Before producing a single finding, Avai reports on the assessment itself: blueprint coverage, the share of application questions against what the Board expects, and the share of higher-order questions. A paper that under-tests a competency cannot support a confident claim about that competency, and Avai says so on the finding rather than in a footnote.',
  },
  {
    n: '04',
    title: 'Findings are produced, ranked, and held to evidence',
    body: 'Performance is computed per concept and per competency tier across every subject a student takes, which is what makes a cross-subject pattern visible. Findings are ranked by marks exposure, Board recurrence and confidence together, not by raw average.',
  },
  {
    n: '05',
    title: 'Reports are issued, then shared, two separate acts',
    body: 'Issuing a report freezes the diagnosis. Sharing it with a student is a second, deliberate action that generates a one-time PIN. A school can share Term 1 and hold Term 2 back until a parent meeting without anyone inventing a workaround.',
  },
];

const STRENGTH = [
  { figure: '82%', label: 'Blueprint coverage', sub: '8 of 9 chapters' },
  { figure: '22%', label: 'Application questions', sub: 'against 30% expected' },
  { figure: '10%', label: 'Higher-order questions', sub: 'against 20% expected' },
];

export default function HowItWorks() {
  return (
    <main>
      <PageHeader
        eyebrow="How Avai reasons"
        title="From a tagged paper to a named gap"
        lede="Avai does not set exams, does not grade answers, and never reads what a student wrote. It reads a question paper mapped to the Board blueprint, and the marks your teachers already awarded against it."
      />

      <section className={styles.section}>
        <div className={styles.wrap}>
          <ol className={styles.steps}>
            {STEPS.map((step) => (
              <li key={step.n} className={styles.step}>
                <span className={styles.stepN}>{step.n}</span>
                <div>
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>Can I trust this test to tell me anything?</h2>
          <p className={styles.body}>
            Diagnostic strength is stated before any student finding, because the
            quality of the paper caps the quality of every conclusion drawn from
            it.
          </p>
          <div className={styles.strength}>
            {STRENGTH.map((item) => (
              <div key={item.label} className={styles.strengthCard}>
                <p className={styles.strengthFigure}>{item.figure}</p>
                <p className={styles.strengthLabel}>{item.label}</p>
                <p className={styles.strengthSub}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>What Avai refuses to conclude</h2>
          <p className={styles.body}>
            Four states where a lesser product would guess. None is styled as an
            error, because none of them is one. They are the accurate answer.
          </p>
          <HonestyTabs />
        </div>
      </section>

      <CtaBand
        title="See the full walkthrough"
        body="Every screen in the product, captured from the running build: principal, teacher and student."
        action={{ href: '/contact', label: 'Request the walkthrough' }}
        secondary={{ href: '/findings', label: 'What Avai finds' }}
      />
    </main>
  );
}
