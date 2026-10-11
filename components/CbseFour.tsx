import styles from "./CbseFour.module.css";
import { Icon } from "./Icon";

/**
 * "Four things CBSE fixes, and we match." Figures are the team's own, from
 * the Question Paper Engine two-pager: a Mathematics 041 unit test and a
 * Science 086 paper. Bars grow in when the section is revealed (grow-x).
 */
export function CbseFour() {
  return (
    <div className={styles.grid} data-stagger>
      <article className={`card ${styles.item}`}>
        <span className={styles.n}>01 · Mark distribution</span>
        <h3>Where the marks go</h3>
        <p>
          Three chapters carry only 17 to 18 of 80 marks in a Board paper. Scaling them to a full
          80-mark unit test must preserve the Board&rsquo;s own proportions.
        </p>
        <div className={styles.bars}>
          {[
            ["Surface Areas & Vol.", 31],
            ["Statistics", 31],
            ["Probability", 18],
          ].map(([l, v], i) => (
            <div key={l as string} className={styles.row}>
              <span>{l}</span>
              <span className={styles.track}>
                <i className="grow-x" style={{ width: `${((v as number) / 31) * 100}%`, ["--gd" as string]: `${0.2 + i * 0.12}s` }} />
              </span>
              <b>{v}</b>
            </div>
          ))}
        </div>
        <span className={styles.foot}>Mathematics 041 · total 80 marks</span>
      </article>

      <article className={`card ${styles.item}`}>
        <span className={styles.n}>02 · Section architecture</span>
        <h3>The shape of the paper</h3>
        <p>
          Section order, numbering, mark values, word limits and the internal-choice pattern come
          from the 2026 Board sets. A student meets the paper they will meet in March.
        </p>
        <div className={styles.sections}>
          {[
            ["A", "20 × 1", 20],
            ["B", "5 × 2", 10],
            ["C", "6 × 3", 18],
            ["D", "4 × 5", 20],
            ["E", "3 case studies", 12],
          ].map(([s, d, v], i) => (
            <div key={s as string} className={styles.sec} title={`Section ${s}: ${d}`}>
              <span className={styles.secBar}>
                <i className="grow-y" style={{ height: `${((v as number) / 20) * 100}%`, ["--gd" as string]: `${0.2 + i * 0.1}s` }} />
              </span>
              <b>{s}</b>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </article>

      <article className={`card ${styles.item}`}>
        <span className={styles.n}>03 · Cognitive design</span>
        <h3>How the marks are earned</h3>
        <p>
          CBSE prints, per subject, the share of marks that must test remembering, applying and
          higher-order thinking. Every question is coded and the totals audited.
        </p>
        <div className={styles.bars}>
          {[
            ["Remember, understand", 40],
            ["Apply", 24],
            ["Analyse, evaluate, create", 16],
          ].map(([l, v], i) => (
            <div key={l as string} className={styles.row}>
              <span>{l}</span>
              <span className={styles.track}>
                <i className={`grow-x ${styles.blue}`} style={{ width: `${((v as number) / 40) * 100}%`, ["--gd" as string]: `${0.2 + i * 0.12}s` }} />
              </span>
              <b>
                {v}/{v}
              </b>
            </div>
          ))}
        </div>
        <span className={styles.foot}>Science 086 · CBSE target against this paper · variance 0</span>
      </article>

      <article className={`card ${styles.item}`}>
        <span className={styles.n}>04 · Sourcing</span>
        <h3>Where every mark comes from</h3>
        <p>
          Each question is tagged to its origin and the counts published, so a school can answer,
          question by question, the objection that a paper was made hard on purpose.
        </p>
        <div className={styles.stack} aria-hidden="true">
          <i className={`grow-x ${styles.s1}`} style={{ flex: 60 }} />
          <i className={`grow-x ${styles.s2}`} style={{ flex: 15, ["--gd" as string]: "0.35s" }} />
          <i className={`grow-x ${styles.s3}`} style={{ flex: 5, ["--gd" as string]: "0.5s" }} />
        </div>
        <ul className={styles.legend}>
          <li>
            <i className={styles.s1} /> NCERT 60
          </li>
          <li>
            <i className={styles.s2} /> Board 15
          </li>
          <li>
            <i className={styles.s3} /> Constructed 5
          </li>
        </ul>
        <span className={styles.foot}>Science 086</span>
      </article>

      <aside className={styles.extra}>
        <Icon name="shield" size={18} />
        <span>
          Two more that CBSE does not publish and we hold to anyway: numbers are chosen so the
          arithmetic resolves cleanly and no calculator is needed, and no question needs a figure
          to be interpreted, so the paper works unmodified for a visually impaired candidate.
        </span>
      </aside>
    </div>
  );
}
