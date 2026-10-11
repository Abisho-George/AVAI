"use client";

import { useState } from "react";
import styles from "./NeverList.module.css";
import { Icon, type IconName } from "./Icon";

const NEVER: { icon: IconName; title: string; detail: string }[] = [
  { icon: "pen-off", title: "Sets or grades an exam", detail: "Your teachers set the paper and award the marks. Avai only reads them." },
  { icon: "numbers", title: "Reads answer content", detail: "Avai reads numbers only. It never sees what a student wrote." },
  { icon: "users", title: "Evaluates or ranks a teacher", detail: "Section gaps describe one assessment. They are never a measure of teaching quality." },
  { icon: "no-rank", title: "Shows a student a rank", detail: "No classmate, no rank, no percentile and no class average on a student's report." },
  { icon: "school", title: "Bills a parent", detail: "The school pays, against a verified headcount. Never a parent." },
  { icon: "lock", title: "Mixes research and school data", detail: "Each needs its own consent, and the two never meet." },
];

/** Six hard constraints as flip tiles: the promise on the front, why on the back. */
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
