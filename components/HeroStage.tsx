"use client";

import { useEffect, useState } from "react";
import styles from "./HeroStage.module.css";
import { Mascot } from "./Mascot";
import { Icon, type IconName } from "./Icon";

type Chapter = { icon: IconName; label: string; lead: string; hl: string; tail: string; pos: string };

const CHAPTERS: Chapter[] = [
  { icon: "scorecard", label: "Reads the marks", lead: "I read the", hl: "marks", tail: "your teachers already gave.", pos: "tl" },
  { icon: "target", label: "Finds the gap", lead: "I find the", hl: "competency", tail: "that is costing marks.", pos: "tr" },
  { icon: "flag", label: "Weighs the Board", lead: "I check how often it comes up", hl: "in the Board exam.", tail: "", pos: "br" },
  { icon: "shield", label: "Says when unsure", lead: "And I tell you plainly", hl: "when I am not sure.", tail: "", pos: "bl" },
];

/** Splits a chapter into words so each one can rise in on its own beat. */
function words(c: Chapter) {
  const out: { w: string; hl: boolean }[] = [];
  for (const w of c.lead.split(" ")) out.push({ w, hl: false });
  for (const w of c.hl.split(" ")) out.push({ w, hl: true });
  for (const w of c.tail.split(" ").filter(Boolean)) out.push({ w, hl: false });
  return out;
}

const CHAPTER_MS = 4200;

/**
 * Homepage hero loop. Avai narrates four chapters in a speech bubble while
 * the matching card lights up. The bird itself only moves when the visitor
 * hovers or taps it. It loops continuously, holding only while keyboard focus is inside
 * it so a reader can finish a line; chapter dots jump to any line. Autoplay
 * is off under prefers-reduced-motion.
 */
export function HeroStage() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const [wave, setWave] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || paused) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % CHAPTERS.length), CHAPTER_MS);
    return () => window.clearTimeout(t);
  }, [index, playing, paused]);

  const chapter = CHAPTERS[index];

  return (
    <div
      className={styles.stage}
      aria-label="What Avai does, in four steps"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.glow} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className={styles.ring} aria-hidden="true" />

      <div key={index} className={styles.bubble} aria-live={playing ? "off" : "polite"}>
        <p className={styles.line}>
          <span className="sr">{`${chapter.lead} ${chapter.hl} ${chapter.tail}`.trim()}</span>
          {words(chapter).map((w, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`${styles.word} ${w.hl ? styles.hl : ""}`}
              style={{ ["--i" as string]: i }}
            >
              {w.w}{" "}
            </span>
          ))}
        </p>
      </div>

      <button
        type="button"
        key={wave}
        className={`${styles.bird} ${wave ? styles.waving : ""}`}
        onClick={() => setWave((w) => w + 1)}
        aria-label="Say hello to Avai"
      >
        <Mascot pose="hello" size={250} />
      </button>

      {CHAPTERS.map((c, n) => (
        <button
          key={c.label}
          type="button"
          className={`${styles.chip} ${styles[c.pos]} ${n === index ? styles.on : ""}`}
          onClick={() => setIndex(n)}
          aria-pressed={n === index}
        >
          <span className={styles.chipIcon}>
            <Icon name={c.icon} size={18} />
            {n === index ? <span key={index} className={styles.pulse} aria-hidden="true" /> : null}
          </span>
          {c.label}
        </button>
      ))}

      <div className={styles.controls}>
        <div className={styles.dots}>
          {CHAPTERS.map((c, n) => (
            <button
              key={c.label}
              type="button"
              aria-label={`Chapter ${n + 1}: ${c.label}`}
              aria-current={n === index}
              className={`${styles.dot} ${n === index ? styles.dotOn : ""}`}
              onClick={() => setIndex(n)}
            >
              {n === index && playing && !paused ? (
                <span key={index} className={styles.fill} style={{ ["--dur" as string]: `${CHAPTER_MS}ms` }} />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
