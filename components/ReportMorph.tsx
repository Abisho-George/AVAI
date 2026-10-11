"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ReportMorph.module.css";
import { Icon } from "./Icon";

type Row = { label: string; value: string; pct: number; tone: "coral" | "gold" | "teal" | "blue" };

const REPORT: Row[] = [
  { label: "Mathematics", value: "42/80", pct: 52, tone: "coral" },
  { label: "Science", value: "49/80", pct: 61, tone: "gold" },
  { label: "Social Science", value: "63/80", pct: 79, tone: "teal" },
];

const AVAI: Row[] = [
  { label: "Recall tier", value: "88%", pct: 88, tone: "teal" },
  { label: "Understanding tier", value: "74%", pct: 74, tone: "blue" },
  { label: "Application tier", value: "31%", pct: 31, tone: "coral" },
  { label: "…same in Science", value: "34%", pct: 34, tone: "coral" },
  { label: "…but not Social Sci.", value: "81%", pct: 81, tone: "teal" },
];

const INSIGHTS = [
  { icon: "target" as const, text: "All 38 lost marks were application questions" },
  { icon: "layers" as const, text: "The same pattern shows up in Science" },
  { icon: "flag" as const, text: "In four of the last four Board papers" },
];

/**
 * One card that reads the same student two ways. The bars flow between the
 * report-card view and Avai's view, and the conclusion rewrites itself.
 * It flips on its own while on screen until someone uses the toggle.
 */
export function ReportMorph() {
  const [view, setView] = useState<"report" | "avai">("report");
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setView((v) => (v === "report" ? "avai" : "report")), view === "report" ? 2600 : 5200);
    return () => window.clearTimeout(t);
  }, [auto, visible, view]);

  const rows = view === "report" ? REPORT : AVAI;
  const avai = view === "avai";

  function choose(v: "report" | "avai") {
    setAuto(false);
    setView(v);
  }

  return (
    <div className={styles.morph} ref={ref}>
      <div className={`${styles.card} ${avai ? styles.cardAvai : ""}`} data-tilt="4">
        <div className={styles.top}>
          <span className={styles.student}>
            <span className={styles.avatar}>
              <Icon name="user" size={16} />
            </span>
            <span>
              <b>Class X · Roll 07</b>
              <span>Unit Test 2</span>
            </span>
          </span>
          <div className={styles.toggle} role="group" aria-label="Read this student as">
            <button type="button" aria-pressed={!avai} className={!avai ? styles.on : ""} onClick={() => choose("report")}>
              <Icon name="scorecard" size={15} /> Report card
            </button>
            <button type="button" aria-pressed={avai} className={avai ? styles.on : ""} onClick={() => choose("avai")}>
              <Icon name="finding" size={15} /> Avai
            </button>
          </div>
        </div>

        <div className={styles.rows}>
          {[0, 1, 2, 3, 4].map((i) => {
            const row = rows[i];
            return (
              <div key={i} className={`${styles.row} ${row ? "" : styles.rowGone}`} aria-hidden={!row}>
                <span key={row?.label} className={styles.label}>
                  {row?.label ?? ""}
                </span>
                <span className={styles.track}>
                  <span
                    className={`${styles.fill} ${row ? styles[row.tone] : ""}`}
                    style={{ transform: `scaleX(${row ? row.pct / 100 : 0})` }}
                  />
                </span>
                <span key={`v${row?.value}`} className={styles.value}>
                  {row?.value ?? ""}
                </span>
              </div>
            );
          })}
        </div>

        <p key={view} className={styles.verdict}>
          <span className={styles.verdictLabel}>Conclusion available</span>
          {avai ? (
            <b>A transferable application gap, worth roughly 60 Board marks.</b>
          ) : (
            <b>Needs more practice in Maths.</b>
          )}
        </p>
      </div>

      <ul className={`${styles.insights} ${avai ? styles.insightsOn : ""}`} aria-hidden={!avai}>
        {INSIGHTS.map((n, i) => (
          <li key={n.text} style={{ ["--i" as string]: i }}>
            <Icon name={n.icon} size={16} />
            {n.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
