import styles from "./SeparationDiagram.module.css";
import { Icon } from "./Icon";

function Lane({ tone }: { tone: "teal" | "gold" }) {
  return (
    <div className={`${styles.lane} ${styles[tone]}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

/**
 * One company, two streams of data that never meet. Dots flow down each
 * lane and stop at the wall between them. All the meaning is in the text;
 * the motion is decoration.
 */
export function SeparationDiagram() {
  return (
    <figure className={styles.diagram}>
      <div className={styles.top}>
        <span className={styles.topIcon}>
          <Icon name="building" size={20} />
        </span>
        <span>
          <b>INAT Venture Pvt Ltd</b>
          <span>Builds and owns Avai. Data controller for the product.</span>
        </span>
      </div>

      <div className={styles.fork} aria-hidden="true">
        <span />
      </div>

      <div className={styles.cols}>
        <div className={styles.col}>
          <div className={`${styles.node} ${styles.nodeAvai}`}>
            <Icon name="school" size={20} />
            <b>Avai</b>
            <span>The product schools buy</span>
          </div>
          <Lane tone="teal" />
          <ul className={styles.facts}>
            <li>
              <Icon name="check" size={14} strokeWidth={2.6} /> School pays, against a verified headcount
            </li>
            <li>
              <Icon name="check" size={14} strokeWidth={2.6} /> Findings go back to that school only
            </li>
          </ul>
        </div>

        <div className={styles.wall}>
          <span className={styles.wallLock}>
            <Icon name="lock" size={18} />
          </span>
          <span className={styles.wallText}>Never mixed</span>
        </div>

        <div className={styles.col}>
          <div className={`${styles.node} ${styles.nodeYaadhum}`}>
            <Icon name="research" size={20} />
            <b>Yaadhum</b>
            <span>Open research</span>
          </div>
          <Lane tone="gold" />
          <ul className={styles.facts}>
            <li>
              <Icon name="check" size={14} strokeWidth={2.6} /> Anonymised, separately consented
            </li>
            <li>
              <Icon name="check" size={14} strokeWidth={2.6} /> Scholarships and public research
            </li>
          </ul>
        </div>
      </div>

      <figcaption className={styles.caption}>
        Each needs its own purpose-specific parental consent. A school can run one without the
        other.
      </figcaption>
    </figure>
  );
}
