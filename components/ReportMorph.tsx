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

const TOPICS: Row[] = [
  { label: "Quadratic Equations", value: "9 lost", pct: 100, tone: "coral" },
  { label: "Surface Areas & Vol.", value: "8 lost", pct: 89, tone: "coral" },
  { label: "Arithmetic Prog.", value: "8 lost", pct: 89, tone: "gold" },
  { label: "Statistics", value: "7 lost", pct: 78, tone: "gold" },
  { label: "Coordinate Geometry", value: "6 lost", pct: 67, tone: "gold" },
];

const TOPIC_INSIGHTS = [
  { icon: "book" as const, text: "Word problems: 6 of the 9" },
  { icon: "book" as const, text: "Combined solids: 5 of the 8" },
  { icon: "book" as const, text: "nth term in a context: 5 of the 8" },
];

const INSIGHTS = [
  { icon: "target" as const, text: "All 38 lost marks were application questions" },
  { icon: "layers" as const, text: "The same pattern shows up in Science" },
  { icon: "flag" as const, text: "In four of the last four Board papers" },
];

type View = "report" | "avai" | "topics";
const ORDER: View[] = ["report", "avai", "topics"];
const HOLD: Record<View, number> = { report: 2600, avai: 4800, topics: 5600 };

/**
 * One card that reads the same student two ways. The bars flow between the
 * report-card view and Avai's view, and the conclusion rewrites itself.
 * It flips on its own while on screen until someone uses the toggle.
 */
export function ReportMorph() {
  const [view, setView] = useState<View>("report");
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
    const t = window.setTimeout(() => setView((v) => ORDER[(ORDER.indexOf(v) + 1) % ORDER.length]), HOLD[view]);
    return () => window.clearTimeout(t);
  }, [auto, visible, view]);

  const rows = view === "report" ? REPORT : view === "avai" ? AVAI : TOPICS;
  const avai = view !== "report";
  const insights = view === "topics" ? TOPIC_INSIGHTS : INSIGHTS;

  function choose(v: View) {
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
          <div className={styles.toggle} role="group" aria-label="Read this student by">
            <button type="button" aria-pressed={view === "report"} className={view === "report" ? styles.on : ""} onClick={() => choose("report")}>
              <Icon name="scorecard" size={15} /> Report card
            </button>
            <button type="button" aria-pressed={view === "avai"} className={view === "avai" ? styles.on : ""} onClick={() => choose("avai")}>
              <Icon name="finding" size={15} /> Tiers
            </button>
            <button type="button" aria-pressed={view === "topics"} className={view === "topics" ? styles.on : ""} onClick={() => choose("topics")}>
              <Icon name="book" size={15} /> Topics
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
          {view === "topics" ? (
            <b>Six of the nine Quadratic Equations marks went on word problems. Start there.</b>
          ) : avai ? (
            <b>A transferable application gap, worth roughly 60 Board marks.</b>
          ) : (
            <b>Needs more practice in Maths.</b>
          )}
        </p>
      </div>

      <ul className={`${styles.insights} ${avai ? styles.insightsOn : ""}`} aria-hidden={!avai}>
        {insights.map((n, i) => (
          <li key={n.text} style={{ ["--i" as string]: i }}>
            <Icon name={n.icon} size={16} />
            {n.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
