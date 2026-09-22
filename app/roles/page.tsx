import type { Metadata } from "next";
import styles from "./page.module.css";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { Tabs } from "@/components/Tabs";
import { FindingCard } from "@/components/FindingCard";
import { AttainmentBar } from "@/components/AttainmentBar";
import { StudentReportCard } from "@/components/StudentReportCard";

export const metadata: Metadata = {
  title: "Who sees what — the same finding, scoped three ways",
  description:
    "One diagnosis sits underneath the whole product. What each person sees is clipped to what they are responsible for, and the student surface is the narrowest thing Avai renders.",
};

export default function RolesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who sees what"
        title="The same finding, scoped three ways"
        lede="One diagnosis sits underneath the whole product. What each person sees is clipped to what they are responsible for — and the student surface is deliberately the narrowest thing Avai renders."
      />

      <section className="snug">
        <div className="wrap">
          <Tabs
            label="View as"
            tabs={[
              {
                id: "principal",
                label: "Principal",
                content: (
                  <div className="split">
                    <div>
                      <h3>Sees cost, urgency and spread</h3>
                      <p>
                        A principal opens the school, steps into a standard, then opens one
                        analysed assessment. At that level they get marks exposure, Board
                        recurrence, confidence, the per-section spread and a ranked intervention
                        plan.
                      </p>
                      <ul className="ticks">
                        <li>Every standard, every section, every subject</li>
                        <li>Marks exposure and Board urgency</li>
                        <li>Section comparison — with its non-attribution note</li>
                        <li>Ranked intervention plan across the whole cohort</li>
                      </ul>
                    </div>
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
                      extra={
                        <div className={styles.sectionBars}>
                          <AttainmentBar label="X-A" percent={41} value="41%" tone="teal" />
                          <AttainmentBar label="X-B" percent={66} value="66%" tone="coral" />
                          <AttainmentBar label="X-D" percent={72} value="72%" tone="coral" />
                        </div>
                      }
                      footer="A section gap describes tested performance on this assessment only. It is not a measure of teaching quality, and Avai does not attribute it to any teacher."
                    />
                  </div>
                ),
              },
              {
                id: "teacher",
                label: "Teacher",
                content: (
                  <div className="split">
                    <div>
                      <h3>Sees their own scope, and can act</h3>
                      <p>
                        Teachers are scoped by assignment, not by job title. A subject teacher
                        never sees another subject&rsquo;s numbers for their students, even in
                        passing. A class teacher sees every subject for their section but can only
                        enter marks for the ones they teach.
                      </p>
                      <ul className="ticks">
                        <li>Their section, their subjects — nothing wider</li>
                        <li>The same finding, clipped to their students</li>
                        <li>Issue a report, then share it as a separate act</li>
                      </ul>
                      <ul className="ticks no">
                        <li>No school-wide view, no other sections, no cross-teacher comparison</li>
                      </ul>
                    </div>
                    <FindingCard
                      subject="Mathematics · X-A"
                      competency="Quadratic Equations"
                      scope="Application problems"
                      urgency={{ level: "vh", recurrence: "" }}
                      metrics={[
                        { label: "In your section", value: 29, qualifier: "of 48" },
                        { label: "Avg marks lost", value: 4.1, qualifier: "per student" },
                      ]}
                      attention="act"
                      confidence={3}
                      observation="Your students demonstrate the concept but lose marks when it appears in application-style questions."
                      footer={
                        <div className={styles.teacherActions}>
                          <span className="btn btn-line btn-sm">Issue report</span>
                          <span className="btn btn-primary btn-sm">Share with student</span>
                        </div>
                      }
                    />
                  </div>
                ),
              },
              {
                id: "student",
                label: "Student",
                content: (
                  <div className="split">
                    <div>
                      <h3>Sees one report, and nobody else</h3>
                      <p>
                        The student surface is the most sensitive in the product. It is narrower
                        than anything a teacher sees, in plain language, and Avai is not permitted
                        to force optimism on it.
                      </p>
                      <ul className="ticks">
                        <li>Only reports a teacher has explicitly shared</li>
                        <li>Opened with a one-time PIN, generated at the moment of sharing</li>
                      </ul>
                      <ul className="ticks no">
                        <li>No classmates, no rank, no percentile, no class average</li>
                        <li>No Board urgency ranking, no risk-group label</li>
                        <li>No share or compare affordance anywhere on the screen</li>
                      </ul>
                      <p className="small">
                        On a flat result the tone drops to neutral and the trend arrow goes
                        sideways. Avai never celebrates a result that doesn&rsquo;t warrant it.
                      </p>
                    </div>
                    <StudentReportCard
                      subjectTerm="Mathematics · Term 2"
                      score="78 / 80"
                      trend={{ direction: "up", label: "Keep going" }}
                      line="Keep going. You're on the right path."
                      doingWell={["Recall-based questions", "Basic algebra"]}
                      workOnNext={["Quadratic equations — application-style questions"]}
                      footerNote="Shared by your teacher. Ask them if you want to go through any of this together."
                      mascotPose="improve"
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2">
            <h2>Where a principal is, at any moment</h2>
            <p>Three levels. A principal signs in to the school, not to an assessment.</p>
          </div>
          <div className="split-3">
            <div className="card">
              <h3>School</h3>
              <p>
                Every standard. Board-examination years lead; the rest sit in a table. A standard
                with no analysed assessment shows its real state rather than borrowed numbers.
              </p>
            </div>
            <div className="card">
              <h3>Class</h3>
              <p>
                One standard, the whole cohort, every section and subject, and the findings
                carrying the most marks exposure. The assessment table is the way down.
              </p>
            </div>
            <div className="card">
              <h3>Assessment</h3>
              <p>
                One analysed assessment, with filters. This is where the findings, the risk groups
                and the intervention plan live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2">
            <h2>How a finding reaches a student</h2>
            <p>Six steps, each owned by a specific person. Nothing skips.</p>
          </div>
          <div className="panel">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Action</th>
                  <th>Who</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="num">1</td>
                  <td>Paper uploaded and mapped</td>
                  <td>Principal</td>
                </tr>
                <tr>
                  <td className="num">2</td>
                  <td>Marks entered</td>
                  <td>Subject teacher, own subject only</td>
                </tr>
                <tr>
                  <td className="num">3</td>
                  <td>Cohort findings reviewed</td>
                  <td>Principal</td>
                </tr>
                <tr>
                  <td className="num">4</td>
                  <td>Report issued — diagnosis frozen</td>
                  <td>Teacher or principal</td>
                </tr>
                <tr>
                  <td className="num">5</td>
                  <td>Report shared, one-time PIN generated</td>
                  <td>Class teacher or principal</td>
                </tr>
                <tr>
                  <td className="num">6</td>
                  <td>Student signs in and sees that report only</td>
                  <td>Student</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="small" style={{ marginTop: 16 }}>
            Handing a diagnosis to a fifteen-year-old is never a single click. Sharing requires an
            explicit confirmation naming the student and the report.
          </p>
        </div>
      </section>

      <CtaBand
        className="band-2"
        title="Walk through all three surfaces"
        description="The full 24-screen walkthrough, captured from the running build."
        ctaLabel="Request the walkthrough"
        ctaHref="/contact"
      />
    </>
  );
}
