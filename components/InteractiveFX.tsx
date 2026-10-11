"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for two effects:
 * - `.card` and `.spot`: a soft light that follows the cursor (--mx, --my)
 * - `[data-tilt]`: a slight 3D tilt toward the cursor (--rx, --ry)
 * Pointer devices only, and nothing at all under reduced motion.
 */
export function InteractiveFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let tilted: HTMLElement | null = null;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const spot = target?.closest<HTMLElement>(".card, .spot");
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
          spot.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
        if (tilted && tilted !== tilt) {
          tilted.style.setProperty("--rx", "0deg");
          tilted.style.setProperty("--ry", "0deg");
        }
        tilted = tilt;
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          const max = Number(tilt.dataset.tilt) || 6;
          tilt.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
        }
      });
    };

    const onLeave = () => {
      if (tilted) {
        tilted.style.setProperty("--rx", "0deg");
        tilted.style.setProperty("--ry", "0deg");
        tilted = null;
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
