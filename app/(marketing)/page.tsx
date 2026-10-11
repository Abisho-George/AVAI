import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { HeroStage } from "@/components/HeroStage";
import { HonestyCompare } from "@/components/HonestyCompare";
import { Icon } from "@/components/Icon";
import { SchoolDoodles } from "@/components/SchoolDoodles";
import { ChapterTicker } from "@/components/ChapterTicker";
import { ReportMorph } from "@/components/ReportMorph";
import { ProductTour } from "@/components/ProductTour";
import { RoleViews } from "@/components/RoleViews";
import { ProductsStrip } from "@/components/ProductsStrip";
import { TwoStudents } from "@/components/TwoStudents";
import { ProfileTeaser } from "@/components/ProfileTeaser";
import { Mascot } from "@/components/Mascot";

export const metadata: Metadata = {
  title: "Avai | What is stopping students from scoring higher?",
  description:
    "Avai reads question-wise marks against a Board-mapped question paper and names the competency costing your students marks, how urgent it is, and how sure it is.",
};

export default function Home() {
  return (
    <>
      <section className={`${styles.hero} has-doodles`}>
        <SchoolDoodles variant="hero" />
        <div className="wrap">
          <div className={styles.heroGrid}>
            <div>
              <p className="chip enter">
                <span className="live-dot" aria-hidden="true" /> A diagnostic layer on the exams you
                already run
              </p>
              <h1 className="enter" style={{ ["--d" as string]: "0.08s" }}>
                What is stopping students from <span className="grad-text">scoring higher?</span>
              </h1>
              <p className="lede enter" style={{ ["--d" as string]: "0.16s" }}>
                Avai reads the question-wise marks from the exams you already run and shows exactly
                which topic, in which chapter, is costing each student marks: how many it affects,
                how urgent it is for the Board, and how sure we are.
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
                  <Icon name="school" size={16} /> Classes 9 to 12
                </li>
                <li>
                  <Icon name="book" size={16} /> Built to the CBSE blueprint
                </li>
                <li>
                  <Icon name="pen-off" size={16} /> No extra tests
                </li>
                <li>
                  <Icon name="numbers" size={16} /> Reads numbers, never answers
                </li>
              </ul>
            </div>
            <HeroStage />
          </div>
        </div>
      </section>

      <ChapterTicker />

      <section className="band-2">
        <div className="wrap">
          <div className={`head-2 ${styles.center}`} data-reveal>
            <p className="kicker">Three products, one system</p>
            <h2>From the question paper to a profile of every student</h2>
            <p>
              Build the paper to the Board&rsquo;s design, read the marks it produces down to the
              topic, and keep a record of every student from Class 9 to Class 12. Each works on its
              own.
            </p>
          </div>
          <ProductsStrip />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className={styles.split}>
            <div data-reveal>
              <p className="kicker">The lost-marks problem</p>
              <h2>
                A report card tells you a student scored <span className="grad-text">42 out of 80.</span>
              </h2>
              <p className="lede">
                It doesn&rsquo;t tell you that all 38 lost marks were application questions, that
                the same pattern shows up in Science but not in Social Science, or that the
                competency behind it has appeared in four of the last four Board papers.
              </p>
              <p className="lede">
                Avai goes one step further: which topic, inside which chapter, the marks went on.
              </p>
              <p className={styles.hint}>
                <Icon name="cursor" size={15} /> Switch between the report card, the tiers and the
                topics.
              </p>
            </div>
            <div data-reveal="zoom" style={{ ["--d" as string]: "0.1s" }}>
              <ReportMorph />
            </div>
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className={styles.split}>
            <div data-reveal>
              <p className="kicker">Same mark, opposite problem</p>
              <h2>Two students score 65. Your mark sheet cannot tell them apart.</h2>
              <p className="lede">
                One has an execution problem, the other a concept problem. They need opposite help,
                and today they get the same revision class.
              </p>
              <p>
                Avai separates them from the marks you already have, before March, while there is
                still time to give each the right kind of help.
              </p>
            </div>
            <div data-reveal style={{ ["--d" as string]: "0.1s" }}>
              <TwoStudents />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.tourBand}>
        <div className="wrap">
          <div className={`head-2 ${styles.center}`} data-reveal>
            <p className="kicker">Inside Avai</p>
            <h2>From a finding to a student, in four clicks</h2>
            <p>
              This is the school dashboard. Watch one finding travel from the principal&rsquo;s
              screen to a single student&rsquo;s report.
            </p>
          </div>
          <div data-reveal>
            <ProductTour />
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className={styles.teaserHead} data-reveal>
            <div>
              <p className="kicker">BoardX · a profile of every student</p>
              <h2>Five dimensions, read every year from Class 9 to Class 12</h2>
            </div>
            <Link className="btn btn-line" href="/products#boardx">
              See all four years
              <Icon name="arrow-right" size={15} strokeWidth={2.2} className="btn-ic" />
            </Link>
          </div>
          <div data-reveal>
            <ProfileTeaser />
          </div>
        </div>
      </section>

      <section className="band-ink has-doodles">
        <SchoolDoodles variant="dark" />
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="kicker">The honesty rules</p>
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
            <p className="kicker">Built for every desk in the school</p>
            <h2>One diagnosis, scoped three ways</h2>
            <p>
              What each person sees is clipped to what they are responsible for, and the student
              view is the narrowest thing Avai shows.
            </p>
          </div>
          <div data-reveal>
            <RoleViews />
          </div>
        </div>
      </section>

      <section className="band-2 has-doodles">
        <SchoolDoodles variant="header" />
        <div className="wrap">
          <div className={`${styles.ctaCard} glow-border`} data-reveal="zoom">
            <Mascot pose="achieve" size={220} />
            <div className={styles.ctaCopy}>
              <p className="kicker">Your school, next term</p>
              <h2>Bring Avai to your school</h2>
              <p>
                Send us one question paper and one mark register. We will send back the findings
                from your own students.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link className="btn btn-gold" href="/contact">
                Request a pilot
                <Icon name="arrow-right" size={16} strokeWidth={2.2} className="btn-ic" />
              </Link>
              <Link className="btn btn-line" href="/how-it-works">
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
