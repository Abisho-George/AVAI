"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { Logo } from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/findings", label: "Findings" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/roles", label: "Roles" },
  { href: "/pilot", label: "Pilot" },
  { href: "/trust", label: "Trust" },
  { href: "/pricing", label: "Pricing" },
];

const MOBILE_NAV = [
  ...NAV,
  { href: "/about", label: "About" },
  { href: "/portal", label: "School portal" },
  { href: "/contact", label: "Request a pilot" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.hdr}>
      <a href="#main" className="sr">
        Skip to content
      </a>
      <div className={styles.hdrIn}>
        <Link href="/" aria-label="Avai home">
          <Logo />
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.hdrAct}>
          <Link className="btn btn-line btn-sm" href="/portal">
            School portal
          </Link>
          <Link className="btn btn-primary btn-sm" href="/contact">
            Request a pilot
          </Link>
        </div>
        <button
          type="button"
          className={styles.burger}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={`${styles.mnav} ${open ? styles.on : ""}`} aria-label="Mobile">
        {MOBILE_NAV.map((item) => (
          <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
