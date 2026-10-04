import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { CountUp } from "@/components/CountUp";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import { WeekTimeline, type Week } from "@/components/WeekTimeline";

export const metadata: Metadata = {
  title: "Pilot programme: six weeks on the exams you already run",
  description:
    "Classes 10 and 12, the Board-examination years, where a diagnosis still has time to change an outcome.",
};

const WEEKS: Week[] = [
  {
    n: "W1",
    icon: "school",
    title: "Set up the school",
    short: "Set up",
    body: "Standards, sections, subjects and staff. Teachers are given assignments (class teacher of a section, subject teacher across sections), which is what scopes everything they later see.",
  },
  {
    n: "W2",
    icon: "blueprint",
    title: "Map a paper",
    short: "Map a paper",
    body: "You send one question paper for an exam already scheduled. We map every question to the Board blueprint on both layers and return the diagnostic-strength report on the paper itself.",
  },
  {
    n: "W3",
    icon: "scorecard",
    title: "Run the exam as normal",
    short: "Run the exam",
    body: "Teachers mark as they always have, then transcribe question-wise marks onto the structured scorecard. Roughly an hour per subject per section.",
  },
  {
    n: "W4",
    icon: "scan",
    title: "Confirm and analyse",
    short: "Confirm",
    body: "Scorecards are scanned and read. Teachers confirm the extracted marks on screen. Analysis runs.",
  },
  {
    n: "W5",
    icon: "users",
    title: "Review findings together",
    short: "Review",
    body: "We sit with your principal and heads of department in front of the findings. This session matters more than any demo. It is where a school decides whether the diagnosis matches what they already suspected.",
  },
  {
    n: "W6",
    icon: "share",
    title: "Issue reports, decide what to share",
    short: "Share",
    body: "Reports are issued per student. The school decides which are shared, and when. Term 1 can go out while Term 2 waits for a parent meeting.",
  },
];

const NEED: { icon: IconName; text: string }[] = [
  { icon: "paper", text: "One question paper per subject, before the exam is marked" },
  { icon: "scorecard", text: "Your existing mark register, transcribed onto our scorecard" },
  { icon: "users", text: "A verified headcount: CBSE List of Candidates or DGE registration" },
  { icon: "clock", text: "About an hour of each subject teacher’s time per exam" },
  { icon: "chat", text: "One review session with school leadership" },
];

const GET: { icon: IconName; text: string }[] = [
  { icon: "gauge", text: "A diagnostic-strength report on each paper you set" },
  { icon: "finding", text: "Ranked findings at school, class and section level" },
  { icon: "target", text: "An intervention plan for the cohort, ordered by marks exposure" },
  { icon: "user", text: "An individual report per student, yours to share or hold" },
  { icon: "layers", text: "Named risk and potential groups, with confidence attached" },
];

/** Header graphic: the six weeks ticking off in a loop. Decorative. */
function WeeksCard() {
  return (
    <div className={styles.weeksCard} aria-hidden="true">
      <div className={styles.weeksHead}>
        <span>
          <Icon name="calendar" size={16} /> Pilot plan
        </span>
        <span className={styles.weeksTag}>Class X</span>
      </div>
      <ul className={styles.weeksList}>
        {WEEKS.map((w, i) => (
          <li key={w.n} style={{ ["--i" as string]: i }}>
            <span className={styles.weeksN}>{w.n}</span>
            <span className={styles.weeksTitle}>{w.title}</span>
            <span className={styles.weeksTick}>
              <Icon name="check" size={12} strokeWidth={3} />
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.weeksBar}>
        <span />
      </div>
    </div>
  );
}

export default function PilotPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pilot programme"
        icon="flag"
        title="Six weeks, on the exams you already run"
        lede="Classes 10 and 12 are the Board-examination years, where a diagnosis still has time to change an outcome. A pilot attaches to an exam already on your calendar."
        aside={<WeeksCard />}
      />

      <section className="snug band-2">
        <div className="wrap">
          <div className={`stats ${styles.stats}`} data-stagger>
            <div className={`stat ${styles.stat}`}>
              <IconTile name="calendar" />
              <b>
                <CountUp value={6} />
              </b>
              <span>weeks from set-up to student reports</span>
            </div>
            <div className={`stat ${styles.stat}`}>
              <IconTile name="school" tone="blue" />
              <b>X &amp; XII</b>
              <span>Board-examination years</span>
            </div>
            <div className={`stat ${styles.stat}`}>
              <IconTile name="pen-off" tone="gold" />
              <b>
                <CountUp value={0} />
              </b>
              <span>new exams a school has to write</span>
            </div>
            <div className={`stat ${styles.stat}`}>
              <IconTile name="clock" tone="blue" />
              <b>~1 hr</b>
              <span>of teacher time per exam</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2" data-reveal>
            <h2>What the six weeks look like</h2>
            <p>Pick a week. Nothing here asks a school to change how it teaches or examines.</p>
          </div>
          <div data-reveal>
            <WeekTimeline weeks={WEEKS} />
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2" data-reveal>
            <h2>A fair exchange</h2>
            <p>What a pilot asks of your school, and what comes back.</p>
          </div>
          <div className={styles.exchange}>
            <div className={`card ${styles.side}`} data-reveal>
              <p className={styles.sideHead}>
                <IconTile name="send" tone="blue" size={40} />
                What we need from you
              </p>
              <ul className={styles.iconList} data-stagger>
                {NEED.map((item) => (
                  <li key={item.text}>
                    <Icon name={item.icon} size={18} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.swap} aria-hidden="true">
              <Icon name="arrow-right" size={22} />
            </div>
            <div className={`card ${styles.side} ${styles.sideGet}`} data-reveal style={{ ["--d" as string]: "0.15s" }}>
              <p className={styles.sideHead}>
                <IconTile name="finding" size={40} />
                What you get back
              </p>
              <ul className={styles.iconList} data-stagger>
                {GET.map((item) => (
                  <li key={item.text}>
                    <Icon name={item.icon} size={18} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band-ink">
        <div className="wrap">
          <div className="split" data-stagger>
            <div>
              <IconTile name="eye" size={48} />
              <h2 style={{ marginTop: 18 }}>Evaluating a pilot?</h2>
              <p>
                We are happy to speak to schools evaluating the pilot. Start with the sample
                dashboard: it shows the same findings, signals and honesty notes your leadership
                would see.
              </p>
              <p>
                <Link className="btn btn-line" href="/portal/dashboard">
                  Open the sample dashboard
                  <Icon name="arrow-right" size={15} strokeWidth={2.2} className="btn-ic" />
                </Link>
              </p>
            </div>
            <div className="card">
              <IconTile name="research" tone="gold" />
              <h3 style={{ marginTop: 14 }}>The government-school track</h3>
              <p>
                Findings from government schools feed the scholarship identification work
                published openly under Yaadhum. That research runs on separately consented,
                anonymised data. It is never fed by the commercial pipeline.
              </p>
              <p>
                <Link href="/about#yaadhum" style={{ color: "var(--gold)" }}>
                  About the Yaadhum research
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Join the next cohort"
        description="Tell us your board, district and grade sizes. We will tell you honestly whether a pilot makes sense this term."
        ctaLabel="Request a pilot"
        ctaHref="/contact"
      />
    </>
  );
}
