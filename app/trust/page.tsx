import { CtaBand } from '../../components/CtaBand';
import { PageHeader } from '../../components/PageHeader';
import styles from './trust.module.css';

export const metadata = {
  title: 'Trust & data — Avai',
  description:
    'What Avai holds, and what it will never do. Written to be forwarded to whoever asks the hard questions at your school.',
};

const NEVER = [
  {
    title: 'Never sets or grades an exam.',
    body: 'Avai reads marks your teachers awarded. It has no opinion on whether a mark was right.',
  },
  {
    title: 'Never reads answer content.',
    body: 'It reads numbers against a tagged question paper. Nothing a student wrote enters the system.',
  },
  {
    title: 'Never evaluates a teacher.',
    body: 'Section comparisons carry an explicit non-attribution note, and no screen in the product ranks staff.',
  },
  {
    title: 'Never shows a student a classmate.',
    body: 'No rank, no percentile, no class average on any student surface.',
  },
  {
    title: 'Never bills a parent.',
    body: 'The school is the customer. There is no parent-facing purchase anywhere.',
  },
  {
    title: 'Never lets research borrow commercial data.',
    body: 'Separate consent, separate purpose, no silent flow between them.',
  },
];

const DATA = [
  {
    title: 'Scorecard images: 30 days',
    body: 'Scanned scorecards are retained for thirty days after extraction so a disputed mark can be checked against the original. Deletion is gated on teacher confirmation, then automatic.',
  },
  {
    title: 'Isolation at the infrastructure level',
    body: 'Every table is scoped to a school identifier and enforced with row-level security. One school cannot see another’s data even if application code were to ask for it.',
  },
  {
    title: 'Marks, tied to a roll number',
    body: 'What persists is question-wise marks against a tagged paper, linked to a roll number within your school. That is the whole record.',
  },
  {
    title: 'Two purposes, two consents',
    body: 'Avai is the commercial product your school buys. Yaadhum is the open research and scholarship work that uses anonymised data to study how Indian students actually lose marks. They share method. They do not share data.',
  },
];

const ACCESS = [
  { role: 'Principal', sees: 'Every standard and section in their school' },
  { role: 'Class teacher', sees: 'Every subject, their section only' },
  { role: 'Subject teacher', sees: 'Their subject, their assigned sections only' },
  { role: 'Student', sees: 'Only reports explicitly shared with them, via one-time PIN' },
];

const QA = [
  {
    q: 'Where does it run?',
    a: 'Avai runs as a multi-tenant service with per-school row-level isolation. Scorecard images are held in a separate store on a thirty-day expiry, keyed to the same school scope as the marks they came from.',
  },
  {
    q: 'Who can export?',
    a: 'Report generation and export is available to the principal and to teachers within their assignment scope. Students cannot export anything beyond their own shared report as a PDF. Every issuance and share is recorded.',
  },
  {
    q: 'If we leave?',
    a: 'Your marks and reports are yours. On exit we provide a full export of everything held for your school and delete our copies. Anything already anonymised into published Yaadhum research stays published, which is why that consent is asked for separately and up front.',
  },
];

export default function Trust() {
  return (
    <main>
      <PageHeader
        eyebrow="Trust & data"
        title="What Avai holds, and what it will never do"
        lede="A diagnostic product that reads children's marks has to be answerable about all of it. This page is written to be forwarded to whoever asks the hard questions at your school."
      />

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>Avai never does these things</h2>
          <p className={styles.body}>
            Not as a current limitation. As a design commitment.
          </p>
          <div className={styles.grid}>
            {NEVER.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>How the data is held</h2>
          <div className={styles.grid}>
            {DATA.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>Who can see a given student's finding</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <tbody>
                {ACCESS.map((row) => (
                  <tr key={row.role}>
                    <th scope="row">{row.role}</th>
                    <td>{row.sees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>
            Questions your IT or legal contact will ask
          </h2>
          <div className={styles.qaList}>
            {QA.map((item) => (
              <div key={item.q} className={styles.qa}>
                <h3 className={styles.qaQ}>{item.q}</h3>
                <p className={styles.qaA}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Still have questions?"
        body="Send them over. We would rather answer them before a pilot than during one."
        action={{ href: '/contact', label: 'Get in touch' }}
      />
    </main>
  );
}
