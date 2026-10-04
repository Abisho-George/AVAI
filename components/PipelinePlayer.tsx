"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PipelinePlayer.module.css";
import { Icon, type IconName } from "./Icon";
import { SignalCluster } from "./SignalCluster";

type Scene = {
  key: string;
  icon: IconName;
  title: string;
  line: string;
};

const SCENES: Scene[] = [
  {
    key: "map",
    icon: "blueprint",
    title: "The paper is mapped",
    line: "Every question is tagged to the Board blueprint: chapter, concept and competency tier.",
  },
  {
    key: "marks",
    icon: "scorecard",
    title: "Teachers enter marks",
    line: "Question-wise marks go onto a structured scorecard, which is scanned and read automatically.",
  },
  {
    key: "checks",
    icon: "shield",
    title: "Every scorecard is checked",
    line: "Four checks run before a mark is accepted, then the teacher confirms on screen.",
  },
  {
    key: "paper",
    icon: "gauge",
    title: "The paper is graded first",
    line: "Avai reports what the paper can and cannot support before it says anything about students.",
  },
  {
    key: "finding",
    icon: "finding",
    title: "A named gap appears",
    line: "Performance by concept and competency tier, ranked by marks lost, Board recurrence and confidence.",
  },
  {
    key: "share",
    icon: "share",
    title: "Issued, then shared",
    line: "Issuing freezes the diagnosis. Sharing is a second step, opened with a one-time PIN.",
  },
];

const SCENE_MS = 5600;

const TAGGED = [
  { q: "Q2", marks: "3 marks", chapter: "Quadratic Equations", tier: "Recall", tone: "teal" },
  { q: "Q7", marks: "3 marks", chapter: "Quadratic Equations", tier: "Application", tone: "gold" },
  { q: "Q9", marks: "2 marks", chapter: "Arithmetic Progressions", tier: "Understanding", tone: "blue" },
  { q: "Q12", marks: "4 marks", chapter: "Quadratic Equations", tier: "Application", tone: "gold" },
] as const;

const MARKS = ["2/2", "3/3", "1/1", "2/2", "3/4", "2/2", "1/3", "3/3", "2/2", "4/4", "2/3", "1/4"];

const CHECKS = [
  "Question marks add up to the declared total",
  "Every mark is within range for its question",
  "The roll number matches a real student",
  "A blank is kept apart from a zero",
];

const PAPER = [
  { label: "Blueprint coverage", value: 82, expected: null, note: "8 of 9 chapters", tone: "teal" },
  { label: "Application questions", value: 22, expected: 30, note: "30% expected", tone: "gold" },
  { label: "Higher-order questions", value: 10, expected: 20, note: "20% expected", tone: "gold" },
] as const;

const TIERS = [
  { label: "Recall", value: 88, tone: "teal" },
  { label: "Understanding", value: 74, tone: "blue" },
  { label: "Application", value: 31, tone: "coral" },
] as const;

/** Inline style that staggers an animated child; ignored under reduced motion. */
function delay(seconds: number): React.CSSProperties {
  return { ["--d" as string]: `${seconds}s` };
}

function SceneMap() {
  return (
    <div className={styles.paperSheet}>
      <div className={styles.sheetHead}>
        <span>
          <Icon name="paper" size={16} /> Mathematics · Unit Test 2
        </span>
        <span className={styles.mono}>Class X</span>
      </div>
      <div className={styles.scanLine} aria-hidden="true" />
      <ul className={styles.qList}>
        {TAGGED.map((row, i) => (
          <li key={row.q} className={`${styles.qRow} ${styles.a}`} style={delay(0.15 + i * 0.35)}>
            <span className={styles.qId}>{row.q}</span>
            <span className={styles.qLines} aria-hidden="true">
              <i />
              <i />
            </span>
            <span className={styles.qTags}>
              <span className={`${styles.tag} ${styles.tagBlue} ${styles.pop}`} style={delay(0.45 + i * 0.35)}>
                {row.chapter}
              </span>
              <span
                className={`${styles.tag} ${styles[`tag-${row.tone}`]} ${styles.pop}`}
                style={delay(0.6 + i * 0.35)}
              >
                {row.tier}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className={`${styles.okBadge} ${styles.pop}`} style={delay(2.2)}>
        <Icon name="check-circle" size={16} /> Two-pass agreement check passed
      </p>
    </div>
  );
}

function SceneMarks() {
  return (
    <div className={styles.scorecard}>
      <div className={styles.sheetHead}>
        <span>
          <Icon name="scorecard" size={16} /> Scorecard · Roll 07
        </span>
        <span className={styles.mono}>X-B · Maths</span>
      </div>
      <div className={styles.scanBeam} aria-hidden="true" />
      <div className={styles.markGrid}>
        {MARKS.map((value, i) => (
          <div key={i} className={styles.markCell}>
            <span>Q{i + 1}</span>
            <b className={styles.pop} style={delay(0.2 + i * 0.16)}>
              {value}
            </b>
          </div>
        ))}
      </div>
      <p className={`${styles.totalRow} ${styles.a}`} style={delay(2.3)}>
        <span>Total read from the scorecard</span>
        <b className={styles.mono}>26/33</b>
      </p>
    </div>
  );
}

function SceneChecks() {
  return (
    <div className={styles.checkPanel}>
      <ul className={styles.checkList}>
        {CHECKS.map((label, i) => (
          <li key={label} className={styles.a} style={delay(0.2 + i * 0.5)}>
            <span className={`${styles.tick} ${styles.pop}`} style={delay(0.45 + i * 0.5)}>
              <Icon name="check" size={14} strokeWidth={2.6} />
            </span>
            {label}
          </li>
        ))}
      </ul>
      <div className={`${styles.confirm} ${styles.a}`} style={delay(2.5)}>
        <Icon name="user" size={18} />
        <span>
          <b>Teacher confirms the marks on screen</b>
          <span>A deliberate human check before analysis runs</span>
        </span>
        <span className={`${styles.confirmBtn} ${styles.pop}`} style={delay(3.1)}>
          Confirmed
        </span>
      </div>
    </div>
  );
}

function ScenePaper() {
  return (
    <div className={styles.meterPanel}>
      <p className={styles.panelTitle}>
        <Icon name="gauge" size={16} /> Diagnostic strength of this paper
      </p>
      {PAPER.map((row, i) => (
        <div key={row.label} className={styles.meter}>
          <div className={styles.meterTop}>
            <span>{row.label}</span>
            <b className={styles.mono}>{row.value}%</b>
          </div>
          <div className={styles.meterTrack}>
            <div
              className={`${styles.meterFill} ${styles[`fill-${row.tone}`]} ${styles.growBar}`}
              style={{ width: `${row.value}%`, ...delay(0.3 + i * 0.4) }}
            />
            {row.expected ? (
              <span className={styles.expected} style={{ left: `${row.expected}%` }} aria-hidden="true" />
            ) : null}
          </div>
          <span className={styles.meterNote}>{row.note}</span>
        </div>
      ))}
      <p className={`${styles.calmNote} ${styles.a}`} style={delay(2.1)}>
        <Icon name="alert" size={16} />
        Too few application questions to judge application readiness. Related findings are marked
        lower-strength.
      </p>
    </div>
  );
}

function SceneFinding() {
  return (
    <div className={styles.findingPanel}>
      <p className={styles.panelTitle}>
        <Icon name="chart" size={16} /> Mathematics by competency tier
      </p>
      {TIERS.map((row, i) => (
        <div key={row.label} className={styles.tierRow}>
          <span>{row.label}</span>
          <div className={styles.meterTrack}>
            <div
              className={`${styles.meterFill} ${styles[`fill-${row.tone}`]} ${styles.growBar}`}
              style={{ width: `${row.value}%`, ...delay(0.2 + i * 0.3) }}
            />
          </div>
          <b className={styles.mono}>{row.value}%</b>
        </div>
      ))}
      <div className={`${styles.miniFinding} ${styles.a}`} style={delay(1.4)}>
        <span className={styles.findingMeta}>Mathematics</span>
        <b className={styles.findingName}>Quadratic Equations · application problems</b>
        <div className={styles.findingStats}>
          <span>
            <b>146</b> of 240 students
          </span>
          <span>
            <b>4.2</b> marks lost per student
          </span>
        </div>
        <SignalCluster attention="act" urgency={{ level: "vh", recurrence: "4/4 years" }} confidence={3} />
      </div>
    </div>
  );
}

function SceneShare() {
  return (
    <div className={styles.sharePanel}>
      <div className={`${styles.issued} ${styles.a}`} style={delay(0.1)}>
        <span className={styles.issuedIcon}>
          <Icon name="lock" size={18} />
        </span>
        <span>
          <b>Report issued</b>
          <span>Diagnosis frozen · Term 2</span>
        </span>
      </div>
      <div className={`${styles.flowArrow} ${styles.a}`} style={delay(0.7)} aria-hidden="true">
        <Icon name="arrow-right" size={18} />
      </div>
      <div className={`${styles.pinCard} ${styles.a}`} style={delay(1)}>
        <span className={styles.pinLabel}>
          <Icon name="key" size={16} /> One-time PIN for Aditi
        </span>
        <span className={styles.pin}>
          {["4", "8", "2", "7"].map((digit, i) => (
            <b key={i} className={styles.pop} style={delay(1.3 + i * 0.22)}>
              {digit}
            </b>
          ))}
        </span>
      </div>
      <div className={`${styles.studentView} ${styles.a}`} style={delay(2.5)}>
        <span className={styles.studentTop}>
          <Icon name="user" size={16} /> Aditi&rsquo;s report
        </span>
        <span className={styles.studentScore}>78 / 80</span>
        <span className={styles.studentNext}>Next: quadratic equations, application-style questions</span>
        <span className={styles.studentFoot}>No rank. No percentile. No class average.</span>
      </div>
    </div>
  );
}

const VISUALS = [SceneMap, SceneMarks, SceneChecks, ScenePaper, SceneFinding, SceneShare];

/**
 * The How it works hero: a six-scene animation of the pipeline, built from
 * live markup rather than a video file. Captions and step list stay in sync
 * with the scene. Chapter navigation and a pause control are always present;
 * autoplay is off under prefers-reduced-motion, where every scene shows its
 * finished state.
 */
export function PipelinePlayer({ intro }: { intro?: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [run, setRun] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % SCENES.length);
      setRun((r) => r + 1);
    }, SCENE_MS);
    return () => window.clearTimeout(timer);
  }, [index, playing, run]);

  function goTo(n: number, focus = false) {
    const next = (n + SCENES.length) % SCENES.length;
    setIndex(next);
    setRun((r) => r + 1);
    if (focus) tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, n: number) {
    const keys: Record<string, number> = {
      ArrowDown: n + 1,
      ArrowRight: n + 1,
      ArrowUp: n - 1,
      ArrowLeft: n - 1,
      Home: 0,
      End: SCENES.length - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      goTo(keys[event.key], true);
    }
  }

  function togglePlay() {
    setPlaying((p) => !p);
    // Resuming restarts the current scene so the animation and timer line up.
    setRun((r) => r + 1);
  }

  return (
    <div className={styles.player}>
      {intro ? <div className={styles.intro}>{intro}</div> : null}
      <ol className={styles.steps} role="tablist" aria-label="Pipeline steps" aria-orientation="vertical">
        {SCENES.map((scene, n) => {
          const on = n === index;
          return (
            <li key={scene.key} role="presentation">
              <button
                ref={(el) => {
                  tabRefs.current[n] = el;
                }}
                type="button"
                role="tab"
                id={`pp-tab-${scene.key}`}
                aria-selected={on}
                aria-controls={`pp-panel-${scene.key}`}
                tabIndex={on ? 0 : -1}
                className={`${styles.step} ${on ? styles.stepOn : ""}`}
                onClick={() => goTo(n)}
                onKeyDown={(e) => onKeyDown(e, n)}
              >
                <span className={styles.stepIcon}>
                  <Icon name={scene.icon} size={18} />
                </span>
                <span className={styles.stepText}>
                  <span className={styles.stepTitle}>
                    <span className={styles.stepNum}>{String(n + 1).padStart(2, "0")}</span>
                    {scene.title}
                  </span>
                  <span className={styles.stepLine}>{scene.line}</span>
                  {on && playing ? (
                    <span
                      key={run}
                      className={styles.progress}
                      style={{ ["--dur" as string]: `${SCENE_MS}ms` }}
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className={styles.window}>
        <div className={styles.chrome}>
          <span className={styles.chromeDots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className={styles.chromeTitle}>
            <span className="live-dot" aria-hidden="true" /> avai · pipeline
          </span>
          <button
            type="button"
            className={styles.pp}
            onClick={togglePlay}
            aria-label={playing ? "Pause the animation" : "Play the animation"}
          >
            <Icon name={playing ? "pause" : "play"} size={14} strokeWidth={2.4} />
          </button>
        </div>
        <div className={styles.stage}>
          {SCENES.map((scene, n) => {
            const Visual = VISUALS[n];
            const on = n === index;
            return (
              <div
                key={on ? `${scene.key}-${run}` : scene.key}
                id={`pp-panel-${scene.key}`}
                role="tabpanel"
                aria-labelledby={`pp-tab-${scene.key}`}
                hidden={!on}
                className={`${styles.scene} ${on ? styles.on : ""}`}
              >
                <Visual />
              </div>
            );
          })}
        </div>
        <div className={styles.caption}>
          <span className={styles.captionNum}>
            {index + 1}/{SCENES.length}
          </span>
          <span className={styles.captionText}>{SCENES[index].title}</span>
        </div>
      </div>
    </div>
  );
}
