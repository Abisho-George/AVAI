import Link from "next/link";
import styles from "./Footer.module.css";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className={styles.ftr}>
      <div className={styles.ftrIn}>
        <div>
          <Link href="/" aria-label="Avai home">
            <Logo dark />
          </Link>
          <p className={styles.sig}>A brighter tomorrow for every student.</p>
          <p>
            Avai is built and owned by INAT Venture Pvt Ltd. The same research, separately
            consented and anonymised, is published openly as Yaadhum.
          </p>
        </div>
        <div className={styles.cols}>
          <div className={styles.col}>
            <h4>Product</h4>
            <Link href="/findings">What Avai finds</Link>
            <Link href="/how-it-works">How Avai reasons</Link>
            <Link href="/roles">Who sees what</Link>
            <Link href="/portal">School portal</Link>
          </div>
          <div className={styles.col}>
            <h4>School</h4>
            <Link href="/pilot">Pilot programme</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/trust">Trust &amp; data</Link>
            <Link href="/contact">Request a pilot</Link>
          </div>
          <div className={styles.col}>
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/about#yaadhum">Yaadhum research</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <p className={styles.meta}>
        © 2026 INAT Venture Pvt Ltd, Krishnagiri, Tamil Nadu. Avai does not set exams, does not
        grade answers, and does not evaluate teachers.
      </p>
    </footer>
  );
}
