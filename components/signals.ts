/**
 * The three status dimensions, the measure types, and the attainment bands.
 * Defined once. Every component reads from here so the scales cannot drift
 * apart across surfaces.
 */

/* ------------------------------------------------------------------ *
 * Dimension 1: Attention. Solid pill. What the school should do.
 * ------------------------------------------------------------------ */

export type Attention =
  | 'immediate'
  | 'watch'
  | 'on-track'
  | 'investigation-required'
  | 'insufficient-evidence';

type AttentionSpec = { label: string; bg: string; fg: string; border: string };

export const ATTENTION: Record<Attention, AttentionSpec> = {
  immediate: {
    label: 'Immediate',
    bg: 'var(--attention-act-bg)',
    fg: 'var(--attention-act-fg)',
    border: 'transparent',
  },
  watch: {
    label: 'Watch',
    bg: 'var(--attention-watch-bg)',
    fg: 'var(--attention-watch-fg)',
    border: 'transparent',
  },
  'on-track': {
    label: 'On track',
    bg: 'var(--attention-track-bg)',
    fg: 'var(--attention-track-fg)',
    border: 'transparent',
  },
  'investigation-required': {
    label: 'Investigation required',
    bg: 'var(--attention-inv-bg)',
    fg: 'var(--attention-inv-fg)',
    border: 'transparent',
  },
  /* The problem itself is unconfirmed, so this is the quietest of the five. */
  'insufficient-evidence': {
    label: 'Insufficient evidence',
    bg: 'var(--attention-insuf-bg)',
    fg: 'var(--attention-insuf-fg)',
    border: 'var(--attention-insuf-border)',
  },
};

/* ------------------------------------------------------------------ *
 * Dimension 2: Board urgency. Outlined chip with a flame.
 * ------------------------------------------------------------------ */

export type BoardUrgency = 'very-high' | 'high' | 'medium' | 'low';

export const URGENCY: Record<BoardUrgency, { label: string; colour: string }> = {
  'very-high': { label: 'Very high', colour: 'var(--state-risk)' },
  high: { label: 'High', colour: 'var(--state-high)' },
  medium: { label: 'Medium', colour: 'var(--state-watch)' },
  low: { label: 'Low', colour: 'var(--state-good)' },
};

/** Recurrence is tied to the level, so `Low · 4/4 years` cannot be built. */
export type Urgency = { level: BoardUrgency; years: 1 | 2 | 3 | 4 };

/* ------------------------------------------------------------------ *
 * Dimension 3: Confidence. Three-dot meter.
 * ------------------------------------------------------------------ */

export type Confidence = 'high' | 'medium' | 'emerging';

export const CONFIDENCE: Record<Confidence, { label: string; dots: 1 | 2 | 3 }> = {
  high: { label: 'High confidence', dots: 3 },
  medium: { label: 'Medium confidence', dots: 2 },
  emerging: { label: 'Emerging confidence', dots: 1 },
};

/* ------------------------------------------------------------------ *
 * Measures. No component prop accepts a bare number: every figure
 * carries its denominator or its unit, so neither can be lost on the
 * way in. Each type has its own `scope` discriminant, which makes them
 * mutually unassignable rather than merely different in intent.
 * ------------------------------------------------------------------ */

/** 146 of 240 students. */
export type Count = {
  scope: 'count';
  affected: number;
  outOf: number;
  noun?: string;
};

/** 4.2 marks per student. Per head, never a cohort total. */
export type PerStudent = { scope: 'student'; marks: number };

/** Marks exposure across the cohort. Never a per-head figure. */
export type Exposure = { scope: 'cohort'; marks: number };

/** 17 of 17 marks. */
export type Score = { scope: 'score'; marks: number; outOf: number };

/** A percentage that knows what it is a percentage of. */
export type Share = { scope: 'share'; percent: number; of: string };

export const formatCount = (c: Count) =>
  `${c.affected} of ${c.outOf} ${c.noun ?? 'students'}`;
export const formatPerStudent = (p: PerStudent) =>
  `${p.marks} marks per student`;
export const formatExposure = (e: Exposure) => `${e.marks} marks exposure`;
export const formatScore = (s: Score) => `${s.marks} of ${s.outOf} marks`;
export const formatShare = (s: Share) => `${s.percent}% of ${s.of}`;

/* ------------------------------------------------------------------ *
 * Attainment bands. Four bands, boundaries at 60 and 80, full mastery
 * its own band at 100. Taken from the Class X screen in
 * reference/screen-walkthrough.pdf, not invented here: the 60-80 band
 * is the one that reads "No dominant common blocker", so moving that
 * boundary would put that sentence on the wrong students.
 * ------------------------------------------------------------------ */

export type AttainmentBand =
  | 'full-mastery'
  | 'at-or-above-80'
  | 'sixty-to-eighty'
  | 'below-60';

/**
 * The affected scale, for higher-is-worse bars. Derived from the attainment
 * boundaries rather than guessed: the complement of 60 and 80 is 40 and 20, and
 * the same 20-point rhythm extends one step to 60. Five bands, because "none
 * affected" earns its own band the way full mastery does at the other end.
 *
 * Four bands would put X-A at 41% and X-D at 72% in the same colour, and a
 * section chart where the best and the worst section paint identically has
 * failed at its one job.
 */
export type AffectedBand =
  | 'none-affected'
  | 'up-to-20'
  | 'twenty-to-forty'
  | 'forty-to-sixty'
  | 'over-sixty';

export type Band = AttainmentBand | AffectedBand;

/**
 * The same bar serves two opposite meanings. Class attainment: higher is
 * better. Students affected by section: higher is worse. There is no safe
 * default, so every call site states which it means.
 */
export type Polarity = 'higher-is-better' | 'higher-is-worse';

const BAND: Record<Band, { colour: string; label: string }> = {
  /* higher-is-better */
  'full-mastery': {
    colour: 'var(--state-strong)',
    label: 'Full mastery of tested Board marks',
  },
  'at-or-above-80': { colour: 'var(--state-good)', label: '80%+ attainment' },
  'sixty-to-eighty': { colour: 'var(--state-watch)', label: '60–80% attainment' },
  'below-60': { colour: 'var(--state-risk)', label: 'Below 60%' },

  /* higher-is-worse */
  'none-affected': { colour: 'var(--state-strong)', label: 'None affected' },
  'up-to-20': { colour: 'var(--state-good)', label: 'Up to 20% affected' },
  'twenty-to-forty': { colour: 'var(--state-watch)', label: '20–40% affected' },
  'forty-to-sixty': { colour: 'var(--state-high)', label: '40–60% affected' },
  'over-sixty': { colour: 'var(--state-risk)', label: 'Over 60% affected' },
};

export function bandFor(percent: number, polarity: Polarity): Band {
  if (polarity === 'higher-is-better') {
    if (percent >= 100) return 'full-mastery';
    if (percent >= 80) return 'at-or-above-80';
    if (percent >= 60) return 'sixty-to-eighty';
    return 'below-60';
  }
  if (percent <= 0) return 'none-affected';
  if (percent <= 20) return 'up-to-20';
  if (percent <= 40) return 'twenty-to-forty';
  if (percent <= 60) return 'forty-to-sixty';
  return 'over-sixty';
}

export const bandColour = (band: Band) => BAND[band].colour;
export const bandLabel = (band: Band) => BAND[band].label;

/* ------------------------------------------------------------------ *
 * The section-comparison note. Non-negotiable, and verbatim.
 * ------------------------------------------------------------------ */

export const SECTION_NON_ATTRIBUTION =
  'A section gap describes tested performance on this assessment only. It is not a measure of teaching quality, and Avai does not attribute it to any teacher.';
