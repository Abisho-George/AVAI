import Link from "next/link";
import styles from "./Footer.module.css";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className={styles.ftr}>
      <div className={styles.ftrIn}>
        <div>
          <Link href="/">
            <Logo dark />
          </Link>
          <p className={styles.sig}>A brighter tomorrow for every student.</p>
          <p>
            Avai is built and owned by INAT Venture Pvt Ltd.
          </p>
        </div>
        <div className={styles.cols}>
          <div className={styles.col}>
            <h2>Product</h2>
            <Link href="/how-it-works">How Avai reasons</Link>
            <Link href="/portal/dashboard">Sample dashboard</Link>
            <Link href="/portal">School portal</Link>
          </div>
          <div className={styles.col}>
            <h2>School</h2>
            <Link href="/pilot">Pilot programme</Link>
            <Link href="/contact">Request a pilot</Link>
          </div>
          <div className={styles.col}>
            <h2>Company</h2>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className={styles.eduStrip}>
        <span>
          <Icon name="school" size={16} /> Built for Classes X and XII, in CBSE and State Board
          schools
        </span>
        <span className={styles.lga}>Learn · Grow · Achieve</span>
      </div>
      <p className={styles.meta}>
        © 2026 INAT Venture Pvt Ltd. Avai does not set exams, does not
        grade answers, and does not evaluate teachers.
      </p>
    </footer>
  );
}
