import type { Metadata } from "next";
import styles from "./page.module.css";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Icon, IconTile, type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Request a pilot: send us one paper and one mark register",
  description:
    "We will map the paper, read the marks, and come back with the findings from your own students. If a pilot doesn't make sense for you this term, we will say so.",
};

const NEXT: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "mail",
    title: "We reply within two working days",
    body: "Usually sooner. If a pilot doesn't make sense for you this term, we will say so.",
  },
  {
    icon: "paper",
    title: "You send one paper and one mark register",
    body: "For an exam already on your calendar. There is no new exam for students to sit.",
  },
  {
    icon: "finding",
    title: "We come back with your own findings",
    body: "Named gaps from your own students, with what they cost and how sure we are.",
  },
];

const MINIMUMS: { icon: IconName; text: string }[] = [
  { icon: "layers", text: "Whole grade, not a single section" },
  { icon: "users", text: "Sixty students per grade, minimum" },
  { icon: "check-circle", text: "A verified headcount we can bill against" },
  { icon: "paper", text: "One question paper before the exam is marked" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a pilot"
        icon="send"
        title="Send us one paper and one mark register"
        lede="We will map the paper, read the marks, and come back with the findings from your own students."
      />

      <section className="snug">
        <div className="wrap">
          <div className={styles.layout}>
            <div className={`card ${styles.formCard} enter`} style={{ ["--d" as string]: "0.2s" }}>
              <ContactForm />
            </div>

            <aside className={styles.side}>
              <div data-reveal>
                <h2 className={styles.sideTitle}>What happens next</h2>
                <ol className={styles.next} data-stagger>
                  {NEXT.map((step, i) => (
                    <li key={step.title}>
                      <span className={styles.nextIcon}>
                        <Icon name={step.icon} size={18} />
                        <span className={styles.nextNum}>{i + 1}</span>
                      </span>
                      <span>
                        <b>{step.title}</b>
                        {step.body}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card" data-reveal>
                <h3 className={styles.cardTitle}>Minimums, before you ask</h3>
                <ul className={styles.mins}>
                  {MINIMUMS.map((m) => (
                    <li key={m.text}>
                      <Icon name={m.icon} size={16} />
                      {m.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.twoUp} data-stagger>
                <div className="card lift feature">
                  <IconTile name="eye" tone="blue" size={40} />
                  <h3>Want the walkthrough first?</h3>
                  <p>
                    Twenty-four screens from the running build. Mention it in your message and we
                    will send it with our reply.
                  </p>
                </div>
                <div className="card lift feature">
                  <IconTile name="school" tone="gold" size={40} />
                  <h3>Government schools</h3>
                  <p>
                    Government schools participate free of charge under the scholarship programme.
                    Mention it in your message.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
