"use client";

import { useEffect, useState } from "react";
import styles from "./HonestyPanels.module.css";
import { Icon, type IconName } from "./Icon";
import { EvidenceNote } from "./EvidenceNote";
import type { EvidenceState } from "./types";

type Panel = {
  state: EvidenceState;
  icon: IconName;
  tone: "blue" | "gold" | "teal" | "ink";
  label: string;
  title: string;
  body: string;
  art: "scan" | "paper" | "dots" | "trend";
};

const PANELS: Panel[] = [
  {
    state: "cause-not-localised",
    icon: "search",
    tone: "blue",
    label: "Cause not localised",
    title: "A confirmed problem with no known cause",
    body: "84 students are losing marks across Physics · Light, with high confidence that the loss is real. No subtopic accounts for enough of it to name a cause, so Avai recommends a manual answer-script review instead of a drill set aimed at the wrong thing.",
    art: "scan",
  },
  {
    state: "paper-under-tests",
    icon: "paper",
    tone: "gold",
    label: "Paper under-tests",
    title: "Avai criticising your own question paper",
    body: "If a test carried too few application questions to judge application readiness, no analysis fixes that. Avai flags the paper and downgrades every related finding.",
    art: "paper",
  },
  {
    state: "early-signal",
    icon: "spark",
    tone: "teal",
    label: "Early signal",
    title: "A pattern that might be there",
    body: "A shape is visible but the evidence is thin. Avai shows it, marks it as emerging, and lets a principal decide whether to watch it, instead of hiding it or promoting it to a conclusion.",
    art: "dots",
  },
  {
    state: "trend-not-available",
    icon: "clock",
    tone: "ink",
    label: "Trend not available",
    title: "One test is not a trend",
    body: "After a single analysed assessment, Avai will not draw a trend line, claim consistency, or predict a Board outcome. The note disappears once a second assessment is analysed.",
    art: "trend",
  },
];

function Art({ kind }: { kind: Panel["art"] }) {
  if (kind === "scan")
    return (
      <div className={`${styles.art} ${styles.scan}`} aria-hidden="true">
        {[62, 58, 64, 60, 57, 61].map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
        <span className={styles.lens}>
          <Icon name="search" size={30} strokeWidth={2} />
        </span>
        <b className={styles.q}>?</b>
      </div>
    );
  if (kind === "paper")
    return (
      <div className={`${styles.art} ${styles.paper}`} aria-hidden="true">
        {["r", "r", "u", "r", "a", "u", "r", "r"].map((t, i) => (
          <i key={i} className={styles[`t-${t}`]} style={{ ["--i" as string]: i }} />
        ))}
        <span className={styles.flag}>Only 22% application</span>
      </div>
    );
  if (kind === "dots")
    return (
      <div className={`${styles.art} ${styles.dots}`} aria-hidden="true">
        {[
          [12, 70], [26, 40], [38, 62], [50, 30], [62, 52], [74, 24], [86, 44], [20, 22], [70, 76], [44, 82],
        ].map(([x, y], i) => (
          <i key={i} style={{ left: `${x}%`, top: `${y}%`, ["--i" as string]: i }} />
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline points="26,40 50,30 74,24" className={styles.maybe} />
        </svg>
      </div>
    );
  return (
    <div className={`${styles.art} ${styles.trend}`} aria-hidden="true">
      <span className={styles.axis} />
      <span className={styles.pt1}>Unit Test 2</span>
      <span className={styles.pt2}>Next test</span>
      <span className={styles.dash} />
    </div>
  );
}

/**
 * The four limited-evidence states as expanding panels. They rotate on their
 * own; hovering or focusing a panel opens it and holds it open. Under
 * reduced motion nothing rotates and panels simply open on click.
 */
export function HonestyPanels() {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % PANELS.length), 6000);
    return () => window.clearTimeout(t);
  }, [active, hold]);

  return (
    <div className={styles.panels} onMouseLeave={() => setHold(false)}>
      {PANELS.map((p, i) => {
        const on = i === active;
        return (
          <div
            key={p.state}
            className={`${styles.panel} ${styles[p.tone]} ${on ? styles.on : ""}`}
            onMouseEnter={() => {
              setActive(i);
              setHold(true);
            }}
          >
            <button
              type="button"
              className={styles.head}
              aria-expanded={on}
              onClick={() => {
                setActive(i);
                setHold(true);
              }}
            >
              <span className={styles.icon}>
                <Icon name={p.icon} size={22} />
              </span>
              <span className={styles.label}>{p.label}</span>
            </button>
            <div className={styles.content} hidden={!on}>
              <Art kind={p.art} />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <EvidenceNote state={p.state} />
            </div>
            {on && !hold ? <span key={active} className={styles.timer} aria-hidden="true" /> : null}
          </div>
        );
      })}
    </div>
  );
}
