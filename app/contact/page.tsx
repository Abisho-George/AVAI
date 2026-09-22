import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Request a pilot — send us one paper and one mark register",
  description:
    "We will map the paper, read the marks, and come back with the findings from your own students. If a pilot doesn't make sense for you this term, we will say so.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a pilot"
        title="Send us one paper and one mark register"
        lede="We will map the paper, read the marks, and come back with the findings from your own students. If a pilot doesn't make sense for you this term, we will say so."
      />

      <section className="snug">
        <div className="wrap">
          <div className="split" style={{ alignItems: "start", gap: 64 }}>
            <ContactForm />

            <div>
              <div className="card">
                <h3>Want the full walkthrough first?</h3>
                <p>
                  Twenty-four screens from the running build — principal, teacher and student,
                  including every state where Avai declines to draw a conclusion.
                </p>
                <p className="small">
                  Mention it in the message field and we will send it across with our reply.
                </p>
              </div>

              <div className="card" style={{ marginTop: 18 }}>
                <h3>Minimums, before you ask</h3>
                <ul className="ticks" style={{ marginTop: 10 }}>
                  <li>Whole grade, not a single section</li>
                  <li>Sixty students per grade, minimum</li>
                  <li>A verified headcount we can bill against</li>
                  <li>One question paper before the exam is marked</li>
                </ul>
              </div>

              <div className="card" style={{ marginTop: 18 }}>
                <h3>Government schools</h3>
                <p>
                  Krishnagiri district government schools participate free of charge under the
                  scholarship programme. Mention your school in the message and we will route it
                  there.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
