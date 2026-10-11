"use client";

import { useEffect, useRef } from "react";
import styles from "./SchoolDoodles.module.css";

/**
 * A decorative layer for hero and page-header backgrounds: exercise-book
 * graph paper fading out from the centre, with line-drawn classroom doodles
 * (book, pencil, ruler, atom, formulae) drifting slowly. On pointer devices
 * the doodles shift a little with the mouse. Entirely aria-hidden, and still
 * under prefers-reduced-motion.
 */

type Doodle = { kind: string; x: number; y: number; s: number; r: number; depth: number; tone: string };

const SETS: Record<"hero" | "header" | "dark", Doodle[]> = {
  hero: [
    { kind: "book", x: 4, y: 72, s: 46, r: -12, depth: 18, tone: "teal" },
    { kind: "pencil", x: 42, y: 8, s: 40, r: 30, depth: 26, tone: "gold" },
    { kind: "atom", x: 94, y: 78, s: 50, r: 0, depth: 14, tone: "blue" },
    { kind: "pi", x: 47, y: 86, s: 30, r: -8, depth: 30, tone: "blue" },
    { kind: "ruler", x: 88, y: 6, s: 56, r: 18, depth: 20, tone: "teal" },
    { kind: "x2", x: 2, y: 18, s: 30, r: 6, depth: 24, tone: "gold" },
    { kind: "cap", x: 62, y: 4, s: 38, r: -10, depth: 16, tone: "blue" },
  ],
  header: [
    { kind: "compass", x: 92, y: 18, s: 44, r: 12, depth: 20, tone: "teal" },
    { kind: "book", x: 80, y: 74, s: 40, r: 10, depth: 16, tone: "blue" },
    { kind: "root", x: 64, y: 12, s: 30, r: -6, depth: 26, tone: "gold" },
    { kind: "bulb", x: 97, y: 58, s: 36, r: 8, depth: 22, tone: "gold" },
    { kind: "pencil", x: 70, y: 46, s: 34, r: -36, depth: 18, tone: "teal" },
  ],
  dark: [
    { kind: "atom", x: 8, y: 16, s: 46, r: 0, depth: 16, tone: "light" },
    { kind: "book", x: 84, y: 80, s: 44, r: -8, depth: 20, tone: "light" },
    { kind: "pi", x: 70, y: 12, s: 30, r: 10, depth: 24, tone: "light" },
    { kind: "cap", x: 14, y: 82, s: 40, r: 8, depth: 18, tone: "light" },
  ],
};

function Shape({ kind }: { kind: string }) {
  switch (kind) {
    case "book":
      return (
        <>
          <path d="M4 7c3-1.5 6-1.5 8 0v12c-2-1.5-5-1.5-8 0z" />
          <path d="M20 7c-3-1.5-6-1.5-8 0v12c2-1.5 5-1.5 8 0z" />
        </>
      );
    case "pencil":
      return (
        <>
          <path d="M4 20l2-6L16.5 3.5a2 2 0 0 1 3 3L9 17z" />
          <path d="M14.5 5.5l3 3M4 20l5-3" />
        </>
      );
    case "ruler":
      return (
        <>
          <rect x="2.5" y="8" width="19" height="8" rx="1.5" />
          <path d="M6 8v3M9.5 8v4M13 8v3M16.5 8v4" />
        </>
      );
    case "atom":
      return (
        <>
          <circle cx="12" cy="12" r="1.6" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
        </>
      );
    case "cap":
      return (
        <>
          <path d="M2.5 10L12 5l9.5 5L12 15z" />
          <path d="M6.5 12.2V16c1.6 1.4 3.4 2 5.5 2s3.9-.6 5.5-2v-3.8M21.5 10v5" />
        </>
      );
    case "compass":
      return (
        <>
          <circle cx="12" cy="4.5" r="1.6" />
          <path d="M11 6L6 20M13 6l5 14M7.6 15.5h8.8" />
        </>
      );
    case "bulb":
      return (
        <>
          <path d="M9 18h6M10 21h4M8 14.5a6 6 0 1 1 8 0c-.9.8-1 1.7-1 3.5H9c0-1.8-.1-2.7-1-3.5z" />
        </>
      );
    case "pi":
      return <text x="12" y="17" textAnchor="middle">π</text>;
    case "x2":
      return <text x="12" y="17" textAnchor="middle">x²</text>;
    case "root":
      return <text x="12" y="17" textAnchor="middle">√a</text>;
    default:
      return null;
  }
}

export function SchoolDoodles({ variant = "hero" }: { variant?: "hero" | "header" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const host = el.parentElement;
    if (!host) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
        el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
      });
    };
    host.addEventListener("pointermove", onMove);
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.layer} ${styles[variant]}`} aria-hidden="true">
      <div className={styles.grid} />
      {SETS[variant].map((d, i) => (
        <span
          key={i}
          className={`${styles.doodle} ${styles[d.tone]}`}
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.s,
            height: d.s,
            ["--r" as string]: `${d.r}deg`,
            ["--depth" as string]: d.depth,
            ["--i" as string]: i,
          }}
        >
          <svg viewBox="0 0 24 24">
            <Shape kind={d.kind} />
          </svg>
        </span>
      ))}
    </div>
  );
}
