"use client";

import { useEffect, useState } from "react";
import styles from "./PaperBuilder.module.css";
import { Icon } from "./Icon";

/**
 * An illustration of the Question Paper Engine's builder. The chapter list,
 * mark split and cognitive mix are the real figures from a Class X
 * Mathematics unit test delivered for Session 2026 to 27 (from the team's
 * two-pager). Visitors can switch class and paper type and run "Generate",
 * which plays the audit steps and produces the three documents.
 */

const SUBJECTS = [
  { name: "Mathematics", code: "041" },
  { name: "Science", code: "086" },
  { name: "Social Science", code: "087" },
  { name: "English Lang. & Lit.", code: "184" },
  { name: "Tamil", code: "006" },
  { name: "Hindi Course B", code: "085" },
];

const CHAPTERS = [
  "Real Numbers",
  "Polynomials",
  "Pair of Linear Equations",
  "Quadratic Equations",
  "Arithmetic Progressions",
  "Triangles",
  "Coordinate Geometry",
  "Introduction to Trigonometry",
  "Circles",
  "Surface Areas and Volumes",
  "Statistics",
  "Probability",
];

const UNIT_TEST: Record<string, number> = {
  "Surface Areas and Volumes": 31,
  Statistics: 31,
  Probability: 18,
};

const AUDIT = [
  "Mark split derived from the Board's own weighting",
  "Every question coded to a competency band",
  "Cognitive mix audited: within 1 mark of target",
  "Marking scheme and design report written",
];

const DOCS = [
  { icon: "paper" as const, name: "Question paper", line: "Board section order, numbering and choices" },
  { icon: "check-circle" as const, name: "Marking scheme", line: "Step-wise marks, accepted alternate forms" },
  { icon: "search" as const, name: "Design report", line: "Every question traced to its source" },
];

export function PaperBuilder() {
  const [cls, setCls] = useState<"X" | "XII">("X");
  const [type, setType] = useState<"full" | "unit">("unit");
  const [step, setStep] = useState(-1);

  // Generating: tick the audit steps one by one, then show the documents.
  useEffect(() => {
    if (step < 0 || step > AUDIT.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setStep((s) => s + 1), reduce ? 0 : 650);
    return () => window.clearTimeout(t);
  }, [step]);

  const done = step > AUDIT.length;
  const running = step >= 0 && !done;

  function reset() {
    setStep(-1);
  }

  return (
    <div className={styles.builder}>
      <div className={styles.bar}>
        <span className={styles.barTitle}>
          <Icon name="paper" size={15} /> Paper builder
        </span>
        <span className={styles.session}>CBSE · Session 2026 to 27</span>
      </div>

      <div className={styles.body}>
        <div className={styles.col}>
          <span className={styles.label}>Class</span>
          <div className={styles.seg} role="group" aria-label="Class">
            {(["X", "XII"] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cls === c}
                className={cls === c ? styles.on : ""}
                onClick={() => {
                  setCls(c);
                  reset();
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <span className={styles.label}>Subject</span>
          <ul className={styles.subjects}>
            {SUBJECTS.map((s, i) => (
              <li key={s.code} className={i === 0 && cls === "X" ? styles.subjectOn : ""}>
                <span>{s.name}</span>
                <span className={styles.code}>{s.code}</span>
              </li>
            ))}
          </ul>

          <span className={styles.label}>Paper type</span>
          <div className={styles.seg} role="group" aria-label="Paper type">
            <button
              type="button"
              aria-pressed={type === "full"}
              className={type === "full" ? styles.on : ""}
              onClick={() => {
                setType("full");
                reset();
              }}
            >
              Full syllabus
            </button>
            <button
              type="button"
              aria-pressed={type === "unit"}
              className={type === "unit" ? styles.on : ""}
              onClick={() => {
                setType("unit");
                reset();
              }}
            >
              Unit test
            </button>
          </div>
        </div>

        <div className={styles.col}>
          <span className={styles.label}>Chapters to be examined</span>
          {cls === "XII" ? (
            <div className={styles.xii}>
              <Icon name="layers" size={22} />
              <p>
                Class XII papers are built on the same method. Tell us the subjects and chapters
                you need, and we build the set.
              </p>
            </div>
          ) : (
            <ul className={styles.chapters} key={type}>
              {CHAPTERS.map((c, i) => {
                const marks = UNIT_TEST[c];
                const picked = type === "full" || marks !== undefined;
                return (
                  <li key={c} className={picked ? styles.picked : ""} style={{ ["--i" as string]: i }}>
                    <span className={styles.box} aria-hidden="true">
                      {picked ? <Icon name="check" size={11} strokeWidth={3} /> : null}
                    </span>
                    <span className={styles.chName}>{c}</span>
                    {type === "unit" && marks ? <b>{marks} marks</b> : null}
                  </li>
                );
              })}
            </ul>
          )}
          <p className={styles.note}>
            {type === "unit"
              ? "Still worth the full 80 marks: the Board's own proportions, scaled from its four-session weighting."
              : "Every chapter, weighted the way the Board weights it."}
          </p>
        </div>

        <div className={styles.col}>
          <span className={styles.label}>The paper</span>
          <dl className={styles.stats}>
            <div>
              <dt>Total marks</dt>
              <dd>80</dd>
            </div>
            <div>
              <dt>Questions</dt>
              <dd>38</dd>
            </div>
            <div>
              <dt>Sections</dt>
              <dd>5</dd>
            </div>
            <div>
              <dt>Internal choices</dt>
              <dd>9</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>3 hrs</dd>
            </div>
          </dl>

          <span className={styles.label}>Cognitive mix against CBSE</span>
          <div className={styles.mix} aria-hidden="true">
            <i style={{ flex: 42 }} className={styles.m1} />
            <i style={{ flex: 20 }} className={styles.m2} />
            <i style={{ flex: 18 }} className={styles.m3} />
          </div>
          <p className={styles.mixLegend}>Remember 42 · Apply 20 · Analyse 18</p>
          <span className={styles.within}>
            <Icon name="check-circle" size={14} /> Within 1 mark of target
          </span>

          {done ? (
            <button type="button" className={`btn btn-line ${styles.go}`} onClick={reset}>
              Build another
            </button>
          ) : (
            <button
              type="button"
              className={`btn btn-primary ${styles.go}`}
              onClick={() => setStep(0)}
              disabled={running}
            >
              {running ? "Building the set…" : "Generate paper + marking scheme"}
            </button>
          )}
        </div>
      </div>

      <div className={`${styles.run} ${step >= 0 ? styles.runOn : ""}`} aria-live="polite">
        {step >= 0 ? (
          <>
            <ol className={styles.audit}>
              {AUDIT.map((a, i) => (
                <li key={a} className={i < step ? styles.ok : i === step ? styles.busy : ""}>
                  <span className={styles.tick}>
                    {i < step ? <Icon name="check" size={12} strokeWidth={3} /> : null}
                  </span>
                  {a}
                </li>
              ))}
            </ol>
            <div className={`${styles.docs} ${done ? styles.docsOn : ""}`}>
              {DOCS.map((d, i) => (
                <div key={d.name} className={styles.doc} style={{ ["--i" as string]: i }}>
                  <Icon name={d.icon} size={20} />
                  <b>{d.name}</b>
                  <span>{d.line}</span>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
      <p className={styles.caption}>
        Illustration of the builder. The chapters, mark split and cognitive mix are the real figures
        from a Class X Mathematics unit test delivered for Session 2026 to 27.
      </p>
    </div>
  );
}
