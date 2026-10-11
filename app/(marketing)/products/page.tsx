import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { PageHeader } from "@/components/PageHeader";
import { ProductNav } from "@/components/ProductNav";
import { PaperBuilder } from "@/components/PaperBuilder";
import { CbseFour } from "@/components/CbseFour";
import { TopicDrill } from "@/components/TopicDrill";
import { ClassProgrammes } from "@/components/ClassProgrammes";
import { CtaBand } from "@/components/CtaBand";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import { SchoolDoodles } from "@/components/SchoolDoodles";

export const metadata: Metadata = {
  title: "Products | Avai",
  description:
    "The Question Paper Engine builds CBSE papers to the Board's own design. Avai Diagnostics reads the marks down to the topic. BoardX builds a profile of every student from Class 9 to Class 12.",
};

const TRIO: { icon: IconName; name: string; line: string; tone: "gold" | "teal" | "blue" }[] = [
  { icon: "paper", name: "Question Paper Engine", line: "Builds the paper to the Board's design", tone: "gold" },
  { icon: "search", name: "Avai Diagnostics", line: "Reads the marks down to the topic", tone: "teal" },
  { icon: "user", name: "BoardX", line: "A profile of every student, Class 9 to 12", tone: "blue" },
];

/** Header graphic: the three products stacked, joined by the flow between them. */
function Trio() {
  return (
    <div className={styles.trio} aria-hidden="true">
      {TRIO.map((p, i) => (
        <div key={p.name} className={styles.trioCard} style={{ ["--i" as string]: i }}>
          <IconTile name={p.icon} tone={p.tone} size={44} />
          <span>
            <b>{p.name}</b>
            <span>{p.line}</span>
          </span>
          <span className={styles.trioN}>0{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

const STEPS = [
  { n: "01", title: "Select", body: "Class, subject, paper type and the chapters the class has covered. Nothing else is asked of the teacher." },
  { n: "02", title: "Review", body: "The engine proposes the mark split and the cognitive mix, both derived from CBSE. The academic head approves or adjusts." },
  { n: "03", title: "Generate", body: "The paper, its marking scheme and its design report are produced together, as one set." },
];

const DOCS = [
  {
    icon: "paper" as IconName,
    name: "The question paper",
    body: "Set to the Board's own section order, numbering, mark values, word limits and internal-choice pattern.",
  },
  {
    icon: "check-circle" as IconName,
    name: "The marking scheme",
    body: "Step-wise marks, accepted alternate forms and working, value points for descriptive answers, and the split inside every multi-part question, so the same answer earns the same mark in two different hands.",
  },
  {
    icon: "search" as IconName,
    name: "The design report",
    body: "Question by question, against references anyone can open: this one is from NCERT, this one from a Board set, this one is constructed. Written to be handed to a parent unamended.",
  },
];

const FLOW: { icon: IconName; title: string; body: string }[] = [
  { icon: "paper", title: "The paper is built", body: "Every question already carries its chapter, its concept and its cognitive band." },
  { icon: "school", title: "The school runs the exam", body: "Conducted and corrected exactly as it normally would be." },
  { icon: "search", title: "The marks are read", body: "Question-wise marks are read at concept and topic level the moment they are entered." },
  { icon: "user", title: "The profile grows", body: "Each test adds to every student's record, term after term, Class 9 to Class 12." },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        icon="layers"
        title="Three products. One record of every student."
        lede="Build the paper to the Board's own design. Read the marks it produces down to the topic. Build a profile of every student from Class 9 to Class 12. Each works on its own, and together they are one system."
        aside={<Trio />}
      />

      <ProductNav />

      <section id="papers" className={styles.anchor}>
        <div className="wrap">
          <div className={styles.intro} data-reveal>
            <div>
              <p className="kicker">01 · Question Paper Engine</p>
              <h2>
                Your unit test in August is meant to tell you what{" "}
                <span className="grad-text">March will look like.</span>
              </h2>
            </div>
            <p className="lede">
              If a paper is not built the way the Board builds, it is telling you about a different
              examination. We build CBSE papers, for the full syllabus or only the chapters a class
              has finished, to the Board&rsquo;s own published design. Every paper carries a marking
              scheme and a design report that shows the working, question by question.
            </p>
          </div>

          <div data-reveal>
            <PaperBuilder />
          </div>

          <ol className={styles.steps} data-stagger>
            {STEPS.map((s) => (
              <li key={s.n} className="card">
                <span className={styles.stepN}>Step {s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>

          <blockquote className={styles.callout} data-reveal>
            <Icon name="spark" size={22} />
            <p>
              Nothing here asks anything new of a teacher. What the engine removes is the part that
              is arithmetic and audit: deriving a defensible mark split, coding every question to a
              competency band, and writing a marking scheme that will hold across two correctors.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="kicker">Built to the Board</p>
            <h2>Four things CBSE fixes, and we match</h2>
            <p>None of them is a paper setter&rsquo;s choice.</p>
          </div>
          <CbseFour />

          <div className={styles.docs}>
            <div className="head-2" data-reveal>
              <h3 className={styles.docsTitle}>Three documents, produced together and delivered as one set</h3>
            </div>
            <div className={styles.docGrid} data-stagger>
              {DOCS.map((d) => (
                <div key={d.name} className={`card ${styles.doc}`} data-tilt="4">
                  <span className={styles.docIcon}>
                    <Icon name={d.icon} size={22} />
                  </span>
                  <h3>{d.name}</h3>
                  <p>{d.body}</p>
                  <span className={styles.docLines} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              ))}
            </div>
            <p className={styles.delivered} data-reveal>
              <Icon name="check-circle" size={16} /> Delivered so far: six Class X subjects for Session
              2026 to 27, each an 80-mark unit test. Class XII is built on the same method.
            </p>
          </div>
        </div>
      </section>

      <section id="diagnostics" className={styles.anchor}>
        <div className="wrap">
          <div className={styles.diag}>
            <div data-reveal>
              <p className="kicker">02 · Avai Diagnostics</p>
              <h2>Read the marks down to the topic</h2>
              <p className="lede">
                Avai reads the question-wise marks from a school&rsquo;s own exams and returns a
                concept-level account of performance: per student, per class, and section to
                section.
              </p>
              <ul className={styles.ticks}>
                <li>
                  <Icon name="book" size={16} /> Which chapter, which topic inside it, which question
                </li>
                <li>
                  <Icon name="target" size={16} /> Recall, understanding and application, told apart
                </li>
                <li>
                  <Icon name="flag" size={16} /> Weighted by how often the Board asks it
                </li>
                <li>
                  <Icon name="shield" size={16} /> And an honest note when the evidence is thin
                </li>
              </ul>
              <p className={styles.small}>
                It sets no exam of its own, issues no score of its own, and does not rank students
                against one another.
              </p>
              <div className={styles.links}>
                <Link className="btn btn-primary" href="/portal/dashboard">
                  Open the sample dashboard
                  <Icon name="arrow-right" size={15} strokeWidth={2.2} className="btn-ic" />
                </Link>
                <Link className="btn btn-line" href="/how-it-works">
                  How it reasons
                </Link>
              </div>
            </div>
            <div data-reveal="zoom" style={{ ["--d" as string]: "0.1s" }}>
              <TopicDrill />
            </div>
          </div>
        </div>
      </section>

      <section id="boardx" className={`band-2 ${styles.anchor}`}>
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="kicker">03 · BoardX</p>
            <h2>
              Four years. <span className="grad-text">One record.</span>
            </h2>
            <p>
              A school already generates everything it needs to know about its students. Every unit
              test, half-yearly and pre-board carries a detailed record of what each child can and
              cannot do, and that record is discarded within a week of the paper being returned.
              BoardX keeps it, and builds a profile of every student across five dimensions.
            </p>
          </div>
          <div data-reveal>
            <ClassProgrammes />
          </div>
        </div>
      </section>

      <section className="band-ink has-doodles">
        <SchoolDoodles variant="dark" />
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="kicker">One system</p>
            <h2>A paper from the engine arrives already tagged</h2>
            <p>
              So its marks can be read at concept level the moment they are entered. Either product
              works on its own; together, nothing is typed twice.
            </p>
          </div>
          <ol className={styles.flow} data-stagger>
            {FLOW.map((f, i) => (
              <li key={f.title}>
                <span className={styles.flowIcon}>
                  <Icon name={f.icon} size={22} />
                </span>
                <span className={styles.flowN}>0{i + 1}</span>
                <b>{f.title}</b>
                <span>{f.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Start with one class and one subject"
        description="Tell us the class, the subjects and the chapters to be examined, or ask for a full-syllabus paper. We will tell you honestly what makes sense this term."
        ctaLabel="Talk to us"
        ctaHref="/contact"
      />
    </>
  );
}
