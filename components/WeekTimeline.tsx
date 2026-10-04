"use client";

import { useRef, useState } from "react";
import styles from "./WeekTimeline.module.css";
import { Icon, IconTile, type IconName } from "./Icon";

export type Week = {
  n: string;
  icon: IconName;
  title: string;
  short: string;
  body: string;
};

/**
 * The six pilot weeks as a clickable rail. The line fills up to the chosen
 * week; the panel below explains it. Tab pattern with arrow keys, and the
 * first week is shown without JavaScript.
 */
export function WeekTimeline({ weeks }: { weeks: Week[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const week = weeks[active];

  function select(n: number, focus = false) {
    const next = (n + weeks.length) % weeks.length;
    setActive(next);
    if (focus) refs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, n: number) {
    const keys: Record<string, number> = {
      ArrowRight: n + 1,
      ArrowLeft: n - 1,
      Home: 0,
      End: weeks.length - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  }

  return (
    <div className={styles.timeline}>
      <div className={styles.railWrap}>
        <div className={styles.rail} aria-hidden="true">
          <span
            className={styles.railFill}
            style={{ transform: `scaleX(${active / (weeks.length - 1)})` }}
          />
        </div>
        <div className={styles.nodes} role="tablist" aria-label="Pilot weeks">
          {weeks.map((w, n) => (
            <button
              key={w.n}
              ref={(el) => {
                refs.current[n] = el;
              }}
              type="button"
              role="tab"
              id={`wk-tab-${n}`}
              aria-selected={n === active}
              aria-controls="wk-panel"
              tabIndex={n === active ? 0 : -1}
              className={`${styles.node} ${n <= active ? styles.done : ""} ${n === active ? styles.on : ""}`}
              onClick={() => select(n)}
              onKeyDown={(e) => onKeyDown(e, n)}
            >
              <span className={styles.dot}>
                <Icon name={w.icon} size={18} />
              </span>
              <span className={styles.nodeN}>{w.n}</span>
              <span className={styles.nodeShort}>{w.short}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        id="wk-panel"
        role="tabpanel"
        aria-labelledby={`wk-tab-${active}`}
        className={styles.panel}
        key={active}
      >
        <IconTile name={week.icon} size={56} />
        <div className={styles.panelText}>
          <span className={styles.panelN}>Week {active + 1} of {weeks.length}</span>
          <h3>{week.title}</h3>
          <p>{week.body}</p>
        </div>
        <div className={styles.panelNav}>
          <button
            type="button"
            className="btn btn-line btn-sm"
            onClick={() => select(active - 1)}
            disabled={active === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => select(active + 1)}
            disabled={active === weeks.length - 1}
          >
            Next week <Icon name="arrow-right" size={14} strokeWidth={2.2} className="btn-ic" />
          </button>
        </div>
      </div>
    </div>
  );
}
