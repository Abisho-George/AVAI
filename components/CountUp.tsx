"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** The final number. This is what renders on the server and without motion. */
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
};

// Stat cards style their own <span> captions; the counter must look like its parent instead.
const INHERIT: React.CSSProperties = { font: "inherit", color: "inherit", letterSpacing: "inherit" };

/**
 * Counts from zero to `value` the first time it scrolls into view. The real
 * number is in the markup from the start, so screen readers, search engines
 * and reduced-motion visitors only ever see the final value.
 */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "", durationMs = 1100 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} style={INHERIT}>
      <span aria-hidden="true" style={INHERIT}>
        {prefix}
        {shown.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
