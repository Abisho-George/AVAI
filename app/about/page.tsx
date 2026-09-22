import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About — built in Krishnagiri, for schools like the ones around it",
  description:
    "Avai is built and owned by INAT Venture Pvt Ltd. It started from a plain observation: every school in India already produces the data needed to know exactly where a student is stuck.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built in Krishnagiri, for schools like the ones around it"
        lede="Avai is built and owned by INAT Venture Pvt Ltd. It started from a plain observation: every school in India already produces the data needed to know exactly where a student is stuck, and nobody extracts it, because by hand it is a week of work per class."
      />

      <section className="snug">
        <div className="wrap">
          <div className="split">
            <div>
              <h2>Why this, and not another practice app</h2>
              <p>
                There is no shortage of products that will give an Indian student more questions
                to do. There is almost nothing that tells a school which questions are worth
                doing.
              </p>
              <p>
                A report card says 42 out of 80. It does not say that every lost mark was an
                application question, that the same weakness appears in Science but not Social
                Science, or that the competency behind it has shown up in four consecutive Board
                papers. That distinction is the difference between &ldquo;needs more
                practice&rdquo; and a specific, addressable, cross-subject gap worth roughly sixty
                Board marks.
              </p>
              <p>
                Nothing in the Indian K–12 diagnostic market currently detects that pattern.
                Everything stops at the subject total.
              </p>
            </div>
            <div className="card">
              <h3>What makes it hard to copy</h3>
              <p>
                Not the mark extraction, and not the tagging on its own — both are becoming
                commodity capability.
              </p>
              <p>
                The defensible part is the combination: one consistent two-layer schema applied
                across every subject a student takes, married to verified marks, producing a
                cross-subject view. A competitor who dashboards subject totals is answering a
                shallower question.
              </p>
              <p>
                The second part is harder still to copy, because copying it means admitting
                limits: Avai reports when it cannot explain a problem, and criticises question
                papers that cannot support the conclusions drawn from them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band-2" id="yaadhum">
        <div className="wrap">
          <div className="split">
            <div>
              <h2>Yaadhum</h2>
              <p>
                The same underlying research runs a second life under the Yaadhum name:
                anonymised, separately consented, and published openly.
              </p>
              <p>
                Two purposes. Scholarship identification — finding students whose diagnosis shows
                real capability that circumstances are masking. And public education research,
                because the question of how Indian students actually lose marks deserves an answer
                in the open rather than inside one company&rsquo;s dashboard.
              </p>
              <p>
                Avai data and Yaadhum data do not mix. Each requires its own purpose-specific
                parental consent, and a school can run one without the other.
              </p>
              <p>
                <Link href="/trust">How the separation is enforced</Link>
              </p>
            </div>
            <div className="card">
              <h3>The government-school programme</h3>
              <p>
                The District Collector of Krishnagiri has expressed support for a free diagnostics
                and scholarship programme across government schools in the district.
              </p>
              <p>
                Government schools pay nothing. The findings feed the scholarship work, under the
                same consent rules as everything else.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2">
            <h2>The two names</h2>
          </div>
          <div className="deflist">
            <div className="defrow">
              <h3>INAT Venture Pvt Ltd</h3>
              <p>
                The company. Builds and owns Avai, holds the commercial relationship with schools,
                and is the data controller for everything in the product.
              </p>
            </div>
            <div className="defrow">
              <h3>Avai</h3>
              <p>
                The product schools buy. Also the bird — who appears when there is something to
                welcome, something to wait for, or something to hand to a student. Never on a
                screen full of findings, where a mascot has no business being.
              </p>
            </div>
            <div className="defrow">
              <h3>Yaadhum</h3>
              <p>The research and community-facing side. Anonymised, separately consented, openly published.</p>
            </div>
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
