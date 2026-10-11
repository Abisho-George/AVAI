import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { HeroStage } from "@/components/HeroStage";
import { AttainmentBar } from "@/components/AttainmentBar";
import { CtaBand } from "@/components/CtaBand";
import { CountUp } from "@/components/CountUp";
import { HonestyCompare } from "@/components/HonestyCompare";
import { Icon, IconTile } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Avai | What is stopping students from scoring higher?",
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
              <p className="chip enter">
                <span className="live-dot" aria-hidden="true" /> A diagnostic layer on the exams you
                already run
              </p>
              <h1 className="enter" style={{ ["--d" as string]: "0.08s" }}>
                What is stopping students from scoring higher?
              </h1>
              <p className="lede enter" style={{ ["--d" as string]: "0.16s" }}>
                Avai reads question-wise marks against a Board-mapped question paper and names
                the competency costing your students marks: how many it affects, how urgent it
                is for the Board, and how sure we are.
              </p>
              <div className={`${styles.ctaRow} enter`} style={{ ["--d" as string]: "0.24s" }}>
                <Link className="btn btn-primary" href="/contact">
                  Request a pilot
                  <Icon name="arrow-right" size={16} strokeWidth={2.2} className="btn-ic" />
                </Link>
                <Link className="btn btn-line" href="/portal/dashboard">
                  <Icon name="eye" size={16} /> See a sample finding
                </Link>
              </div>
              <ul className={`${styles.promises} enter`} style={{ ["--d" as string]: "0.32s" }}>
                <li>
                  <Icon name="pen-off" size={16} /> No new exams
                </li>
                <li>
                  <Icon name="numbers" size={16} /> Reads numbers, never answers
                </li>
                <li>
                  <Icon name="no-rank" size={16} /> No ranks shown to students
                </li>
              </ul>
            </div>
            <HeroStage />
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2" data-reveal>
            <h2>A report card tells you a student scored 42 out of 80.</h2>
            <p className="lede">
              It doesn&rsquo;t tell you that all 38 lost marks were application questions, that
              the same pattern shows up in Science but not in Social Science, or that the
              competency behind it has appeared in four of the last four Board papers.
            </p>
          </div>
          <div className="split-2" data-stagger>
            <div className="card lift">
              <h3 className={styles.cardHead}>
                <IconTile name="scorecard" tone="gold" size={36} /> What a mark register says
              </h3>
              <div className={styles.bars}>
                <AttainmentBar label="Mathematics" percent={52} value="42/80" tone="coral" />
                <AttainmentBar label="Science" percent={61} value="49/80" tone="gold" />
                <AttainmentBar label="Social Science" percent={79} value="63/80" tone="teal" />
              </div>
              <p className="small" style={{ marginTop: 18 }}>
                Conclusion available: <em>needs more practice in Maths.</em>
              </p>
            </div>
            <div className={`card lift ${styles.avaiCard}`}>
              <h3 className={styles.cardHead}>
                <IconTile name="finding" size={36} /> What Avai says
              </h3>
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


      <section className="band-ink">
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className={`chip ${styles.chipDark}`}>
              <Icon name="shield" size={16} /> The honesty rules
            </p>
            <h2>The unusual part: Avai tells you when it doesn&rsquo;t know</h2>
            <p>
              Every analytics product you have been shown produces an answer for every question.
              That is a design choice, and it is the wrong one. A confident wrong diagnosis costs
              a school a term.
            </p>
          </div>
          <div data-reveal>
            <HonestyCompare />
          </div>
          <p style={{ marginTop: 30 }}>
            <Link className="btn btn-line" href="/how-it-works">
              How Avai reasons
              <Icon name="arrow-right" size={15} strokeWidth={2.2} className="btn-ic" />
            </Link>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2" data-reveal>
            <h2>What a pilot asks of a school</h2>
          </div>
          <div className={`stats ${styles.stats}`} data-stagger>
            <div className={`stat ${styles.stat}`}>
              <IconTile name="paper" />
              <b>
                <CountUp value={1} />
              </b>
              <span>question paper and one mark register to start</span>
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
          <Link className={`btn btn-line ${styles.pilotLink}`} href="/pilot">
            What a pilot actually involves
            <Icon name="arrow-right" size={15} strokeWidth={2.2} className="btn-ic" />
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
