/** What the school should do about a finding. Solid pill. */
export type Attention = "track" | "watch" | "act" | "inv";

export const ATTENTION_LABEL: Record<Attention, string> = {
  track: "On track",
  watch: "Watch",
  act: "Immediate",
  inv: "Investigation required",
};

/** How often the competency has recurred in recent Board papers. Outlined chip. */
export type UrgencyLevel = "vh" | "h" | "m" | "l";

export const URGENCY_LABEL: Record<UrgencyLevel, string> = {
  vh: "Very high",
  h: "High",
  m: "Medium",
  l: "Low",
};

export type Urgency = {
  level: UrgencyLevel;
  /** e.g. "4/4 years" */
  recurrence: string;
};

/** Strength of evidence that the pattern is real. Three-dot meter. */
export type Confidence = 1 | 2 | 3;

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  3: "High confidence",
  2: "Medium confidence",
  1: "Emerging signal",
};

/** Fill colour for AttainmentBar, taken from the wing gradient. */
export type BarTone = "teal" | "blue" | "gold" | "coral";

/** The four limited-evidence states. Never styled as an error. */
export type EvidenceState =
  | "cause-not-localised"
  | "paper-under-tests"
  | "early-signal"
  | "trend-not-available";
