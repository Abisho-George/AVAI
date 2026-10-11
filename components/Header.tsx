"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { Logo } from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pilot", label: "Pilot" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const MOBILE_NAV = [...NAV, { href: "/portal", label: "School portal" }];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.hdr} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#main" className="sr">
        Skip to content
      </a>
      <div className={styles.hdrIn}>
        <Link href="/">
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
      <span className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
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
