"use client";

import { useState } from "react";
import styles from "./NeverList.module.css";
import { Icon, type IconName } from "./Icon";

const NEVER: { icon: IconName; title: string; detail: string }[] = [
  { icon: "pen-off", title: "Adds a test to your calendar", detail: "We build the papers you were already going to set, and read the exams you already run." },
  { icon: "numbers", title: "Reads what a student wrote", detail: "Diagnostics reads question-wise marks only, never the answer itself." },
  { icon: "users", title: "Evaluates or ranks a teacher", detail: "Section gaps describe one assessment. They are never a measure of teaching quality." },
  { icon: "no-rank", title: "Ranks students against each other", detail: "No classmate, no rank, no percentile and no class average on a student's report." },
  { icon: "alert", title: "Sells prediction", detail: "We do not claim access to any paper before the Board releases it, or forecast any child's future." },
  { icon: "school", title: "Sells coaching or admissions", detail: "No coaching, no admissions, no applications. The school pays, never a parent." },
  { icon: "lock", title: "Shares a student's data", detail: "Nothing leaves the school and that student's own family." },
  { icon: "clock", title: "Asks teachers to write reports", detail: "No plans to write and no classroom time. We do the arithmetic and the audit." },
];

/** The lines we do not cross, as tiles that open to say why on hover or tap. */
export function NeverList() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className={styles.grid} data-stagger>
      {NEVER.map((n, i) => (
        <li key={n.title}>
          <button
            type="button"
            className={`${styles.tile} ${open === i ? styles.open : ""}`}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className={styles.icon}>
              <Icon name={n.icon} size={22} />
            </span>
            <span className={styles.never}>Never</span>
            <span className={styles.title}>{n.title}</span>
            <span className={styles.detail}>{n.detail}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
