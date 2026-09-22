"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import styles from "./Tabs.module.css";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  label: string;
};

/** A keyboard-accessible tab group: proper tablist, roving tabindex, arrow keys. */
export function Tabs({ tabs, label }: TabsProps) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    if (next !== null) {
      event.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  return (
    <div>
      <div className={styles.tabs} role="tablist" aria-label={label}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            type="button"
            id={`${uid}-tab-${tab.id}`}
            aria-selected={active === index}
            aria-controls={`${uid}-panel-${tab.id}`}
            tabIndex={active === index ? 0 : -1}
            className={`${styles.tab} ${active === index ? styles.on : ""}`}
            onClick={() => setActive(index)}
            onKeyDown={(e) => onKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${uid}-panel-${tab.id}`}
          aria-labelledby={`${uid}-tab-${tab.id}`}
          hidden={active !== index}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
