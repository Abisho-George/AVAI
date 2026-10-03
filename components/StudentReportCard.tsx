"use client";

import styles from "./StudentReportCard.module.css";
import { Mascot } from "./Mascot";

type StudentReportCardProps = {
  subjectTerm: string;
  score: string;
  /** null when there is nothing to compare against yet. */
  trend?: { direction: "up" | "down"; label: string } | null;
  line: string;
  doingWell: string[];
  workOnNext: string[];
  footerNote: string;
  showDownload?: boolean;
};

/** Score, trend arrow, mascot, two lists, download. */
export function StudentReportCard({
  subjectTerm,
  score,
  trend,
  line,
  doingWell,
  workOnNext,
  footerNote,
  showDownload = true,
}: StudentReportCardProps) {
  return (
    <article className={styles.report}>
      <div className={styles.hd}>
        <Mascot pose="hello" size={120} />
        <div>
          <div className={styles.meta}>{subjectTerm}</div>
          <div className={styles.scoreRow}>
            <span className={styles.score}>{score}</span>
            {trend ? (
              <span className={`${styles.trend} ${styles[trend.direction]}`}>
                <span aria-hidden="true">{trend.direction === "up" ? "▲" : "▼"}</span>
                {trend.label}
              </span>
            ) : null}
          </div>
          <div className={styles.line}>{line}</div>
        </div>
      </div>
      <div className={styles.bd}>
        <p className={styles.label}>What you&rsquo;re doing well</p>
        <ul>
          {doingWell.map((item) => (
            <li className={styles.good} key={item}>
              {item}
            </li>
          ))}
        </ul>
        <p className={styles.label}>What to work on next</p>
        <ul>
          {workOnNext.map((item) => (
            <li className={styles.next} key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.ft}>
        <span>{footerNote}</span>
        {showDownload ? (
          // TODO: wire to the real report-export endpoint once it exists.
          <button type="button" className={styles.download} onClick={() => window.print()}>
            Download
          </button>
        ) : null}
      </div>
    </article>
  );
}
