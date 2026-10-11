"use client";

import { useEffect, useState } from "react";
import styles from "./HeroStage.module.css";
import { Mascot } from "./Mascot";
import { Icon, type IconName } from "./Icon";

type Chapter = { icon: IconName; label: string; line: string; pos: string };

const CHAPTERS: Chapter[] = [
  { icon: "scorecard", label: "Reads the marks", line: "I read the marks your teachers already gave.", pos: "tl" },
  { icon: "target", label: "Finds the gap", line: "I find the competency that is costing marks.", pos: "tr" },
  { icon: "flag", label: "Weighs the Board", line: "I check how often it comes up in the Board exam.", pos: "br" },
  { icon: "shield", label: "Says when unsure", line: "And I tell you plainly when I am not sure.", pos: "bl" },
];

const CHAPTER_MS = 4200;

/**
 * Homepage hero loop. Avai narrates four chapters in a speech bubble while
 * the matching card lights up. The bird itself only moves when the visitor
 * hovers or taps it. Pause control and chapter dots are always present;
 * autoplay is off under prefers-reduced-motion.
 */
export function HeroStage() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [wave, setWave] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % CHAPTERS.length), CHAPTER_MS);
    return () => window.clearTimeout(t);
  }, [index, playing]);

  const chapter = CHAPTERS[index];

  return (
    <div className={styles.stage} aria-label="What Avai does, in four steps">
      <div className={styles.glow} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className={styles.ring} aria-hidden="true" />

      <div className={styles.bubble} aria-live={playing ? "off" : "polite"}>
        <p key={index} className={styles.line}>
          {chapter.line}
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
              {n === index && playing ? (
                <span key={index} className={styles.fill} style={{ ["--dur" as string]: `${CHAPTER_MS}ms` }} />
              ) : null}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.pp}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
        >
          <Icon name={playing ? "pause" : "play"} size={13} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
