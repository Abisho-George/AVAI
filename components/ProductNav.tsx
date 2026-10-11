"use client";

import { useEffect, useState } from "react";
import styles from "./ProductNav.module.css";
import { Icon, type IconName } from "./Icon";

const ITEMS: { id: string; label: string; icon: IconName }[] = [
  { id: "papers", label: "Question Paper Engine", icon: "paper" },
  { id: "diagnostics", label: "Avai Diagnostics", icon: "search" },
  { id: "boardx", label: "BoardX profiles", icon: "user" },
];

/** A sticky bar of the three products that highlights the one in view. */
export function ProductNav() {
  const [active, setActive] = useState(ITEMS[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ITEMS.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Sections below the fold are laid out lazily (content-visibility), so the
  // first jump can land short; aim again once the sections in between render.
  function go(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    window.setTimeout(() => el.scrollIntoView({ behavior: smooth ? "smooth" : "auto" }), 500);
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav className={styles.nav} aria-label="Products on this page">
      <div className={styles.inner}>
        {ITEMS.map((i, n) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            onClick={(e) => go(e, i.id)}
            className={`${styles.item} ${active === i.id ? styles.on : ""}`}
            aria-current={active === i.id ? "true" : undefined}
          >
            <span className={styles.n}>0{n + 1}</span>
            <Icon name={i.icon} size={16} />
            {i.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
