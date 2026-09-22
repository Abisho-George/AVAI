import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { Tabs } from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Trust & data — what Avai holds, and what it will never do",
  description:
    "A diagnostic product that reads children's marks has to be answerable about all of it. This page is written to be forwarded to whoever asks the hard questions at your school.",
};

export default function TrustPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust & data"
        title="What Avai holds, and what it will never do"
        lede="A diagnostic product that reads children's marks has to be answerable about all of it. This page is written to be forwarded to whoever asks the hard questions at your school."
      />

      <section className="snug">
        <div className="wrap">
          <h2>Avai never does these things</h2>
          <p>Not as a current limitation. As a design commitment.</p>
          <div className="split-2" style={{ marginTop: 26 }}>
            <ul className="ticks no">
              <li>
                <strong>Never sets or grades an exam.</strong> Avai reads marks your teachers
                awarded. It has no opinion on whether a mark was right.
              </li>
              <li>
                <strong>Never reads answer content.</strong> It reads numbers against a tagged
                question paper. Nothing a student wrote enters the system.
              </li>
              <li>
                <strong>Never evaluates a teacher.</strong> Section comparisons carry an explicit
                non-attribution note, and no screen in the product ranks staff.
              </li>
            </ul>
            <ul className="ticks no">
              <li>
                <strong>Never shows a student a classmate.</strong> No rank, no percentile, no
                class average on any student surface.
              </li>
              <li>
                <strong>Never bills a parent.</strong> The school is the customer. There is no
                parent-facing purchase anywhere.
              </li>
              <li>
                <strong>Never lets research borrow commercial data.</strong> Separate consent,
                separate purpose, no silent flow between them.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2">
            <h2>How the data is held</h2>
          </div>
          <div className="split-3">
            <div className="card">
              <h3>Scorecard images: 30 days</h3>
              <p>
                Scanned scorecards are retained for thirty days after extraction so a disputed
                mark can be checked against the original. Deletion is gated on teacher
                confirmation, then automatic.
              </p>
            </div>
            <div className="card">
              <h3>Isolation at the infrastructure level</h3>
              <p>
                Every table is scoped to a school identifier and enforced with row-level security.
                One school cannot see another&rsquo;s data even if application code were to ask
                for it.
              </p>
            </div>
            <div className="card">
              <h3>Marks, tied to a roll number</h3>
              <p>
                What persists is question-wise marks against a tagged paper, linked to a roll
                number within your school. That is the whole record.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="split">
            <div>
              <h2>Two purposes, two consents</h2>
              <p>
                Avai is the commercial product your school buys. Yaadhum is the open research and
                scholarship work that uses anonymised data to study how Indian students actually
                lose marks.
              </p>
              <p>
                They share underlying method. They do not share data. Each requires its own
                purpose-specific parental consent, and data collected under one cannot silently
                feed the other. A school can run Avai and decline Yaadhum entirely.
              </p>
              <p>
                <Link href="/about#yaadhum">More about the Yaadhum research</Link>
              </p>
            </div>
            <div className="card">
              <h4>Who can see a given student&rsquo;s finding</h4>
              <div className="deflist" style={{ marginTop: 14 }}>
                <div className="defrow" style={{ gridTemplateColumns: "130px 1fr", padding: "14px 0" }}>
                  <h3>Principal</h3>
                  <p className="small">Every standard and section in their school</p>
                </div>
                <div className="defrow" style={{ gridTemplateColumns: "130px 1fr", padding: "14px 0" }}>
                  <h3>Class teacher</h3>
                  <p className="small">Every subject, their section only</p>
                </div>
                <div className="defrow" style={{ gridTemplateColumns: "130px 1fr", padding: "14px 0" }}>
                  <h3>Subject teacher</h3>
                  <p className="small">Their subject, their assigned sections only</p>
                </div>
                <div
                  className="defrow"
                  style={{ gridTemplateColumns: "130px 1fr", padding: "14px 0", borderBottom: "none" }}
                >
                  <h3>Student</h3>
                  <p className="small">Only reports explicitly shared with them, via one-time PIN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2">
            <h2>Questions your IT or legal contact will ask</h2>
          </div>
          <Tabs
            label="Common questions"
            tabs={[
              {
                id: "where",
                label: "Where does it run?",
                content: (
                  <div className="card">
                    <p>
                      Avai runs as a multi-tenant service with per-school row-level isolation.
                      Scorecard images are held in a separate store on a thirty-day expiry, keyed
                      to the same school scope as the marks they came from.
                    </p>
                  </div>
                ),
              },
              {
                id: "export",
                label: "Who can export?",
                content: (
                  <div className="card">
                    <p>
                      Report generation and export is available to the principal and to teachers
                      within their assignment scope. Students cannot export anything beyond their
                      own shared report as a PDF. Every issuance and share is recorded.
                    </p>
                  </div>
                ),
              },
              {
                id: "leave",
                label: "If we leave",
                content: (
                  <div className="card">
                    <p>
                      Your marks and reports are yours. On exit we provide a full export of
                      everything held for your school and delete our copies. Anything already
                      anonymised into published Yaadhum research stays published — which is why
                      that consent is asked for separately and up front.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      <CtaBand
        title="Still have questions?"
        description="Send them over. We would rather answer them before a pilot than during one."
        ctaLabel="Get in touch"
        ctaHref="/contact"
        ctaTone="line"
      />
    </>
  );
}
