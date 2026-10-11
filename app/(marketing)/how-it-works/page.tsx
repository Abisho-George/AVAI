import type { Metadata } from "next";
import styles from "./page.module.css";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { StepsScroll, type Step } from "@/components/StepsScroll";
import { HonestyPanels } from "@/components/HonestyPanels";
import { PipelinePlayer } from "@/components/PipelinePlayer";
import { RingGauge } from "@/components/RingGauge";
import { SchoolDoodles } from "@/components/SchoolDoodles";
import { EvidenceNote } from "@/components/EvidenceNote";

export const metadata: Metadata = {
  title: "How Avai reasons: from a tagged paper to a named gap",
  description:
    "Avai adds no exams, grades no answers, and never reads what a student wrote. Five steps from a Board-mapped question paper to a named, evidenced finding.",
};

const STEPS: Step[] = [
  {
    icon: "blueprint",
    title: "The paper is mapped to the Board blueprint",
    summary: "Every question gets a curriculum tag and an assessment-demand tag.",
    body: [
      "Every question is tagged on two layers. Curriculum: subject, class, chapter, board unit, concept family, concept variant, prerequisite concept. Assessment demand: competency tier, complexity, dependency level.",
      "This turns “Question 14” into “Class 10 Maths, Quadratic Equations, applying tier, moderate complexity, depends on factorisation.” Tagging is model-assisted with a two-pass agreement check, so ambiguous or low-confidence tags are caught before they enter the pipeline.",
      "A paper built by our Question Paper Engine arrives already tagged, so this step is done before the exam is printed.",
    ],
  },
  {
    icon: "scorecard",
    title: "Teachers enter marks the way they already do",
    summary: "Question-wise marks on a structured scorecard, scanned, checked and confirmed.",
    body: [
      "Teachers mark the paper as normal, then transcribe question-wise marks onto a pre-printed structured scorecard, with one box per question and sections mirroring the paper. Scorecards are scanned and read automatically.",
      "Four checks run on every scorecard before it is accepted: question marks sum to the declared total, each mark is within range for that question, the roll number resolves to a real student, and a blank is distinguished from a zero. A student who didn't attempt a question is not the same as one who attempted and scored nothing.",
      "The teacher confirms the extracted marks on screen. That human check is deliberate. It keeps the pipeline honest and the cost low.",
    ],
  },
  {
    icon: "gauge",
    title: "Avai grades the paper before it grades the students",
    summary: "Coverage, application share and higher-order share, reported first.",
    body: [
      "Before producing a single finding, Avai reports on the assessment itself: blueprint coverage, the share of application questions against what the Board expects, and the share of higher-order questions. A paper that under-tests a competency cannot support a confident claim about that competency, and Avai says so on the finding rather than in a footnote.",
    ],
  },
  {
    icon: "finding",
    title: "Findings are produced, ranked, and held to evidence",
    summary: "Down to the topic inside each chapter, ranked by marks exposure, Board recurrence and confidence.",
    body: [
      "Performance is computed per concept, per topic inside each chapter, and per competency tier, across every subject a student takes. That is what makes a cross-subject pattern visible, and what tells a teacher exactly which topic to reteach. Findings are ranked by marks exposure, Board recurrence and confidence together, not by raw average.",
    ],
  },
  {
    icon: "share",
    title: "Reports are issued, then shared: two separate acts",
    summary: "Issuing freezes the diagnosis. Sharing needs a one-time PIN.",
    body: [
      "Issuing a report freezes the diagnosis. Sharing it with a student is a second, deliberate action that generates a one-time PIN. A school can share Term 1 and hold Term 2 back until a parent meeting without anyone inventing a workaround.",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className={`${styles.hero} has-doodles`}>
        <SchoolDoodles variant="header" />
        <div className="wrap">
          <PipelinePlayer
            intro={
              <>
                <p className="chip enter">
                  <Icon name="layers" size={16} /> How Avai reasons
                </p>
                <h1 className="enter" style={{ ["--d" as string]: "0.08s" }}>
                  From a tagged paper to a named gap
                </h1>
                <p className="lede enter" style={{ ["--d" as string]: "0.16s" }}>
                  Avai adds no exams and never reads what a student wrote. It reads a mapped
                  question paper, yours or one from our engine, and the marks your teachers already
                  gave.
                </p>
              </>
            }
          />
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2" data-reveal>
            <h2>Five steps, in detail</h2>
            <p>Scroll through the pipeline. Each step lights up as you reach it.</p>
          </div>
          <StepsScroll steps={STEPS} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="chip">
              <Icon name="gauge" size={16} /> Paper diagnostic strength
            </p>
            <h2>Can I trust this test to tell me anything?</h2>
            <p>
              The quality of the paper caps the quality of every conclusion, so Avai states it
              before any student finding.
            </p>
          </div>
          <div className="split-3" data-stagger>
            <div className="card lift">
              <RingGauge value={82} tone="teal" label="Blueprint coverage" caption="8 of 9 chapters" />
            </div>
            <div className="card lift">
              <RingGauge
                value={22}
                expected={30}
                tone="gold"
                label="Application questions"
                caption="Against 30% expected"
              />
            </div>
            <div className="card lift">
              <RingGauge
                value={10}
                expected={20}
                tone="gold"
                label="Higher-order questions"
                caption="Against 20% expected"
              />
            </div>
          </div>
          <div style={{ marginTop: 20 }} data-reveal>
            <EvidenceNote
              state="paper-under-tests"
              detail="This assessment included too few application questions to confidently assess application readiness. Application-related findings are marked lower-strength throughout."
            />
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="chip">
              <Icon name="shield" size={16} /> Honesty states
            </p>
            <h2>What Avai refuses to conclude</h2>
            <p>
              Four states where a lesser product would guess. None is styled as an error, because
              none of them is one. They are the accurate answer.
            </p>
          </div>
          <div data-reveal>
            <HonestyPanels />
          </div>
        </div>
      </section>

      <CtaBand
        className="band-ink"
        title="The full walkthrough: 24 screens"
        description="Every screen in the product, captured from the running build: principal, teacher and student."
        ctaLabel="Request the walkthrough"
        ctaHref="/contact"
      />
    </>
  );
}
