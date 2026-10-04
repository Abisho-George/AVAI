"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals every [data-reveal] element as it scrolls into view by adding
 * `is-in`. The hidden starting state only exists while <html> carries
 * `motion-ready`, which the inline script in app/layout.tsx sets before
 * first paint and only when the visitor has not asked for reduced motion.
 * Without JavaScript, or with reduced motion, everything is simply visible.
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    (window as unknown as { __avaiMotion?: boolean }).__avaiMotion = true;
    if (!root.classList.contains("motion-ready")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("is-in");
            observer.unobserve(el);
            // Once the entrance has played, hand transitions back to the element
            // so hover effects are not slowed by the reveal timing.
            window.setTimeout(() => el.classList.add("is-done"), 1500);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    let queued = 0;
    const scan = () => {
      queued = 0;
      document
        .querySelectorAll(":is([data-reveal], [data-stagger]):not(.is-in)")
        .forEach((el) => observer.observe(el));
    };
    scan();
    // Client-rendered content (tabs, drawers) can mount new reveal targets later.
    const mutations = new MutationObserver(() => {
      if (!queued) queued = requestAnimationFrame(scan);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(queued);
    };
  }, [pathname]);

  return null;
}
