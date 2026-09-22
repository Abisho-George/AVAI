"use client";

import { useState } from "react";
import styles from "./SignalExplorer.module.css";
import { FindingCard } from "./FindingCard";
import { ATTENTION_LABEL, URGENCY_LABEL, type Attention, type Confidence, type UrgencyLevel } from "./types";

const URGENCY_RECURRENCE: Record<UrgencyLevel, string> = {
  vh: "4/4 years",
  h: "3/4 years",
  m: "2/4 years",
  l: "1/4 years",
};

const URGENCY_LEVELS: UrgencyLevel[] = ["vh", "h", "m", "l"];
const CONFIDENCE_LEVELS: Confidence[] = [3, 2, 1];
const CONFIDENCE_LABEL: Record<Confidence, string> = { 3: "High", 2: "Medium", 1: "Emerging" };
const ATTENTION_LEVELS: Attention[] = ["act", "watch", "track", "inv"];

/**
 * Move any one signal and the other two hold still — the interactive proof
 * that attention, Board urgency and confidence are independent, wired to a
 * live FindingCard exactly as reference/static-site/index.html's
 * #signal-demo does.
 */
export function SignalExplorer() {
  const [urgency, setUrgency] = useState<UrgencyLevel>("vh");
  const [confidence, setConfidence] = useState<Confidence>(3);
  const [attention, setAttention] = useState<Attention>("act");

  return (
    <div className="split">
      <div>
        <div className={styles.toggles}>
          <div className={styles.tgroup}>
            <span>Board urgency</span>
            <div>
              {URGENCY_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`${styles.tg} ${urgency === level ? styles.on : ""}`}
                  aria-pressed={urgency === level}
                  onClick={() => setUrgency(level)}
                >
                  {URGENCY_LABEL[level]}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.tgroup}>
            <span>Confidence</span>
            <div>
              {CONFIDENCE_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`${styles.tg} ${confidence === level ? styles.on : ""}`}
                  aria-pressed={confidence === level}
                  onClick={() => setConfidence(level)}
                >
                  {CONFIDENCE_LABEL[level]}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.tgroup}>
            <span>Attention</span>
            <div>
              {ATTENTION_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`${styles.tg} ${attention === level ? styles.on : ""}`}
                  aria-pressed={attention === level}
                  onClick={() => setAttention(level)}
                >
                  {level === "inv" ? "Investigate" : ATTENTION_LABEL[level]}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="small">
          Move any one of these and the other two hold still. A medium-urgency finding can carry
          high confidence. A very high-urgency one can carry an emerging signal — and Avai will
          say so rather than round it up.
        </p>
      </div>

      <FindingCard
        subject="Physics"
        competency="Electricity"
        scope="Numerical application"
        urgency={{ level: urgency, recurrence: URGENCY_RECURRENCE[urgency] }}
        metrics={[
          { label: "Students affected", value: 122, qualifier: "of 240" },
          { label: "Avg marks lost", value: 3.8, qualifier: "per student" },
        ]}
        attention={attention}
        confidence={confidence}
        observation="Students consistently lose marks converting the concept into a numerical answer, though the underlying law is generally understood."
        suggestedAction="numerical-practice drill sets, worked-example walkthroughs"
      />
    </div>
  );
}
