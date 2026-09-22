"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroLoop.module.css";
import { FindingCard } from "./FindingCard";
import { EvidencePanel } from "./EvidencePanel";
import { StudentReportCard } from "./StudentReportCard";

type Mark = { q: string; value: string };

const MARKS: Mark[] = [
  { q: "Q1", value: "2/2" },
  { q: "Q2", value: "3/3" },
  { q: "Q3", value: "1/1" },
  { q: "Q4", value: "2/2" },
  { q: "Q5", value: "3/4" },
  { q: "Q6", value: "2/2" },
  { q: "Q7", value: "1/3" },
  { q: "Q8", value: "3/3" },
  { q: "Q9", value: "2/2" },
  { q: "Q10", value: "4/4" },
  { q: "Q11", value: "2/3" },
  { q: "Q12", value: "1/4" },
];

/** Q5, Q7, Q12 — the three application-tier questions the finding is built on. */
const KEY_INDICES = new Set([4, 6, 11]);

const SCENE_NAMES = ["Marks", "Finding", "Evidence", "Report"];
const DURATIONS = [5000, 7000, 6000, 6000];
const CAPTIONS = [
  "the marks your teachers already entered.",
  "not a subject total, a named gap with what it costs.",
  "every number opens.",
  "same diagnosis, no rank, no percentile.",
];

function MarksGrid({ focus }: { focus?: boolean }) {
  return (
    <div className={styles.grid}>
      {MARKS.map((mark, idx) => {
        const isKey = focus && KEY_INDICES.has(idx);
        const isDimmed = focus && !isKey;
        return (
          <div
            key={mark.q}
            className={[styles.cell, isDimmed ? styles.cellDim : "", isKey ? styles.cellKey : ""]
              .filter(Boolean)
              .join(" ")}
          >
            <span>{mark.q}</span>
            <b>{mark.value}</b>
          </div>
        );
      })}
    </div>
  );
}

/**
 * A looping four-scene player following one finding from a mark to a
 * student report. Cross-fades between scenes, never more than two elements
 * animating at once, reserves its stage height so there is zero layout
 * shift, and autoplay is off under prefers-reduced-motion (the dots and
 * pause control still work).
 */
export function HeroLoop() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % SCENE_NAMES.length);
    }, DURATIONS[index]);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, playing]);

  function goTo(n: number) {
    setIndex((n + SCENE_NAMES.length) % SCENE_NAMES.length);
  }

  function onDotKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, n: number) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const next = (n + 1) % SCENE_NAMES.length;
      goTo(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prev = (n - 1 + SCENE_NAMES.length) % SCENE_NAMES.length;
      goTo(prev);
      tabRefs.current[prev]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
      tabRefs.current[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(SCENE_NAMES.length - 1);
      tabRefs.current[SCENE_NAMES.length - 1]?.focus();
    }
  }

  return (
    <div className={styles.loop} aria-label="How one finding travels from a mark to a student report">
      <div className={styles.bar}>
        <span className={styles.barDot} />
        <span className={styles.barDot} />
        <span className={styles.barDot} />
        <span className={styles.barLabel}>one finding, end to end</span>
      </div>

      <div className={styles.stage}>
        <div className={`${styles.scene} ${index === 0 ? styles.on : ""}`}>
          <p className={styles.sceneHead}>Marks your teachers already entered</p>
          <p className={styles.sceneSub}>Unit Test 2 · Class X-B · Mathematics · 48 students</p>
          <MarksGrid />
          <p className={`small ${styles.gridNote}`}>Total: 26/33. A report card stops here.</p>
        </div>

        <div className={`${styles.scene} ${index === 1 ? styles.on : ""}`}>
          <p className={styles.sceneHead}>Avai reads the pattern</p>
          <p className={styles.sceneSub}>The same three questions, across 240 students</p>
          <div style={{ marginBottom: 18 }}>
            <MarksGrid focus />
          </div>
          <FindingCard
            subject="Mathematics"
            competency="Quadratic Equations"
            scope="Application problems"
            urgency={{ level: "vh", recurrence: "4/4 years" }}
            metrics={[
              { label: "Students affected", value: 146, qualifier: "of 240" },
              { label: "Avg marks lost", value: 4.2, qualifier: "per student" },
            ]}
            attention="act"
            confidence={3}
            observation="61% of analysed students demonstrate the underlying concept but lose marks when the same concept appears in application-style questions."
            suggestedAction="application-focused revision, Board-style question practice"
          />
        </div>

        <div className={`${styles.scene} ${index === 2 ? styles.on : ""}`}>
          <p className={styles.sceneHead}>And shows its working</p>
          <p className={styles.sceneSub}>Every number opens to the questions behind it</p>
          <EvidencePanel
            questions={[
              { label: "Q7 · application, 3 marks", result: "58% partial credit" },
              { label: "Q12 · application, 4 marks", result: "41% attempted" },
              { label: "Q2 · concept recall, 3 marks", result: "87% correct" },
            ]}
            conclusion="Students know the concept. They lose it the moment it appears in an application-style question."
            note="paper-under-tests"
            noteDetail="Only 22% application questions against 30% expected. Read this finding with greater caution."
          />
        </div>

        <div className={`${styles.scene} ${index === 3 ? styles.on : ""}`}>
          <p className={styles.sceneHead}>Then it reaches Aditi</p>
          <p className={styles.sceneSub}>Shared by her teacher, opened with a one-time PIN</p>
          <StudentReportCard
            subjectTerm="Mathematics · Term 2"
            score="78 / 80"
            trend={{ direction: "up", label: "Keep going" }}
            line="Keep going. You're on the right path."
            doingWell={["Recall-based questions", "Basic algebra"]}
            workOnNext={["Quadratic equations — application-style questions"]}
            footerNote="Shared by your teacher. Ask them if you want to go through any of this together."
            mascotPose="improve"
          />
        </div>
      </div>

      <div className={styles.capRow}>
        <p className={styles.capText}>{CAPTIONS[index]}</p>
        <div className={styles.dots} role="tablist" aria-label="Scenes">
          {SCENE_NAMES.map((name, n) => (
            <button
              key={name}
              ref={(el) => {
                tabRefs.current[n] = el;
              }}
              role="tab"
              type="button"
              aria-selected={index === n}
              aria-label={`Scene ${n + 1}: ${name}`}
              tabIndex={index === n ? 0 : -1}
              className={`${styles.dotBtn} ${index === n ? styles.on : ""}`}
              onClick={() => goTo(n)}
              onKeyDown={(e) => onDotKeyDown(e, n)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.pp}
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
}
