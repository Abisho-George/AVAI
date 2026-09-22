import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Pilot programme — five CBSE schools in Krishnagiri",
  description:
    "Onboarded one school per week. Classes 10 and 12, the Board-examination years, where a diagnosis still has time to change an outcome.",
};

const WEEKS = [
  {
    n: "W1",
    title: "Set up the school",
    body: "Standards, sections, subjects and staff. Teachers are given assignments — class teacher of a section, subject teacher across sections — which is what scopes everything they later see.",
  },
  {
    n: "W2",
    title: "Map a paper",
    body: "You send one question paper for an exam already scheduled. We map every question to the Board blueprint on both layers and return the diagnostic-strength report on the paper itself.",
  },
  {
    n: "W3",
    title: "Run the exam as normal",
    body: "Teachers mark as they always have, then transcribe question-wise marks onto the structured scorecard. Roughly an hour per subject per section.",
  },
  {
    n: "W4",
    title: "Confirm and analyse",
    body: "Scorecards are scanned and read. Teachers confirm the extracted marks on screen. Analysis runs.",
  },
  {
    n: "W5",
    title: "Review findings together",
    body: "We sit with your principal and heads of department in front of the findings. This session matters more than any demo — it is where a school decides whether the diagnosis matches what they already suspected.",
  },
  {
    n: "W6",
    title: "Issue reports, decide what to share",
    body: "Reports are issued per student. The school decides which are shared, and when. Term 1 can go out while Term 2 waits for a parent meeting.",
  },
];

export default function PilotPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pilot programme"
        title="Five CBSE schools in Krishnagiri"
        lede="Onboarded one school per week, so School 1 has already found the rough edges before School 5 arrives. Classes 10 and 12 — the Board-examination years, where a diagnosis still has time to change an outcome."
      />

      <section className="snug">
        <div className="wrap">
          <div className="stats">
            <div className="stat">
              <b>5</b>
              <span>CBSE schools, Krishnagiri district</span>
            </div>
            <div className="stat">
              <b>X &amp; XII</b>
              <span>Board-examination years</span>
            </div>
            <div className="stat">
              <b>1/week</b>
              <span>onboarding cadence</span>
            </div>
            <div className="stat">
              <b>~1 hr</b>
              <span>of teacher time per exam</span>
            </div>
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2">
            <h2>What the six weeks look like</h2>
            <p>
              Nothing here asks a school to change how it teaches or how it examines. Avai
              attaches to the exams already on the calendar.
            </p>
          </div>
          <div className="steps">
            {WEEKS.map((week) => (
              <div className="step" key={week.n}>
                <div className="step-n">{week.n}</div>
                <div>
                  <h3>{week.title}</h3>
                  <p>{week.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="split">
            <div>
              <h2>What we need from you</h2>
              <ul className="ticks">
                <li>One question paper per subject, before the exam is marked</li>
                <li>Your existing mark register, transcribed onto our scorecard</li>
                <li>A verified headcount — CBSE List of Candidates or DGE registration</li>
                <li>About an hour of each subject teacher&rsquo;s time per exam</li>
                <li>One review session with school leadership</li>
              </ul>
            </div>
            <div>
              <h2>What you get back</h2>
              <ul className="ticks">
                <li>A diagnostic-strength report on each paper you set</li>
                <li>Ranked findings at school, class and section level</li>
                <li>An intervention plan for the cohort, ordered by marks exposure</li>
                <li>An individual report per student, yours to share or hold</li>
                <li>Named risk and potential groups, with confidence attached</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band-ink">
        <div className="wrap">
          <div className="split">
            <div>
              <h2>Reference school</h2>
              <p>
                Bharat International Senior Secondary School, CBSE, Tamil Nadu. Classes X and XII,
                five sections in the Class X cohort. Happy to speak to schools evaluating the
                pilot.
              </p>
              <div className="quote" style={{ borderColor: "var(--gold)" }}>
                <p style={{ color: "#fff" }}>
                  The District Collector has expressed support for a free diagnostics and
                  scholarship programme in government schools across the district.
                </p>
                <cite style={{ color: "#8AA3C0" }}>
                  Thiru C. Dinesh Kumar, District Collector, Krishnagiri
                </cite>
              </div>
            </div>
            <div className="card">
              <h3>The government-school track</h3>
              <p>
                Findings from government schools feed the scholarship identification work
                published openly under Yaadhum. That research runs on separately consented,
                anonymised data — it is never fed by the commercial pipeline.
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
