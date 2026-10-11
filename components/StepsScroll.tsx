"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StepsScroll.module.css";
import { Icon, type IconName } from "./Icon";

export type Step = { icon: IconName; title: string; summary: string; body: string[] };

/**
 * The five pipeline steps as a scroll-driven timeline. The step crossing the
 * middle of the viewport becomes active: its card lights up, the rail fills
 * to it, and the sticky panel swaps to its icon and number. Clicking a card
 * scrolls to it. All text is always present.
 */
export function StepsScroll({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.n));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const step = steps[active];
  const pct = ((active + 1) / steps.length) * 100;

  return (
    <div className={styles.wrap}>
      <aside className={styles.sticky} aria-hidden="true">
        <div className={styles.panel}>
          <svg viewBox="0 0 120 120" className={styles.ring}>
            <circle cx="60" cy="60" r="52" className={styles.track} />
            <circle
              cx="60"
              cy="60"
              r="52"
              pathLength={100}
              className={styles.fill}
              style={{ strokeDashoffset: 100 - pct }}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <span key={active} className={styles.bigIcon}>
            <Icon name={step.icon} size={40} strokeWidth={1.6} />
          </span>
          <span className={styles.count}>
            Step <b>{active + 1}</b> of {steps.length}
          </span>
          <span key={`t${active}`} className={styles.panelTitle}>
            {step.title}
          </span>
        </div>
      </aside>

      <ol className={styles.list}>
        <span className={styles.rail} aria-hidden="true">
          <span style={{ transform: `scaleY(${(active + 0.5) / steps.length})` }} />
        </span>
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-n={i}
            className={`${styles.item} ${i === active ? styles.on : ""} ${i < active ? styles.done : ""}`}
          >
            <span className={styles.node}>
              <Icon name={i < active ? "check" : s.icon} size={18} strokeWidth={i < active ? 2.6 : 1.8} />
            </span>
            <button
              type="button"
              className={styles.card}
              onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
            >
              <span className={styles.num}>Step {i + 1}</span>
              <span className={styles.title}>{s.title}</span>
              <span className={styles.summary}>{s.summary}</span>
              {s.body.map((p) => (
                <span key={p} className={styles.body}>
                  {p}
                </span>
              ))}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
