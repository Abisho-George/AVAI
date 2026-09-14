'use client';

import { useState } from 'react';
import { EvidenceNote, type EvidenceState } from './EvidenceNote';
import styles from './HonestyTabs.module.css';

type Tab = {
  state: EvidenceState;
  heading: string;
  body: string;
};

const TABS: Tab[] = [
  {
    state: 'cause-not-localised',
    heading: 'A confirmed problem with no known cause',
    body: "84 students are losing marks across Physics · Light, with high confidence that the loss is real. But no subtopic or question pattern accounts for enough of it to name a cause. Avai routes this to investigation and recommends a manual answer-script review. It does not prescribe a drill set that might be aimed at the wrong thing.",
  },
  {
    state: 'paper-under-tests',
    heading: 'Avai criticising your own question paper',
    body: 'If a test carried too few application questions to judge application readiness, no amount of analysis fixes that. Avai flags the paper and downgrades every related finding rather than reporting a confident number built on thin evidence.',
  },
  {
    state: 'early-signal',
    heading: 'A pattern that might be there',
    body: 'A shape is visible in the data but the evidence is thin. Avai shows it, marks it as emerging, and lets a principal decide whether to watch it, instead of either hiding it or promoting it to a conclusion.',
  },
  {
    state: 'trend-not-available',
    heading: 'One test is not a trend',
    body: 'After a single analysed assessment, Avai will not draw a trend line, will not claim consistency, and will not predict a Board outcome. The strip disappears on its own once a second assessment is analysed.',
  },
];

const LABEL: Record<EvidenceState, string> = {
  'cause-not-localised': 'Cause not localised',
  'paper-under-tests': 'Paper under-tests',
  'early-signal': 'Early signal',
  'trend-not-available': 'Trend not available',
};

export function HonestyTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div className={styles.panel}>
      <div className={styles.tablist} role="tablist" aria-label="What Avai refuses to conclude">
        {TABS.map((item, index) => (
          <button
            key={item.state}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? `${styles.tab} ${styles.tabOn}` : styles.tab}
            onClick={() => setActive(index)}
          >
            {LABEL[item.state]}
          </button>
        ))}
      </div>

      <div className={styles.content} role="tabpanel">
        <h3 className={styles.heading}>{tab.heading}</h3>
        <p className={styles.body}>{tab.body}</p>
        <EvidenceNote state={tab.state} />
      </div>
    </div>
  );
}
