import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { HeroLoop } from "@/components/HeroLoop";
import { AttainmentBar } from "@/components/AttainmentBar";
import { SignalExplorer } from "@/components/SignalExplorer";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Avai — what is stopping students from scoring higher?",
  description:
    "Avai reads question-wise marks against a Board-mapped question paper and names the competency costing your students marks, how urgent it is, and how sure it is.",
};

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className="wrap">
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>A diagnostic layer on the exams you already run</p>
              <h1>What is stopping students from scoring higher?</h1>
              <p className="lede">
                Avai reads question-wise marks against a Board-mapped question paper and names
                the competency costing your students marks — how many it affects, how urgent it
                is for the Board, and how sure we are.
              </p>
              <div className={styles.ctaRow}>
                <Link className="btn btn-primary" href="/contact">
                  Request a pilot
                </Link>
                <Link className="btn btn-line" href="/findings">
                  See a sample finding
                </Link>
              </div>
              <p className="small" style={{ marginTop: 22 }}>
                Running now in 5 CBSE schools across Krishnagiri district, Tamil Nadu.
              </p>
            </div>
            <HeroLoop />
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2">
            <h2>A report card tells you a student scored 42 out of 80.</h2>
            <p className="lede">
              It doesn&rsquo;t tell you that all 38 lost marks were application questions, that
              the same pattern shows up in Science but not in Social Science, or that the
              competency behind it has appeared in four of the last four Board papers.
            </p>
          </div>
          <div className="split-2">
            <div className="card">
              <h3>What a mark register says</h3>
              <div className={styles.bars}>
                <AttainmentBar label="Mathematics" percent={52} value="42/80" tone="coral" />
                <AttainmentBar label="Science" percent={61} value="49/80" tone="gold" />
                <AttainmentBar label="Social Science" percent={79} value="63/80" tone="teal" />
              </div>
              <p className="small" style={{ marginTop: 18 }}>
                Conclusion available: <em>needs more practice in Maths.</em>
              </p>
            </div>
            <div className="card" style={{ borderColor: "var(--teal)" }}>
              <h3>What Avai says</h3>
              <div className={styles.bars}>
                <AttainmentBar label="Recall tier" percent={88} value="88%" tone="teal" />
                <AttainmentBar label="Understanding tier" percent={74} value="74%" tone="blue" />
                <AttainmentBar label="Application tier" percent={31} value="31%" tone="coral" />
                <AttainmentBar label="…same in Science" percent={34} value="34%" tone="coral" />
                <AttainmentBar label="…but not Social Sci." percent={81} value="81%" tone="teal" />
              </div>
              <p className="small" style={{ marginTop: 18 }}>
                Conclusion available:{" "}
                <em>a transferable application gap, worth roughly 60 Board marks.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2">
            <h2>Three signals that never collapse into one colour</h2>
            <p>
              Most dashboards merge everything into a single red-amber-green. Avai keeps them
              apart, because &ldquo;this matters a lot for the Board&rdquo; and &ldquo;we are sure
              this is real&rdquo; are different claims, and a principal deserves to see when they
              disagree.
            </p>
          </div>
          <SignalExplorer />
        </div>
      </section>

      <section className="band-ink">
        <div className="wrap">
          <div className="head-2">
            <h2>The unusual part: Avai tells you when it doesn&rsquo;t know</h2>
            <p>
              Every analytics product you have been shown produces an answer for every question.
              That is a design choice, and it is the wrong one. A confident wrong diagnosis costs
              a school a term.
            </p>
          </div>
          <div className="split-2">
            <div className="card">
              <h3>Cause not localised</h3>
              <p>
                The problem is confirmed and the marks loss is real, but no single subtopic or
                question pattern explains it. Avai recommends a manual answer-script review
                instead of prescribing an intervention it hasn&rsquo;t earned.
              </p>
            </div>
            <div className="card">
              <h3>Paper under-tests this area</h3>
              <p>
                Avai will criticise your own question paper. If a test carried too few application
                questions to judge application readiness, it says so and marks every related
                finding as lower-strength.
              </p>
            </div>
            <div className="card">
              <h3>No dominant common blocker</h3>
              <p>
                When a performance band genuinely has no shared cause, Avai reports exactly that
                rather than inventing a tidy one to fill the card.
              </p>
            </div>
            <div className="card">
              <h3>Section gaps are never teaching quality</h3>
              <p>
                Section comparisons carry an explicit non-attribution note. Avai describes tested
                performance on one assessment. It does not evaluate teachers, and it never will.
              </p>
            </div>
          </div>
          <p style={{ marginTop: 30 }}>
            <Link className="btn btn-line" href="/how-it-works">
              How Avai reasons
            </Link>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2">
            <h2>Running now in Krishnagiri</h2>
          </div>
          <div className="stats">
            <div className="stat">
              <b>5</b>
              <span>CBSE schools, onboarded one per week</span>
            </div>
            <div className="stat">
              <b>X &amp; XII</b>
              <span>Board-examination years</span>
            </div>
            <div className="stat">
              <b>0</b>
              <span>new exams a school has to write</span>
            </div>
            <div className="stat">
              <b>~1 hr</b>
              <span>of teacher time per exam</span>
            </div>
          </div>
          <div className="quote">
            <p>
              The District Collector has expressed support for a free diagnostics and scholarship
              programme in government schools across the district.
            </p>
            <cite>Thiru C. Dinesh Kumar, District Collector, Krishnagiri</cite>
          </div>
          <Link className="btn btn-line" href="/pilot">
            What a pilot actually involves
          </Link>
        </div>
      </section>

      <CtaBand
        className="band-2"
        title="Bring Avai to your school"
        description="Send us one question paper and one mark register. We will send back the findings from your own students."
        ctaLabel="Request a pilot"
        ctaHref="/contact"
        mascotPose="achieve"
      />
    </>
  );
}
