import styles from "./page.module.css";
import { FindingCard } from "@/components/FindingCard";
import { SignalCluster } from "@/components/SignalCluster";
import { EvidencePanel } from "@/components/EvidencePanel";
import { AttainmentBar } from "@/components/AttainmentBar";
import { EvidenceNote } from "@/components/EvidenceNote";
import { StudentReportCard } from "@/components/StudentReportCard";

export default function ComponentsHealthPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Display components</h1>
      <p className={styles.intro}>
        The six components in <code>components/</code>, with the sample
        Quadratic Equations finding from <code>CLAUDE.md</code>. Screenshot
        this at 1280px and 390px before treating it as done.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>SignalCluster</h2>
        <p className={styles.sectionNote}>
          Three treatments that never merge. The second row is the case the
          UI must be able to show: very-high urgency with only an emerging
          confidence signal.
        </p>
        <div className={styles.stack}>
          <div className={styles.panel}>
            <SignalCluster
              attention="act"
              urgency={{ level: "vh", recurrence: "4/4 years" }}
              confidence={3}
            />
          </div>
          <div className={styles.panel}>
            <SignalCluster
              attention="inv"
              urgency={{ level: "vh", recurrence: "4/4 years" }}
              confidence={1}
            />
          </div>
          <div className={styles.panel}>
            <SignalCluster attention="track" urgency={{ level: "l", recurrence: "1/4 years" }} confidence={2} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>AttainmentBar</h2>
        <div className={styles.bars}>
          <AttainmentBar label="Recall tier" percent={88} value="88%" tone="teal" />
          <AttainmentBar label="Understanding tier" percent={74} value="74%" tone="blue" />
          <AttainmentBar label="Application tier" percent={31} value="31%" tone="coral" />
          <AttainmentBar label="X-C" percent={55} value="55%" tone="gold" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>EvidenceNote</h2>
        <p className={styles.sectionNote}>All four limited-evidence states. Calm information, never an error, never red.</p>
        <div className={styles.stack}>
          <EvidenceNote state="cause-not-localised" />
          <EvidenceNote state="paper-under-tests" />
          <EvidenceNote state="early-signal" />
          <EvidenceNote state="trend-not-available" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>FindingCard</h2>
        <div className={styles.grid2}>
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
            observation="61% of analysed students demonstrate the underlying concept but lose marks when the same concept appears in application-style questions."
            suggestedAction="application-focused revision, Board-style question practice"
          />
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
            observation="Students are consistently losing marks across this chapter, but no single subtopic, competency or question pattern explains enough of the loss to identify a reliable cause."
            suggestedAction="manual answer-script review before prescribing an intervention"
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>EvidencePanel</h2>
        <div style={{ maxWidth: 480, marginTop: "1.25rem" }}>
          <EvidencePanel
            questions={[
              { label: "Q7 · application, 3 marks", result: "58% partial credit" },
              { label: "Q12 · application, 4 marks", result: "41% attempted" },
              { label: "Concept MCQ Q2", result: "87% correct" },
            ]}
            conclusion="Students know the concept. They lose it the moment it appears in an application-style question."
            sections={[
              { label: "X-A", percent: 41, value: "41%", tone: "teal" },
              { label: "X-B", percent: 66, value: "66%", tone: "coral" },
              { label: "X-C", percent: 55, value: "55%", tone: "gold" },
              { label: "X-D", percent: 72, value: "72%", tone: "coral" },
              { label: "X-E", percent: 58, value: "58%", tone: "gold" },
            ]}
            note="paper-under-tests"
            noteDetail="Only 22% application questions against 30% expected. Read this finding with greater caution."
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>StudentReportCard</h2>
        <div style={{ marginTop: "1.25rem" }}>
          <StudentReportCard
            subjectTerm="Mathematics · Term 2"
            score="78 / 80"
            trend={{ direction: "up", label: "Keep going" }}
            line="Keep going. You're on the right path."
            doingWell={["Recall-based questions", "Basic algebra"]}
            workOnNext={["Quadratic equations — application-style questions"]}
            footerNote="Shared by your teacher. Ask them if you want to go through any of this together."
          />
        </div>
      </section>
    </main>
  );
}
