"use client";

import { useState } from "react";
import styles from "./TopicDrill.module.css";
import { Icon } from "./Icon";

/**
 * Where one sample student's 38 lost Mathematics marks actually went:
 * chapter first, then the topic inside the chapter. Illustrative data for
 * the demo student used across the site (42/80, all lost marks on
 * application questions). Chapters are real CBSE Class X chapters.
 */

export const TOPIC_DATA: { chapter: string; lost: number; topics: { name: string; lost: number }[] }[] = [
  {
    chapter: "Quadratic Equations",
    lost: 9,
    topics: [
      { name: "Word problems", lost: 6 },
      { name: "Forming the equation from a situation", lost: 3 },
    ],
  },
  {
    chapter: "Surface Areas and Volumes",
    lost: 8,
    topics: [
      { name: "Combined solids in a real object", lost: 5 },
      { name: "Converting one solid into another", lost: 3 },
    ],
  },
  {
    chapter: "Arithmetic Progressions",
    lost: 8,
    topics: [
      { name: "nth term in a context", lost: 5 },
      { name: "Sum of n terms in a context", lost: 3 },
    ],
  },
  {
    chapter: "Statistics",
    lost: 7,
    topics: [
      { name: "Mode of grouped data in a context", lost: 4 },
      { name: "Median from a cumulative table", lost: 3 },
    ],
  },
  {
    chapter: "Coordinate Geometry",
    lost: 6,
    topics: [
      { name: "Section formula in a problem", lost: 4 },
      { name: "Distance formula in a problem", lost: 2 },
    ],
  },
];

const MAX = 9;

export function TopicDrill() {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.drill}>
      <div className={styles.hd}>
        <span className={styles.student}>
          <span className={styles.avatar}>
            <Icon name="user" size={16} />
          </span>
          <span>
            <b>Sample student · Class X</b>
            <span>Mathematics · 42 out of 80</span>
          </span>
        </span>
        <span className={styles.lost}>
          <b>38</b> marks lost, by chapter and topic
        </span>
      </div>

      <ol className={styles.list}>
        {TOPIC_DATA.map((c, i) => {
          const on = open === i;
          return (
            <li key={c.chapter} className={on ? styles.on : ""}>
              <button
                type="button"
                className={styles.chapter}
                aria-expanded={on}
                onClick={() => setOpen(on ? -1 : i)}
              >
                <span className={styles.chName}>
                  <Icon name="book" size={16} />
                  {c.chapter}
                </span>
                <span className={styles.track}>
                  <i style={{ width: `${(c.lost / MAX) * 100}%` }} />
                </span>
                <b>{c.lost}</b>
                <Icon name="arrow-right" size={14} strokeWidth={2.2} className={styles.chev} />
              </button>
              <div className={styles.topics} hidden={!on}>
                {c.topics.map((t) => (
                  <div key={t.name} className={styles.topic}>
                    <span className={styles.tName}>{t.name}</span>
                    <span className={styles.tTag}>Application</span>
                    <span className={styles.tTrack}>
                      <i style={{ width: `${(t.lost / MAX) * 100}%` }} />
                    </span>
                    <b>{t.lost}</b>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
      <p className={styles.foot}>
        <Icon name="target" size={15} /> Every lost mark traced to a topic inside a chapter, for every
        student, in every subject.
      </p>
    </div>
  );
}
