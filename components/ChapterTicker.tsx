import styles from "./ChapterTicker.module.css";

type Tag = { subject: "Mathematics" | "Science" | "Social Science"; chapter: string; tier: "Recall" | "Understanding" | "Application" };

/** Example question tags, the way a mapped Class X paper reads to Avai. */
const TAGS: Tag[] = [
  { subject: "Mathematics", chapter: "Quadratic Equations", tier: "Application" },
  { subject: "Science", chapter: "Light", tier: "Understanding" },
  { subject: "Social Science", chapter: "Power Sharing", tier: "Recall" },
  { subject: "Mathematics", chapter: "Arithmetic Progressions", tier: "Understanding" },
  { subject: "Science", chapter: "Electricity", tier: "Application" },
  { subject: "Mathematics", chapter: "Trigonometry", tier: "Application" },
  { subject: "Science", chapter: "Chemical Reactions and Equations", tier: "Recall" },
  { subject: "Social Science", chapter: "Money and Credit", tier: "Understanding" },
  { subject: "Mathematics", chapter: "Coordinate Geometry", tier: "Recall" },
  { subject: "Science", chapter: "Life Processes", tier: "Understanding" },
];

const SUBJECT_CLASS: Record<Tag["subject"], string> = {
  Mathematics: styles.maths,
  Science: styles.science,
  "Social Science": styles.social,
};

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {TAGS.map((t) => (
        <li key={t.chapter} className={styles.tag}>
          <span className={`${styles.subject} ${SUBJECT_CLASS[t.subject]}`}>{t.subject}</span>
          <span className={styles.chapter}>{t.chapter}</span>
          <span className={styles.tier}>{t.tier}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * An endless strip of Board-mapped question tags under the homepage hero.
 * Two copies of the row slide left together; hovering pauses it. Under
 * reduced motion it is a still row that can be scrolled sideways.
 */
export function ChapterTicker() {
  return (
    <section className={styles.ticker} aria-label="Examples of how questions are tagged to the Board blueprint">
      <p className={styles.label}>
        <span className="live-dot" aria-hidden="true" /> Every question, mapped to the Board blueprint
      </p>
      <div className={styles.track}>
        <div className={styles.slide}>
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
