"use client";

import { useRef, useState } from "react";
import styles from "./ClassProgrammes.module.css";
import { Icon } from "./Icon";
import { DIMENSIONS, PROGRAMMES } from "./boardx-data";

/**
 * BoardX, Class 9 to Class 12. A four-year rail picks the class; the panel
 * shows that year's question, a sample student profile across the five
 * dimensions, what each person in the school gains, and the year's calendar.
 * Tab pattern with arrow keys; Class 10 is the default.
 */
export function ClassProgrammes() {
  const [active, setActive] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = PROGRAMMES[active];

  function pick(n: number, focus = false) {
    const next = (n + PROGRAMMES.length) % PROGRAMMES.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  }

  function onKey(e: React.KeyboardEvent<HTMLButtonElement>, n: number) {
    const map: Record<string, number> = { ArrowRight: n + 1, ArrowLeft: n - 1, Home: 0, End: PROGRAMMES.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      pick(map[e.key], true);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.rail} role="tablist" aria-label="Class programmes">
        <span className={styles.line} aria-hidden="true">
          <span style={{ transform: `scaleX(${active / (PROGRAMMES.length - 1)})` }} />
        </span>
        {PROGRAMMES.map((prog, n) => (
          <button
            key={prog.key}
            ref={(el) => {
              tabs.current[n] = el;
            }}
            type="button"
            role="tab"
            id={`cls-tab-${prog.key}`}
            aria-selected={n === active}
            aria-controls="cls-panel"
            tabIndex={n === active ? 0 : -1}
            className={`${styles.tab} ${n === active ? styles.on : ""} ${n < active ? styles.past : ""}`}
            onClick={() => pick(n)}
            onKeyDown={(e) => onKey(e, n)}
          >
            <span className={styles.num}>{prog.key}</span>
            <span className={styles.tabText}>
              <b>{prog.label}</b>
              <span>{prog.name}</span>
            </span>
            {prog.key === "10" || prog.key === "12" ? <span className={styles.board}>Board year</span> : null}
          </button>
        ))}
      </div>

      <div id="cls-panel" role="tabpanel" aria-labelledby={`cls-tab-${p.key}`} key={p.key} className={styles.panel}>
        <div className={styles.copy}>
          <span className={styles.question}>
            <Icon name="search" size={15} /> This year asks: {p.question}
          </span>
          <h3>{p.headline}</h3>
          <ul className={styles.summary}>
            {p.summary.map((s) => (
              <li key={s}>
                <Icon name="check" size={15} strokeWidth={2.4} />
                {s}
              </li>
            ))}
          </ul>
          <div className={styles.gains}>
            {p.gains.map((g, i) => (
              <div key={g.who} className={styles.gain} style={{ ["--i" as string]: i }}>
                <b>{g.who}</b>
                <span>{g.what}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.profile}>
          <div className={styles.profileHd}>
            <span className={styles.avatar} aria-hidden="true">
              <Icon name="user" size={20} />
            </span>
            <span>
              <b>Student profile</b>
              <span>
                Sample student · {p.label} · {p.name}
              </span>
            </span>
          </div>
          <ol className={styles.dims}>
            {DIMENSIONS.map((d, i) => {
              const out = p.outputs[i];
              return (
                <li key={d.key} className={out ? "" : styles.carried} style={{ ["--i" as string]: i }}>
                  <span className={styles.dimIcon}>
                    <Icon name={d.icon} size={16} />
                  </span>
                  <span className={styles.dimText}>
                    <b>
                      <span className={styles.dimN}>0{i + 1}</span> {d.name}
                    </b>
                    <span>{out ?? "Carried, not collected. Class 12 is not the year to ask a student what they want to become."}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className={styles.year}>
          <span className={styles.yearLabel}>
            <Icon name="calendar" size={15} /> The year
          </span>
          <ol>
            {p.year.map((y, i) => (
              <li key={y.when} style={{ ["--i" as string]: i }}>
                <b>{y.when}</b>
                <span>{y.what}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className={styles.promise}>
        <Icon name="shield" size={16} />
        We do not promise higher marks. We promise that the gap was found, ranked by what it is worth,
        assigned to someone, and checked afterwards.
      </p>
    </div>
  );
}
