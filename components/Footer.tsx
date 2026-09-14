import Link from 'next/link';
import { Wordmark } from './Wordmark';
import styles from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '/findings', label: 'What Avai finds' },
      { href: '/how-it-works', label: 'How Avai reasons' },
      { href: '/roles', label: 'Who sees what' },
      { href: '/portal', label: 'School portal' },
    ],
  },
  {
    title: 'School',
    links: [
      { href: '/pilot', label: 'Pilot programme' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/trust', label: 'Trust & data' },
      { href: '/contact', label: 'Request a pilot' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/about#yaadhum', label: 'Yaadhum research' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Wordmark tone="dark" />
          {/* The brand signature. Footer and the portal welcome panel only. */}
          <p className={styles.signature}>A brighter tomorrow for every student.</p>
          <p className={styles.owner}>
            Avai is built and owned by INAT Venture Pvt Ltd. The same research,
            separately consented and anonymised, is published openly as Yaadhum.
          </p>
        </div>

        <div className={styles.columns}>
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <p className={styles.legal}>
        © 2026 INAT Venture Pvt Ltd, Krishnagiri, Tamil Nadu. Avai does not set
        exams, does not grade answers, and does not evaluate teachers.
      </p>
    </footer>
  );
}
