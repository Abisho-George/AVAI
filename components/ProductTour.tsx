"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProductTour.module.css";
import { Icon, type IconName } from "./Icon";

const STEPS: { title: string; line: string; cursor: [number, number] }[] = [
  { title: "Open the biggest finding", line: "The principal starts from what costs the most marks.", cursor: [37, 46] },
  { title: "See the evidence", line: "Every number opens to the questions behind it.", cursor: [78, 36] },
  { title: "Issue the report", line: "Issuing freezes the diagnosis for each student.", cursor: [72, 92] },
  { title: "Share with one student", line: "A separate act, opened with a one-time PIN.", cursor: [89, 92] },
];

const STEP_MS = 3400;

const SIDE: IconName[] = ["building", "target", "paper", "scorecard", "users"];

/**
 * "Inside Avai": a miniature of the school dashboard in a laptop frame, with
 * a cursor that walks through one finding from open to shared. Loops while
 * on screen; the step list on the side jumps to any step. No autoplay under
 * reduced motion.
 */
export function ProductTour() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduce) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [step, visible, reduce]);

  const drawer = step >= 1;
  const issued = step >= 2;
  const shared = step >= 3;
  const [cx, cy] = STEPS[step].cursor;

  return (
    <div className={styles.tour} ref={ref}>
      <div className={styles.device} data-tilt="3">
        <div className={styles.screen}>
          <div className={styles.canvas} aria-hidden="true">
            <aside className={styles.side}>
              <span className={styles.mark}>AVAI</span>
              {SIDE.map((n, i) => (
                <span key={n} className={`${styles.sideItem} ${i === 0 ? styles.sideOn : ""}`}>
                  <Icon name={n} size={14} />
                </span>
              ))}
            </aside>

            <main className={styles.main}>
              <div className={styles.crumbs}>School / Class X / Unit Test 2</div>
              <div className={styles.banner}>
                <span className={styles.bTag}>Biggest loss this assessment</span>
                <b>Quadratic Equations · application problems</b>
                <span>146 of 240 students · 4.2 marks lost per student</span>
              </div>

              <div className={styles.cards}>
                <div className={`${styles.fcard} ${step === 0 ? styles.pressed : ""} ${drawer ? styles.selected : ""}`}>
                  <span className={styles.subj}>Mathematics</span>
                  <b>Quadratic Equations</b>
                  <span className={styles.urg}>▲ Very high · 4/4 years</span>
                  <span className={styles.metrics}>
                    <span>
                      <b>146</b> of 240
                    </span>
                    <span>
                      <b>4.2</b> per student
                    </span>
                  </span>
                  <span className={styles.pillAct}>Immediate</span>
                </div>
                <div className={styles.fcard}>
                  <span className={styles.subj}>Physics</span>
                  <b>Light</b>
                  <span className={styles.urgH}>▲ High · 3/4 years</span>
                  <span className={styles.metrics}>
                    <span>
                      <b>84</b> of 240
                    </span>
                    <span>
                      <b>2.7</b> per student
                    </span>
                  </span>
                  <span className={styles.pillInv}>Investigation required</span>
                </div>
              </div>

              <div className={styles.sections}>
                <span className={styles.secTitle}>By section</span>
                {[81, 74, 78, 68, 76].map((v, i) => (
                  <span key={i} className={styles.secRow}>
                    <span>X-{"ABCDE"[i]}</span>
                    <i style={{ width: `${v}%` }} />
                  </span>
                ))}
              </div>
            </main>

            <div className={`${styles.drawer} ${drawer ? styles.drawerOn : ""}`}>
              <span className={styles.subj}>Mathematics · Evidence</span>
              <b className={styles.dTitle}>Quadratic Equations</b>
              {[
                ["Q7 · application, 3 marks", "58% partial credit", 58, "gold"],
                ["Q12 · application, 4 marks", "41% attempted", 41, "coral"],
                ["Q2 · concept recall, 3 marks", "87% correct", 87, "teal"],
              ].map(([q, r, v, tone], i) => (
                <span key={i} className={`${styles.ev} ${step === 1 && i === 1 ? styles.evHot : ""}`}>
                  <span>{q}</span>
                  <span className={styles.evBar}>
                    <i className={styles[tone as string]} style={{ width: `${v}%` }} />
                  </span>
                  <span className={styles.evR}>{r}</span>
                </span>
              ))}
              <span className={styles.note}>Only 22% application questions against 30% expected.</span>
              <span className={styles.actions}>
                <span className={`${styles.btn} ${issued ? styles.btnDone : ""}`}>
                  {issued ? "Issued ✓" : "Issue report"}
                </span>
                <span className={`${styles.btn} ${styles.btnPrimary} ${shared ? styles.btnDone : ""}`}>
                  {shared ? "Shared ✓" : "Share with student"}
                </span>
              </span>
            </div>

            <div className={`${styles.toast} ${shared ? styles.toastOn : ""}`}>
              <Icon name="key" size={14} /> Shared with Aditi · one-time PIN <b>4827</b>
            </div>

            <span className={styles.cursor} style={{ left: `${cx}%`, top: `${cy}%` }}>
              <span key={step} className={styles.ripple} />
              <svg viewBox="0 0 24 24">
                <path d="M5 3.5l13 7-5.6 1.6L10 18z" />
              </svg>
            </span>
          </div>
        </div>
        <div className={styles.base} aria-hidden="true" />
      </div>

      <ol className={styles.steps}>
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              className={`${styles.step} ${i === step ? styles.stepOn : ""} ${i < step ? styles.stepDone : ""}`}
              onClick={() => setStep(i)}
              aria-current={i === step}
            >
              <span className={styles.stepN}>{i < step ? <Icon name="check" size={14} strokeWidth={2.6} /> : i + 1}</span>
              <span className={styles.stepText}>
                <b>{s.title}</b>
                <span>{s.line}</span>
                {i === step && visible && !reduce ? (
                  <span key={step} className={styles.bar} style={{ ["--dur" as string]: `${STEP_MS}ms` }} />
                ) : null}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
