import styles from './Mascot.module.css';

/**
 * Avai, the bird from reference/brand-sheet.jpeg: cream body, a fanned wing
 * running navy -> blue -> teal -> gold, orange tail streaks, a small orange
 * beak, dark eye with a highlight.
 *
 * This is a stand-in for real artwork. Every shape lives in this file, so
 * swapping in the final vectors touches nothing else.
 *
 * Pose vocabulary is five. The brand sheet's Learn, Practice and Explore poses
 * are not used on this site: they depict a student companion the product is
 * not. See CLAUDE.md.
 */
export type Pose = 'hello' | 'improve' | 'achieve' | 'wait' | 'neutral';

/** Below this the bird loses its silhouette, so the head-only crop is used. */
const BODY_MIN_SIZE = 120;

type PoseSpec = {
  /** Degrees of lift, measured from the tucked rest position. */
  wing: number;
  /** Degrees. Positive tips the beak up. */
  head: number;
  /** Degrees, tail sweep. */
  tail: number;
  /** Whole-bird lean, degrees. */
  lean: number;
  eye: 'open' | 'happy';
  star?: boolean;
  bob?: boolean;
  label: string;
};

const POSES: Record<Pose, PoseSpec> = {
  hello: {
    wing: 40,
    head: 3,
    tail: 4,
    lean: 0,
    eye: 'happy',
    label: 'Avai, waving hello',
  },
  improve: {
    wing: 26,
    head: 7,
    tail: 8,
    lean: -3,
    eye: 'happy',
    label: 'Avai, looking up at a stronger result',
  },
  achieve: {
    wing: 58,
    head: 6,
    tail: 14,
    lean: -8,
    eye: 'happy',
    star: true,
    label: 'Avai in flight, with a star',
  },
  wait: {
    wing: 8,
    head: 0,
    tail: 2,
    lean: 0,
    eye: 'open',
    bob: true,
    label: 'Avai, waiting',
  },
  /**
   * Shown on a flat result, to a fifteen-year-old. It must not celebrate and it
   * must not read as disappointed: wing at rest, no star, eye level, posture
   * upright. Calm and present, not blank and not sympathetic.
   */
  neutral: {
    wing: 0,
    head: 0,
    tail: 0,
    lean: 0,
    eye: 'open',
    label: 'Avai, at rest',
  },
};

/* --- The shapes. Named parts, drawn back to front. --- */

function Tail({ sweep }: { sweep: number }) {
  return (
    <g transform={`rotate(${-sweep} 44 74)`}>
      <path
        d="M46 70 C34 70 22 76 12 86 C26 84 36 82 46 79 Z"
        fill="var(--orange)"
      />
      <path
        d="M46 76 C36 78 26 84 18 92 C30 89 40 87 47 84 Z"
        fill="var(--gold)"
      />
      <path
        d="M46 82 C38 85 31 90 26 97 C34 94 41 92 47 90 Z"
        fill="var(--coral)"
        opacity="0.85"
      />
    </g>
  );
}

function Feet() {
  return (
    <g stroke="var(--gold-deep)" strokeWidth="3.2" strokeLinecap="round">
      <path d="M62 104 L62 111" />
      <path d="M58 113 L66 113" />
      <path d="M76 104 L76 111" />
      <path d="M72 113 L80 113" />
    </g>
  );
}

function Body() {
  return (
    <path
      d="M96 66 C96 90 84 106 68 106 C52 106 42 92 42 72 C42 50 56 32 74 32 C88 32 96 46 96 66 Z"
      fill="var(--cream, #FBF6EC)"
    />
  );
}

function Wing({ lift }: { lift: number }) {
  /*
   * One feather template, pointing up from the shoulder, fanned four ways in
   * the wordmark's order. Gold is the leading edge and sits on top; navy is the
   * trailing feather closest to the body. At rest the fan drapes down and to
   * the left along the body; lift swings the whole fan up.
   *
   * Angles are SVG rotations, so negative is anticlockwise: -90 points left.
   */
  const FEATHERS = [
    { rest: -136, fill: 'var(--ink)' },
    { rest: -124, fill: 'var(--blue)' },
    { rest: -112, fill: 'var(--teal)' },
    { rest: -100, fill: 'var(--gold)' },
  ];

  return (
    <g>
      {FEATHERS.map((feather) => (
        <path
          key={feather.fill}
          transform={`rotate(${feather.rest + lift} 56 62)`}
          d="M56 62 C49 48 48 32 52 18 C61 30 64 47 62 62 Z"
          fill={feather.fill}
        />
      ))}
    </g>
  );
}

function Head({ tilt, eye }: { tilt: number; eye: PoseSpec['eye'] }) {
  return (
    <g transform={`rotate(${-tilt} 74 44)`}>
      <circle cx="74" cy="42" r="23" fill="var(--cream, #FBF6EC)" />
      {/* Crest, a short lift of the wing colours so the head reads as Avai's. */}
      <path
        d="M66 21 C68 12 74 7 82 5 C79 12 78 18 79 23 Z"
        fill="var(--blue)"
      />
      <path
        d="M74 20 C78 13 84 9 91 8 C87 14 85 19 85 24 Z"
        fill="var(--teal)"
      />
      {/* Beak. Small, orange, and always level with the eye. */}
      <path d="M93 44 L106 48 L93 53 Z" fill="var(--orange)" />
      {eye === 'happy' ? (
        <path
          d="M78 42 C81 37 86 37 89 42"
          fill="none"
          stroke="var(--ink-deep)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      ) : (
        <>
          <circle cx="84" cy="42" r="5" fill="var(--ink-deep)" />
          <circle cx="86" cy="40" r="1.7" fill="var(--white)" />
        </>
      )}
    </g>
  );
}

function Star() {
  return (
    <path
      d="M104 8 L107 15.5 L115 16.5 L109 21.5 L110.5 29.5 L104 25.5 L97.5 29.5 L99 21.5 L93 16.5 L101 15.5 Z"
      fill="var(--gold)"
    />
  );
}

export type MascotProps = {
  pose?: Pose;
  /** Rendered width and height in pixels. */
  size?: number;
  /**
   * Decorative by default. Pass a label only where the bird carries meaning
   * the surrounding copy does not already state.
   */
  label?: string;
  className?: string;
};

/**
 * Renders the full bird at 120px and up, and the head-only crop below that,
 * where the full silhouette stops being legible.
 */
export function Mascot({
  pose = 'neutral',
  size = 160,
  label,
  className,
}: MascotProps) {
  if (size < BODY_MIN_SIZE) {
    return (
      <MascotMark pose={pose} size={size} label={label} className={className} />
    );
  }

  const spec = POSES[pose];
  const a11y = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const };

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...a11y}
    >
      <g className={spec.bob ? styles.bob : undefined}>
        <g transform={`rotate(${spec.lean} 64 76)`}>
          <Tail sweep={spec.tail} />
          {pose !== 'achieve' && <Feet />}
          <Body />
          <Wing lift={spec.wing} />
          <Head tilt={spec.head} eye={spec.eye} />
        </g>
        {spec.star && <Star />}
      </g>
    </svg>
  );
}

/**
 * The head-only crop from the brand sheet's app icon. Used for the favicon, and
 * automatically by Mascot below 120px.
 */
export function MascotMark({
  pose = 'neutral',
  size = 48,
  label,
  className,
}: MascotProps) {
  const spec = POSES[pose];
  const a11y = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const };

  return (
    <svg
      viewBox="50 2 56 66"
      width={size}
      height={size}
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...a11y}
    >
      <g className={spec.bob ? styles.bob : undefined}>
        <Head tilt={spec.head} eye={spec.eye} />
      </g>
    </svg>
  );
}

export const POSE_NAMES = Object.keys(POSES) as Pose[];
export const poseLabel = (pose: Pose) => POSES[pose].label;
