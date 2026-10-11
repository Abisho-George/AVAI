"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RoleViews.module.css";
import { Icon, type IconName } from "./Icon";
import { MascotMark } from "./Mascot";

type Role = {
  key: "principal" | "teacher" | "student";
  icon: IconName;
  name: string;
  device: string;
  title: string;
  points: string[];
};

const ROLES: Role[] = [
  {
    key: "principal",
    icon: "building",
    name: "Principal",
    device: "On the school dashboard",
    title: "Sees cost, urgency and spread",
    points: [
      "Every standard, every section, every subject",
      "Marks exposure and Board urgency",
      "Section comparison, with its non-attribution note",
      "Ranked intervention plan across the whole cohort",
    ],
  },
  {
    key: "teacher",
    icon: "users",
    name: "Teacher",
    device: "On their own sections",
    title: "Sees their own scope, and can act",
    points: [
      "Their section, their subjects, nothing wider",
      "The same finding, clipped to their students",
      "Issue a report, then share it as a separate act",
      "No school-wide view and no cross-teacher comparison",
    ],
  },
  {
    key: "student",
    icon: "user",
    name: "Student",
    device: "On a phone, with a one-time PIN",
    title: "Sees one report, and nobody else",
    points: [
      "Only reports a teacher has explicitly shared",
      "Opened with a one-time PIN",
      "No classmates, no rank, no percentile, no class average",
      "Plain language, and never forced optimism",
    ],
  },
];

function PrincipalScreen() {
  return (
    <div className={`${styles.device} ${styles.browser}`}>
      <div className={styles.browserBar}>
        <i />
        <i />
        <i />
        <span>Class X · Unit Test 2</span>
      </div>
      <div className={styles.screenBody}>
        <span className={styles.subj}>Mathematics</span>
        <b className={styles.big}>Quadratic Equations</b>
        <div className={styles.chips}>
          <span className={styles.urg}>▲ Very high · 4/4 years</span>
          <span className={styles.pillAct}>Immediate</span>
          <span className={styles.conf}>
            <i />
            <i />
            <i /> High confidence
          </span>
        </div>
        <div className={styles.kpis}>
          <span>
            <b>146</b> of 240 students
          </span>
          <span>
            <b>4.2</b> marks lost each
          </span>
        </div>
        <span className={styles.label}>Spread across sections</span>
        {[
          ["X-A", 41],
          ["X-B", 66],
          ["X-D", 72],
        ].map(([s, v], i) => (
          <span key={s} className={styles.secRow}>
            <span>{s}</span>
            <span className={styles.track}>
              <i style={{ width: `${v}%`, ["--i" as string]: i }} />
            </span>
            <b>{v}%</b>
          </span>
        ))}
        <span className={styles.attribution}>
          A section gap describes tested performance on this assessment only. It is not a measure of
          teaching quality, and Avai does not attribute it to any teacher.
        </span>
      </div>
    </div>
  );
}

function TeacherScreen() {
  return (
    <div className={`${styles.device} ${styles.tablet}`}>
      <div className={styles.screenBody}>
        <span className={styles.subj}>Mathematics · X-A</span>
        <b className={styles.big}>Quadratic Equations</b>
        <div className={styles.chips}>
          <span className={styles.urg}>▲ Very high</span>
          <span className={styles.pillAct}>Immediate</span>
        </div>
        <div className={styles.kpis}>
          <span>
            <b>29</b> of 48 in your section
          </span>
          <span>
            <b>4.1</b> per student
          </span>
        </div>
        <p className={styles.obs}>
          Your students demonstrate the concept but lose marks when it appears in application-style
          questions.
        </p>
        <div className={styles.btns}>
          <span className={styles.btn}>
            <Icon name="lock" size={14} /> Issue report
          </span>
          <span className={`${styles.btn} ${styles.btnPrimary}`}>
            <Icon name="share" size={14} /> Share with student
          </span>
        </div>
      </div>
    </div>
  );
}

function StudentScreen() {
  return (
    <div className={`${styles.device} ${styles.phone}`}>
      <span className={styles.notch} />
      <div className={styles.screenBody}>
        <div className={styles.reportHd}>
          <MascotMark size={44} />
          <span>
            <span className={styles.subj}>Mathematics · Term 2</span>
            <b className={styles.score}>78 / 80</b>
          </span>
        </div>
        <p className={styles.encourage}>Keep going. You&rsquo;re on the right path.</p>
        <span className={styles.label}>What you&rsquo;re doing well</span>
        <span className={styles.good}>Recall-based questions</span>
        <span className={styles.good}>Basic algebra</span>
        <span className={styles.label}>What to work on next</span>
        <span className={styles.next}>Quadratic equations: application-style questions</span>
        <span className={styles.noRank}>
          <Icon name="no-rank" size={13} /> No rank. No percentile. No class average.
        </span>
      </div>
    </div>
  );
}

const SCREENS = { principal: PrincipalScreen, teacher: TeacherScreen, student: StudentScreen };

/**
 * One diagnosis, scoped three ways. Tabs switch the role and the device
 * mock that shows it; they rotate on their own while on screen until
 * someone picks one.
 */
export function RoleViews() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % ROLES.length), 6000);
    return () => window.clearTimeout(t);
  }, [active, auto, visible]);

  function pick(n: number, focus = false) {
    const next = (n + ROLES.length) % ROLES.length;
    setAuto(false);
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  }

  function onKey(e: React.KeyboardEvent<HTMLButtonElement>, n: number) {
    const map: Record<string, number> = { ArrowRight: n + 1, ArrowDown: n + 1, ArrowLeft: n - 1, ArrowUp: n - 1, Home: 0, End: ROLES.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      pick(map[e.key], true);
    }
  }

  const role = ROLES[active];
  const Screen = SCREENS[role.key];

  return (
    <div className={styles.roles} ref={ref}>
      <div>
        <div className={styles.tabs} role="tablist" aria-label="Who sees what">
          {ROLES.map((r, n) => (
            <button
              key={r.key}
              ref={(el) => {
                tabs.current[n] = el;
              }}
              type="button"
              role="tab"
              id={`role-tab-${r.key}`}
              aria-selected={n === active}
              aria-controls="role-panel"
              tabIndex={n === active ? 0 : -1}
              className={`${styles.tab} ${n === active ? styles.tabOn : ""}`}
              onClick={() => pick(n)}
              onKeyDown={(e) => onKey(e, n)}
            >
              <Icon name={r.icon} size={18} />
              {r.name}
              {n === active && auto && visible ? <span key={active} className={styles.timer} aria-hidden="true" /> : null}
            </button>
          ))}
        </div>

        <div id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${role.key}`} key={role.key} className={styles.copy}>
          <span className={styles.device_}>{role.device}</span>
          <h3>{role.title}</h3>
          <ul>
            {role.points.map((p, i) => (
              <li key={p} style={{ ["--i" as string]: i }}>
                <Icon name="check" size={15} strokeWidth={2.4} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.halo} />
        <div key={role.key} className={styles.screenWrap} data-tilt="5">
          <Screen />
        </div>
      </div>
    </div>
  );
}
