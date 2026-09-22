"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { FindingCard } from "@/components/FindingCard";
import { EvidenceNote } from "@/components/EvidenceNote";
import { AttainmentBar } from "@/components/AttainmentBar";
import { SignalCluster } from "@/components/SignalCluster";

const NAV = ["School", "BoardX", "Papers", "Enter marks", "Manage teachers", "Settings"];

const SECTIONS = [
  { label: "X-A", students: 48, percent: 81, tone: "teal" as const, findings: 1, attention: "Low", pillClass: "pill-track" },
  { label: "X-B", students: 48, percent: 74, tone: "blue" as const, findings: 3, attention: "Medium", pillClass: "pill-watch" },
  { label: "X-C", students: 48, percent: 78, tone: "blue" as const, findings: 2, attention: "Medium", pillClass: "pill-watch" },
  { label: "X-D", students: 48, percent: 68, tone: "gold" as const, findings: 5, attention: "High", pillClass: "pill-act" },
  { label: "X-E", students: 48, percent: 76, tone: "blue" as const, findings: 3, attention: "Medium", pillClass: "pill-watch" },
];

const STUDENTS = [
  { name: "Aarav", section: "X-A", attainment: "17/17", lost: 0, blocker: "—", attention: "On track", pillClass: "pill-track" },
  { name: "Riya", section: "X-C", attainment: "16/17", lost: 1, blocker: "Physics numericals", attention: "Watch", pillClass: "pill-watch" },
  { name: "Rahul", section: "X-B", attainment: "12/17", lost: 5, blocker: "Maths application", attention: "Intervention", pillClass: "pill-act" },
  { name: "Aditi R.", section: "X-A", attainment: "16/17", lost: 1, blocker: "—", attention: "On track", pillClass: "pill-track" },
];

export default function DashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (drawerOpen) closeButtonRef.current?.focus();
    else openTriggerRef.current?.focus();
  }, [drawerOpen]);

  return (
    <div className={styles.app}>
      <aside className={styles.side}>
        <Link href="/" className={styles.sideMark} aria-label="Avai home">
          <svg width="28" height="28" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <rect width="30" height="30" rx="8" fill="var(--ink-2)" />
            <path d="M8 21 C12 15 17 10 23 7 C19 13 15 18 11 22 Z" fill="var(--gold)" />
            <path d="M7 22 C11 16 16 11 22 8 C17 14 12 19 9 23 Z" fill="var(--teal)" />
          </svg>
        </Link>
        <nav>
          {NAV.map((item, i) => (
            <a
              key={item}
              href="#"
              className={i === 0 ? "on" : ""}
              onClick={(e) => e.preventDefault()}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className={styles.sideFt}>
          <b>Mrs. Kavitha Rajan</b>
          <span>Principal</span>
          <p style={{ marginTop: 12 }}>
            <Link href="/portal" className="small">
              Sign out
            </Link>
          </p>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.demoNote}>
          Public demo — sample data only. Nothing here is a real school or student.
        </div>

        <p className={styles.crumbs}>
          <a href="#" onClick={(e) => e.preventDefault()}>
            School
          </a>{" "}
          /{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Class X
          </a>{" "}
          / <b>Unit Test 2</b>
        </p>

        <div className={styles.appHd}>
          <div>
            <h1>Unit Test 2</h1>
            <p className="small">
              What this assessment tells us about Board readiness — and how confidently.
            </p>
          </div>
          <span className="urg urg-m">Attention: medium</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <EvidenceNote
            state="trend-not-available"
            detail="This analysis is based on Unit Test 2 alone. Trend, consistency and multi-test prediction become available once a second assessment is analysed."
          />
        </div>

        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <span>Students</span>
            <b>240</b>
          </div>
          <div className={styles.kpi}>
            <span>Sections</span>
            <b>5</b>
          </div>
          <div className={styles.kpi}>
            <span>Subjects</span>
            <b>5</b>
          </div>
          <div className={styles.kpi}>
            <span>Diagnostic strength</span>
            <b style={{ fontSize: "1.15rem" }}>Moderate</b>
          </div>
        </div>

        <div className={styles.secn}>
          <h2>What is stopping students from scoring higher?</h2>
          <p className="small">Each card is one finding. The three statuses are independent of each other.</p>
          <div className="split-2">
            <button
              type="button"
              ref={openTriggerRef}
              className={styles.rowlink}
              onClick={() => setDrawerOpen(true)}
            >
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
                observation="61% of analysed students demonstrate the underlying concept but lose marks when it appears in application-style questions."
                footer={<span className={styles.footHint}>Open finding →</span>}
              />
            </button>
            <FindingCard
              subject="Physics"
              competency="Light"
              scope="Whole chapter — no single sub-skill"
              urgency={{ level: "h", recurrence: "3/4 years" }}
              metrics={[
                { label: "Students affected", value: 84, qualifier: "of 240" },
                { label: "Avg marks lost", value: 2.7, qualifier: "per student" },
              ]}
              attention="inv"
              confidence={3}
              footer={
                <EvidenceNote
                  state="cause-not-localised"
                  detail="Problem confirmed. Manual answer-script review recommended."
                />
              }
            />
          </div>
        </div>

        <div className={styles.secn}>
          <h2>Are all the sections facing the same problem?</h2>
          <p className="small">Attention is a section-level signal, separate from Board urgency and confidence.</p>
          <div className="panel">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Students</th>
                  <th>Overall attainment</th>
                  <th>High-priority findings</th>
                  <th>Attention</th>
                </tr>
              </thead>
              <tbody>
                {SECTIONS.map((row) => (
                  <tr key={row.label}>
                    <td>
                      <strong>{row.label}</strong>
                    </td>
                    <td className="num">{row.students}</td>
                    <td className={styles.attainCell}>
                      <div className="bar-track">
                        <div className={`bar-fill f-${row.tone}`} style={{ width: `${row.percent}%` }} />
                      </div>
                    </td>
                    <td className="num">{row.findings}</td>
                    <td>
                      <span className={`pill ${row.pillClass}`}>{row.attention}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="small" style={{ margin: "14px 0 0" }}>
              A section gap describes tested performance on this assessment only. It is not a
              measure of teaching quality, and Avai does not attribute it to any teacher.
            </p>
          </div>
        </div>

        <div className={styles.secn}>
          <h2>Which students need what?</h2>
          <p className="small">
            Rank is present but never the headline. The row&rsquo;s real payload is what is
            stopping that student.
          </p>
          <div className="panel">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Section</th>
                  <th>Attainment</th>
                  <th>Marks lost</th>
                  <th>Main blocker</th>
                  <th>Attention</th>
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <strong>{row.name}</strong>
                    </td>
                    <td>{row.section}</td>
                    <td className="num">{row.attainment}</td>
                    <td className="num">{row.lost}</td>
                    <td className="small">{row.blocker}</td>
                    <td>
                      <span className={`pill ${row.pillClass}`}>{row.attention}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.secn}>
          <h2>What can&rsquo;t we recommend yet, and why?</h2>
          <div className="split-2">
            <EvidenceNote state="cause-not-localised" detail="Problem confirmed. Manual review recommended." />
            <EvidenceNote state="paper-under-tests" />
            <EvidenceNote state="early-signal" />
            <EvidenceNote state="trend-not-available" />
          </div>
        </div>

        <p className={`small ${styles.footNav}`}>
          <Link href="/portal">← Back to sign-in</Link> · <Link href="/">avai.school</Link>
        </p>
      </main>

      <div
        className={`${styles.scrim} ${drawerOpen ? styles.on : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`${styles.drawer} ${drawerOpen ? styles.on : ""}`}
        aria-label="Finding details"
        inert={!drawerOpen}
      >
        <button
          type="button"
          ref={closeButtonRef}
          className={styles.drawerX}
          aria-label="Close"
          onClick={() => setDrawerOpen(false)}
        >
          ×
        </button>
        <div style={{ fontSize: "0.68rem", letterSpacing: "0.11em", color: "var(--blue)", fontWeight: 600, textTransform: "uppercase" }}>
          Mathematics
        </div>
        <h2 style={{ fontSize: "1.3rem", margin: "4px 0 2px" }}>Quadratic Equations</h2>
        <p className="small" style={{ marginBottom: 16 }}>
          Application problems
        </p>
        <SignalCluster
          urgency={{ level: "vh", recurrence: "4/4 years" }}
          confidence={3}
          attention="act"
        />

        <h3 className={styles.drawerH4}>What we observed</h3>
        <p className="small">
          61% of analysed students demonstrate the underlying concept but lose marks when the same
          concept appears in application-style questions.
        </p>

        <h3 className={styles.drawerH4}>Impact</h3>
        <table className="tbl">
          <tbody>
            <tr>
              <td className="small">Students affected</td>
              <td className="num">146 of 240</td>
            </tr>
            <tr>
              <td className="small">Avg marks lost</td>
              <td className="num">4.2 per student</td>
            </tr>
            <tr>
              <td className="small">Questions tested</td>
              <td className="num">3</td>
            </tr>
            <tr>
              <td className="small">Board recurrence</td>
              <td className="num">2022, 2023, 2024, 2025</td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.drawerH4}>Evidence from this paper</h3>
        <ul className={styles.evidList}>
          <li>
            <span>Q7 · 3 marks</span>
            <b>58% partial credit</b>
          </li>
          <li>
            <span>Q12 · 4 marks</span>
            <b>41% attempted</b>
          </li>
          <li>
            <span>Concept MCQ Q2</span>
            <b>87% correct</b>
          </li>
        </ul>

        <h3 className={styles.drawerH4} style={{ marginTop: 6 }}>
          Students affected, by section
        </h3>
        <div className={styles.sectionBars}>
          <AttainmentBar label="X-A" percent={41} value="41%" tone="teal" />
          <AttainmentBar label="X-B" percent={66} value="66%" tone="coral" />
          <AttainmentBar label="X-C" percent={55} value="55%" tone="gold" />
          <AttainmentBar label="X-D" percent={72} value="72%" tone="coral" />
          <AttainmentBar label="X-E" percent={58} value="58%" tone="gold" />
        </div>

        <h3 className={styles.drawerH4}>Recommended intervention</h3>
        <ul className="ticks">
          <li>Application-focused revision</li>
          <li>Board-style question practice</li>
        </ul>

        <div style={{ marginTop: 18 }}>
          <EvidenceNote state="trend-not-available" />
        </div>
      </aside>
    </div>
  );
}
