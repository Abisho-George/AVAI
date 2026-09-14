import { Mascot, type Pose } from './Mascot';
import { formatScore, type Score } from './signals';
import styles from './StudentReportCard.module.css';

export type Trend = 'up' | 'flat' | 'down';

/**
 * The trend picks the pose. `improve` only on a stronger attempt; `neutral` on
 * both flat and down, because the bird must neither celebrate an unearned
 * result nor look disappointed at a fifteen-year-old.
 *
 * `achieve` is unreachable from here. It appears exactly once on the site, at
 * the final call to action.
 */
const POSE_FOR_TREND: Record<Trend, Pose> = {
  up: 'improve',
  flat: 'neutral',
  down: 'neutral',
};

const ARROW: Record<Trend, string> = { up: '↗', flat: '→', down: '↘' };
const TREND_LABEL: Record<Trend, string> = {
  up: 'Stronger than the last analysed assessment',
  flat: 'Level with the last analysed assessment',
  down: 'Lower than the last analysed assessment',
};

export type StudentReportCardProps = {
  studentName: string;
  assessment: string;
  score: Score;
  trend: Trend;
  /**
   * One line, supplied by the caller.
   *
   * On `down` this needs its own copy register: factual and forward-looking,
   * never consoling and never cheerful. "Keep going, you're on the right path"
   * under a fallen score is worse than no line at all. No exclamation marks on
   * any trend.
   */
  line: string;
  /** What is working. Kept first, and never framed against a classmate. */
  strengths: string[];
  /** What to focus on next. */
  focus: string[];
  download?: { href: string; label: string };
};

/**
 * The student surface. No classmate, no rank, no percentile, no class average,
 * and no share or compare affordance.
 *
 * This is the only one of the six display components that touches Mascot. The
 * other five sit on data-dense surfaces, where the bird is banned.
 */
export function StudentReportCard({
  studentName,
  assessment,
  score,
  trend,
  line,
  strengths,
  focus,
  download,
}: StudentReportCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <div>
          <p className={styles.who}>{studentName}</p>
          <p className={styles.assessment}>{assessment}</p>
        </div>
        <Mascot pose={POSE_FOR_TREND[trend]} size={96} />
      </header>

      <div className={styles.scoreRow}>
        <p className={styles.score}>
          <strong>{score.marks}</strong>
          <span> / {score.outOf}</span>
        </p>
        <p className={styles.trend}>
          <span className={styles.arrow} aria-hidden="true">
            {ARROW[trend]}
          </span>
          {TREND_LABEL[trend]}
        </p>
        <p className={styles.srOnly}>{formatScore(score)}</p>
      </div>

      <p className={styles.line}>{line}</p>

      <div className={styles.lists}>
        <section>
          <h4 className={styles.listHead}>What is working</h4>
          <ul className={styles.list}>
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className={styles.listHead}>What to focus on next</h4>
          <ul className={styles.list}>
            {focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      {download && (
        <a className={styles.download} href={download.href} download>
          {download.label}
        </a>
      )}
    </article>
  );
}
