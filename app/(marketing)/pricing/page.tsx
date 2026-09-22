import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Pricing — per student, per verified head",
  description:
    "Priced against an official headcount your school can already prove, billed to the school, for a whole grade at a time. No parent ever sees an invoice from us.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Per student, per verified head"
        lede="Priced against an official headcount your school can already prove, billed to the school, for a whole grade at a time. No parent ever sees an invoice from us."
      />

      <section className="snug">
        <div className="wrap">
          <div className="split-3">
            <div className="card">
              <h3>Verified headcount</h3>
              <p>
                Billing runs against your CBSE List of Candidates or DGE registration — not a
                number either of us estimates. You pay for the students the board already says you
                have.
              </p>
            </div>
            <div className="card">
              <h3>Whole grade only</h3>
              <p>
                No partial-class enrolment. A half-sampled cohort produces a biased class picture,
                and we would rather not sell you a diagnosis we know is skewed.
              </p>
            </div>
            <div className="card">
              <h3>Minimum 60 per grade</h3>
              <p>
                Below sixty students, findings carry too little statistical weight for the
                confidence values to mean anything. We will tell you if you are under the floor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className="head-2">
            <h2>What the price covers</h2>
          </div>
          <div className="split">
            <ul className="ticks">
              <li>Board-blueprint mapping of every question paper you submit</li>
              <li>A diagnostic-strength report on each paper</li>
              <li>Marks extraction, validation and teacher confirmation</li>
              <li>Findings at school, class, section and student level</li>
              <li>Ranked intervention plan per assessment</li>
              <li>Individual student reports, issued and shared at your discretion</li>
              <li>Principal and teacher accounts, scoped by assignment</li>
            </ul>
            <div className="card">
              <h3>What it does not cover</h3>
              <p>
                Avai does not supply content, question banks, practice material or tutoring. It
                tells you where the marks are going. What you do about it stays with your
                teachers, which is where that decision belongs.
              </p>
              <p className="small">
                Pilot schools in the current Krishnagiri cohort are onboarded at pilot terms.
                Government schools in the district participate free of charge under the
                scholarship programme.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2">
            <h2>Common questions</h2>
          </div>
          <div className="deflist">
            <div className="defrow">
              <h3>Can we start with one section?</h3>
              <p>
                No. A section read in isolation cannot be compared against anything, and section
                comparison is a large part of what makes the findings actionable. Whole grade, or
                not yet.
              </p>
            </div>
            <div className="defrow">
              <h3>Do we pay per exam?</h3>
              <p>
                No. Pricing is per student per academic year, regardless of how many assessments
                you put through. More analysed assessments make the findings stronger, so we have
                no interest in rationing them.
              </p>
            </div>
            <div className="defrow">
              <h3>What if a paper turns out to be weak?</h3>
              <p>
                You will be told. Avai reports diagnostic strength on every paper, and a paper
                that under-tests a competency produces lower-strength findings. We would rather
                flag that than quietly report a confident number.
              </p>
            </div>
            <div className="defrow">
              <h3>Are parents billed for the student report?</h3>
              <p>
                Never. The school pays; the report reaches the student because a teacher chose to
                share it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        className="band-2"
        title="Tell us your numbers"
        description="Board, district, grades and students per grade. We will come back with terms and an honest view on fit."
        ctaLabel="Request a pilot"
        ctaHref="/contact"
      />
    </>
  );
}
