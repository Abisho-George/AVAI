import type { Metadata } from "next";
import styles from "./page.module.css";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { Icon, IconTile } from "@/components/Icon";
import { NeverList } from "@/components/NeverList";

export const metadata: Metadata = {
  title: "About Avai",
  description:
    "Avai is built and owned by INAT Venture Pvt Ltd. It started from a plain observation: every school in India already produces the data needed to know exactly where a student is stuck.",
};

/** Header graphic: the same student, read two ways. Decorative; the page text says it. */
function TwoReadings() {
  return (
    <div className={styles.readings} aria-hidden="true">
      <div className={styles.reading}>
        <span className={styles.readingLabel}>
          <Icon name="paper" size={15} /> A report card says
        </span>
        <div className={styles.reportRow}>
          <span>Mathematics</span>
          <b>42 / 80</b>
        </div>
        <div className={styles.reportVerdict}>Needs more practice</div>
      </div>
      <div className={styles.readingArrow}>
        <Icon name="arrow-right" size={18} />
      </div>
      <div className={`${styles.reading} ${styles.readingAvai}`}>
        <span className={styles.readingLabel}>
          <Icon name="finding" size={15} /> Avai says
        </span>
        <div className={styles.tierBars}>
          <span>
            Recall <i style={{ ["--w" as string]: "88%" }} className={styles.tealBar} />
          </span>
          <span>
            Understanding <i style={{ ["--w" as string]: "74%" }} className={styles.blueBar} />
          </span>
          <span>
            Application <i style={{ ["--w" as string]: "31%" }} className={styles.coralBar} />
          </span>
        </div>
        <div className={styles.reportVerdict}>
          An application gap, in Maths and in Science, worth roughly 60 Board marks
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        icon="building"
        title="Built from the data schools already have"
        lede="Every school already produces the data needed to see exactly where a student is stuck. Nobody extracts it, because by hand it is a week of work per class. Avai does it from one paper and one mark register."
        aside={<TwoReadings />}
      />

      <section>
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="chip">
              <Icon name="spark" size={16} /> Our story
            </p>
            <h2>Why we started</h2>
          </div>
          <ol className={styles.story}>
            <li data-reveal>
              <span className={styles.storyN}>01</span>
              <div>
                <h3>The observation</h3>
                <p>
                  Every school in India already produces the data needed to know exactly where a
                  student is stuck: a question paper and a register of marks.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span className={styles.storyN}>02</span>
              <div>
                <h3>The problem</h3>
                <p>
                  Nobody extracts it, because by hand it is a week of work per class. So the
                  report card stops at the subject total, and the cause stays hidden.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span className={styles.storyN}>03</span>
              <div>
                <h3>What we built</h3>
                <p>
                  Avai reads one mapped paper and one mark register, and names the competency
                  costing marks, how urgent it is for the Board, and how sure it is.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2" data-reveal>
            <h2>Why this, and not another practice app</h2>
          </div>
          <div className="split-3" data-stagger>
            <div className="card lift feature">
              <IconTile name="layers" tone="blue" />
              <h3>More questions is not the gap</h3>
              <p>
                There is no shortage of products that give a student more questions. Almost nothing
                tells a school which questions are worth doing.
              </p>
            </div>
            <div className="card lift feature">
              <IconTile name="scorecard" tone="gold" />
              <h3>Report cards stop at the total</h3>
              <p>
                42 out of 80 hides that every lost mark was an application question. Everything
                in the market stops at the subject total.
              </p>
            </div>
            <div className="card lift feature">
              <IconTile name="target" />
              <h3>Avai names the gap across subjects</h3>
              <p>
                The same weakness in Science but not Social Science, recurring in four
                consecutive Board papers, worth roughly sixty Board marks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band-ink">
        <div className="wrap">
          <div className="head-2" data-reveal>
            <h2>What makes it hard to copy</h2>
            <p>
              Not the mark extraction, and not the tagging on its own. Both are becoming commodity
              capability.
            </p>
          </div>
          <div className="split-2" data-stagger>
            <div className="card feature">
              <IconTile name="layers" />
              <h3>One schema, every subject</h3>
              <p>
                One consistent two-layer schema applied across every subject a student takes,
                married to verified marks, producing a cross-subject view. A competitor who
                dashboards subject totals is answering a shallower question.
              </p>
            </div>
            <div className="card feature">
              <IconTile name="shield" tone="gold" />
              <h3>It admits its limits</h3>
              <p>
                Avai reports when it cannot explain a problem, and criticises question papers that
                cannot support the conclusions drawn from them. Copying that means admitting
                limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className={styles.vm} data-stagger>
            <div className={`${styles.vmCard} ${styles.vision}`}>
              <IconTile name="eye" size={48} />
              <span className={styles.vmLabel}>Our vision</span>
              <p className={styles.vmText}>
                Every school knows exactly what is stopping each of its students from scoring
                higher.
              </p>
            </div>
            <div className={`${styles.vmCard} ${styles.mission}`}>
              <IconTile name="target" tone="gold" size={48} />
              <span className={styles.vmLabel}>Our mission</span>
              <p className={styles.vmText}>
                Turn the exams schools already run into named, honest findings a principal can act
                on, without a single new exam.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="chip">
              <Icon name="shield" size={16} /> Our promises
            </p>
            <h2>What Avai never does</h2>
            <p>Six lines we do not cross. Hover or tap any of them.</p>
          </div>
          <NeverList />
          <div className={`card ${styles.gov}`} data-reveal>
            <IconTile name="school" size={40} />
            <span>
              <b>The government-school programme</b>
              District administration has expressed support for a free diagnostics and
              scholarship programme across government schools. Government schools pay nothing.
            </span>
          </div>
        </div>
      </section>

      <CtaBand
        className="band-2"
        title="Work with us"
        description="Schools, districts and researchers are all welcome to get in touch."
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />
    </>
  );
}
