"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProfileTeaser.module.css";
import { Icon } from "./Icon";
import { DIMENSIONS, PROGRAMMES } from "./boardx-data";

const SAMPLE = PROGRAMMES[1]; // Class 10

/**
 * The five dimensions of a BoardX student profile as expanding tiles. The
 * open tile shows what that dimension says about one sample Class 10
 * student. Cycles on its own while on screen until someone picks a tile.
 */
export function ProfileTeaser() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % DIMENSIONS.length), 4200);
    return () => window.clearTimeout(t);
  }, [active, auto, visible]);

  return (
    <div className={styles.tiles} ref={ref}>
      {DIMENSIONS.map((d, i) => {
        const on = i === active;
        return (
          <button
            key={d.key}
            type="button"
            className={`${styles.tile} ${on ? styles.on : ""}`}
            aria-expanded={on}
            onClick={() => {
              setAuto(false);
              setActive(i);
            }}
          >
            <span className={styles.icon}>
              <Icon name={d.icon} size={20} />
            </span>
            <span className={styles.n}>0{i + 1}</span>
            <b className={styles.name}>{d.name}</b>
            <span className={styles.reads}>{d.reads}</span>
            <span className={styles.out} key={on ? "on" : "off"}>
              <span className={styles.outLabel}>What comes out, Class 10</span>
              &ldquo;{SAMPLE.outputs[i]}&rdquo;
            </span>
            {on && auto && visible ? <span key={active} className={styles.timer} aria-hidden="true" /> : null}
          </button>
        );
      })}
    </div>
  );
}
