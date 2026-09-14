'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Wordmark } from './Wordmark';
import styles from './Header.module.css';

/**
 * Primary navigation. The labels are the full ones, not the abbreviations the
 * static site carries: measured at 1280px they fit on one line with room to
 * spare, so there is no reason to inherit that workaround.
 */
const NAV = [
  { href: '/', label: 'Home' },
  { href: '/findings', label: 'What Avai finds' },
  { href: '/how-it-works', label: 'How Avai reasons' },
  { href: '/roles', label: 'Who sees what' },
  { href: '/pilot', label: 'Pilot' },
  { href: '/trust', label: 'Trust & data' },
  { href: '/pricing', label: 'Pricing' },
];

const MOBILE_EXTRA = [
  { href: '/about', label: 'About' },
  { href: '/portal', label: 'School portal' },
  { href: '/contact', label: 'Request a pilot' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* A route change with the menu still open would leave it covering the page
     the reader just asked for. */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.mark} href="/" aria-label="Avai, home">
          <Wordmark />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link className={styles.ghost} href="/portal">
            School portal
          </Link>
          <Link className={styles.primary} href="/contact">
            Request a pilot
          </Link>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
        >
          <span className={styles.burgerBars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div id="site-menu" className={styles.menu} hidden={!open}>
        {[...NAV, ...MOBILE_EXTRA].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(item.href) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
