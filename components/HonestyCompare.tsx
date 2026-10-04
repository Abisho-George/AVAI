"use client";

import { useState } from "react";
import styles from "./HonestyCompare.module.css";
import { Icon, type IconName } from "./Icon";

type Item = {
  icon: IconName;
  title: string;
  typical: string;
  avai: string;
};

const ITEMS: Item[] = [
  {
    icon: "search",
    title: "Cause not localised",
    typical: "“Physics is weak. Assign a drill set.”",
    avai: "The problem is confirmed and the marks loss is real, but no single subtopic or question pattern explains it. Avai recommends a manual answer-script review instead of prescribing an intervention it hasn’t earned.",
  },
  {
    icon: "paper",
    title: "Paper under-tests this area",
    typical: "“Application readiness: good.”",
    avai: "Avai will criticise your own question paper. If a test carried too few application questions to judge application readiness, it says so and marks every related finding as lower-strength.",
  },
  {
    icon: "layers",
    title: "No dominant common blocker",
    typical: "“Main reason for lost marks: careless errors.”",
    avai: "When a performance band genuinely has no shared cause, Avai reports exactly that rather than inventing a tidy one to fill the card.",
  },
  {
    icon: "users",
    title: "Section gaps are never teaching quality",
    typical: "“Section X-D is behind. Review the teacher.”",
    avai: "Section comparisons carry an explicit non-attribution note. Avai describes tested performance on one assessment. It does not evaluate teachers, and it never will.",
  },
];

/**
 * The same four situations, answered the way a typical dashboard would and
 * the way Avai does. The toggle flips every card. Avai's answer is the
 * default and the one rendered on the server.
 */
export function HonestyCompare() {
  const [view, setView] = useState<"typical" | "avai">("avai");

  return (
    <div>
      <div className={styles.toggle} role="group" aria-label="Compare answers">
        <button
          type="button"
          aria-pressed={view === "typical"}
          className={view === "typical" ? styles.on : ""}
          onClick={() => setView("typical")}
        >
          A typical dashboard
        </button>
        <button
          type="button"
          aria-pressed={view === "avai"}
          className={view === "avai" ? styles.on : ""}
          onClick={() => setView("avai")}
        >
          Avai
        </button>
      </div>

      <div className={styles.grid} data-stagger>
        {ITEMS.map((item) => (
          <div key={item.title} className={styles.cell}>
            <div className={`${styles.card} ${view === "typical" ? styles.flipped : ""}`}>
              <div className={`${styles.face} ${styles.front}`} aria-hidden={view === "typical"}>
                <span className={styles.icon}>
                  <Icon name={item.icon} size={20} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.avai}</p>
              </div>
              <div className={`${styles.face} ${styles.back}`} aria-hidden={view === "avai"}>
                <span className={`${styles.icon} ${styles.iconTypical}`}>
                  <Icon name="chart" size={20} />
                </span>
                <h3>{item.title}</h3>
                <p className={styles.quote}>{item.typical}</p>
                <p className={styles.why}>An answer for every question, earned or not.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
