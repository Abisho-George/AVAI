import { CtaBand } from '../components/CtaBand';
import { HeroLoop } from '../components/HeroLoop';
import { PageHeader } from '../components/PageHeader';
import styles from './page.module.css';

/**
 * Provisional. The homepage is built from prompt 6 onwards: hero loop, the
 * lost-marks argument, the three signals, the honesty section, pilot proof.
 * What is here exercises the shell.
 */
export default function Home() {
  return (
    <main>
      <PageHeader
        eyebrow="Diagnostic engine for schools"
        title="What is stopping students from scoring higher?"
        lede="Avai reads question-wise marks from the exams a school is already conducting, against a question paper mapped to the Board blueprint in advance, and reports where marks are being lost, how urgent it is for the Board exam, and how confident it is that the pattern is real."
      />

      <section className={styles.loopSection}>
        <HeroLoop />
        <p className={styles.placeholder}>
          The rest of the homepage is built in prompt 7: the lost-marks
          argument, the three signals, the honesty section and pilot proof.
        </p>
      </section>

      <CtaBand
        title="See it on your own students"
        body="One question paper, one mark register. We return the findings."
        action={{ href: '/contact', label: 'Request a pilot' }}
        secondary={{ href: '/pilot', label: 'How the pilot works' }}
        mascot
      />
    </main>
  );
}
