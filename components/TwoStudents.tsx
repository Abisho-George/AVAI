"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TwoStudents.module.css";
import { Icon } from "./Icon";

/**
 * Two students, the same 65 in Mathematics, opposite problems. From the
 * team's Class 10 programme document. Starts as the mark sheet sees them;
 * once on screen it turns to Avai's reading, and the toggle switches back
 * and forth.
 */

const STUDENTS = [
  {
    name: "Arun",
    concepts: "Sound",
    lost: "Multi-part questions and presentation under time",
    kind: "Execution problem",
    help: "Timed practice",
    tone: "teal",
  },
  {
    name: "Divya",
    concepts: "Gaps in three chapters",
    lost: "Application questions",
    kind: "Concept problem",
    help: "Rebuild the concept",
    tone: "gold",
  },
] as const;

export function TwoStudents() {
  const [avai, setAvai] = useState(false);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Turn to Avai's reading once, a moment after the pair comes into view.
  useEffect(() => {
    const el = ref.current;
    if (!el || touched) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          timer = window.setTimeout(() => setAvai(true), 1400);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [touched]);

  function set(v: boolean) {
    setTouched(true);
    setAvai(v);
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.toggle} role="group" aria-label="Read the two students as">
        <button type="button" aria-pressed={!avai} className={!avai ? styles.on : ""} onClick={() => set(false)}>
          <Icon name="scorecard" size={15} /> The mark sheet
        </button>
        <button type="button" aria-pressed={avai} className={avai ? styles.on : ""} onClick={() => set(true)}>
          <Icon name="search" size={15} /> Avai&rsquo;s reading
        </button>
      </div>

      <div className={styles.pair}>
        {STUDENTS.map((s, i) => (
          <article key={s.name} className={`${styles.card} ${avai ? styles[s.tone] : ""}`} style={{ ["--i" as string]: i }}>
            <header className={styles.hd}>
              <span className={styles.avatar}>{s.name[0]}</span>
              <span>
                <b>{s.name}</b>
                <span>Class 10</span>
              </span>
              <span className={styles.mark} title="Mathematics mark">
                65
              </span>
            </header>

            <dl className={styles.rows}>
              <div>
                <dt>Concepts</dt>
                <dd key={String(avai)}>{avai ? s.concepts : "Not shown on a mark sheet"}</dd>
              </div>
              <div>
                <dt>Marks lost on</dt>
                <dd key={String(avai)}>{avai ? s.lost : "Not shown on a mark sheet"}</dd>
              </div>
              <div>
                <dt>What would help</dt>
                <dd key={String(avai)}>{avai ? <b>{s.help}</b> : "The same revision class"}</dd>
              </div>
            </dl>

            <span className={styles.kind}>
              <Icon name={avai ? "target" : "users"} size={15} />
              {avai ? s.kind : "Identical on paper"}
            </span>
          </article>
        ))}
        <span className={`${styles.vs} ${avai ? styles.vsOn : ""}`} aria-hidden="true">
          {avai ? "≠" : "="}
        </span>
      </div>
    </div>
  );
}
