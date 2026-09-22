import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FindingCard } from "@/components/FindingCard";
import { SignalCluster } from "@/components/SignalCluster";
import { EvidenceNote } from "@/components/EvidenceNote";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "What Avai finds — lost marks are lost Board potential",
  description:
    "A finding is always the same unit: the competency, students affected, marks exposure, Board urgency and confidence.",
};

export default function FindingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="What Avai finds"
        title="Lost marks are lost Board potential"
        lede="Avai's output is not a score and not a dashboard. It is a set of findings. A finding is always the same unit — never a bare statistic — and it always carries what it costs, how urgent it is, and how sure we are."
      />

      <section className="snug">
        <div className="wrap">
          <div className="split">
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
            <div>
              <h2>Anatomy of a finding</h2>
              <ul className="ticks">
                <li>
                  <strong>The competency</strong> — subject, chapter, and the specific skill, not
                  just the chapter name
                </li>
                <li>
                  <strong>Students affected</strong> — how many, out of how many were analysed
                </li>
                <li>
                  <strong>Marks exposure</strong> — the average marks each affected student is
                  losing
                </li>
                <li>
                  <strong>Board urgency</strong> — how often this competency has recurred in
                  recent Board papers
                </li>
                <li>
                  <strong>Confidence</strong> — how strong the evidence is that the pattern is
                  real
                </li>
                <li>
                  <strong>Attention</strong> — what the school should actually do about it
                </li>
                <li>
                  <strong>The observation</strong> — one plain sentence describing what was seen
                </li>
              </ul>
              <p className="small" style={{ marginTop: 16 }}>
                Every figure opens. Click any finding in the product and you get the questions it
                read, the per-section spread, and the recommended action.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2">
            <h2>Marks loss intelligence</h2>
            <p>
              The first screen a principal sees after opening an assessment. Findings are ranked
              by what they are costing, not by how bad the average looks.
            </p>
          </div>
          <div className="split-2">
            <FindingCard
              subject="Physics"
              competency="Electricity"
              scope="Numericals"
              urgency={{ level: "h", recurrence: "3/4 years" }}
              metrics={[
                { label: "Students affected", value: 122, qualifier: "of 240" },
                { label: "Avg marks lost", value: 3.8, qualifier: "per student" },
              ]}
              attention="act"
              confidence={3}
              observation="Students consistently lose marks converting the concept into a numerical answer, though the underlying law is generally understood."
              suggestedAction="numerical-practice drill sets"
            />
            <div>
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
          </div>
          <p className="small" style={{ marginTop: 20 }}>
            Note the second card. The problem is real and high-confidence, but Avai declines to
            name a cause it cannot support. It is routed to investigation, not to an intervention.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2">
            <h2>Two groups, named carefully</h2>
            <p>
              Avai splits students who need attention into two groups that need completely
              different responses. Neither is ever called &ldquo;weak students&rdquo;, and each
              carries its own confidence value.
            </p>
          </div>
          <div className="split-2">
            <div className="card">
              <SignalCluster confidence={3} />
              <h3 style={{ marginTop: 12 }}>High Potential Gap — 34 students</h3>
              <p>
                Close to the next attainment band. They know the concept but lose application
                marks. The smallest intervention here produces the largest movement in Board
                marks.
              </p>
              <p className="small">Top blockers: Mathematics application, Physics numericals</p>
            </div>
            <div className="card">
              <SignalCluster confidence={2} />
              <h3 style={{ marginTop: 12 }}>High Academic Risk — 28 students</h3>
              <p>
                Repeated loss across several tested areas rather than one identifiable blocker.
                Needs sustained support, not a targeted drill.
              </p>
              <div style={{ marginTop: 14 }}>
                <EvidenceNote state="early-signal" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2">
            <h2>What should the school act on now?</h2>
            <p>
              Priority combines student impact, marks exposure, Board recurrence and confidence. A
              confirmed problem without a localised cause is routed to investigation rather than
              given an intervention it hasn&rsquo;t earned.
            </p>
          </div>
          <div className="panel">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Finding</th>
                  <th>Why it ranks here</th>
                  <th>Urgency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="num">1</td>
                  <td>
                    <strong>Maths · Quadratic Equations</strong>
                    <br />
                    <span className="small">Application problems</span>
                  </td>
                  <td className="small">
                    Large number affected, meaningful marks exposure, strong Board recurrence,
                    high-confidence evidence
                  </td>
                  <td>
                    <SignalCluster urgency={{ level: "vh", recurrence: "" }} />
                  </td>
                </tr>
                <tr>
                  <td className="num">2</td>
                  <td>
                    <strong>Physics · Electricity</strong>
                    <br />
                    <span className="small">Numericals</span>
                  </td>
                  <td className="small">
                    High student impact and strong, consistent Board recurrence
                  </td>
                  <td>
                    <SignalCluster urgency={{ level: "h", recurrence: "" }} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <SignalCluster attention="inv" />
                  </td>
                  <td>
                    <strong>Physics · Light</strong>
                    <br />
                    <span className="small">Whole chapter</span>
                  </td>
                  <td className="small">
                    Problem confirmed, cause not localised — manual review recommended first
                  </td>
                  <td>
                    <SignalCluster urgency={{ level: "h", recurrence: "" }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand
        title="See it on your own students"
        description="One question paper, one mark register. We return the findings."
        ctaLabel="Request a pilot"
        ctaHref="/contact"
      />
    </>
  );
}
