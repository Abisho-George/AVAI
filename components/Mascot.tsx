import styles from "./Mascot.module.css";

/**
 * Avai, the bird from reference/brand-sheet.jpeg: cream body, a fanned wing
 * running navy → blue → teal → gold, orange tail streaks, a small orange
 * beak, dark eye with a highlight.
 *
 * This is a stand-in for final artwork — every shape lives in this one file
 * with clear names so swapping in real vectors later touches nothing else.
 */

export type MascotPose = "hello" | "improve" | "achieve" | "wait" | "calm";

type MascotProps = {
  pose: MascotPose;
  size?: number;
  className?: string;
  title?: string;
};

const VIEWBOX = "0 0 136 140";

// Pivot the wing fans out from, and the point the head tilts around.
const WING_PIVOT = "76 70";
const HEAD_CENTER = "45 45";

type PoseConfig = {
  wingRotate: number;
  headTilt: number;
  tailRotate: number;
  star: boolean;
  bob: boolean;
};

const POSES: Record<MascotPose, PoseConfig> = {
  hello: { wingRotate: -12, headTilt: 6, tailRotate: 0, star: false, bob: false },
  improve: { wingRotate: -26, headTilt: -4, tailRotate: -4, star: false, bob: false },
  achieve: { wingRotate: -38, headTilt: -6, tailRotate: -8, star: true, bob: false },
  wait: { wingRotate: 0, headTilt: 0, tailRotate: 0, star: false, bob: true },
  calm: { wingRotate: 5, headTilt: 0, tailRotate: 4, star: false, bob: false },
};

/** The four feathers of the wing fan, base to tip, navy through gold. */
function WingFeathers() {
  return (
    <>
      <path
        d="M76,70 C70,50 72,28 78,10 C86,26 86,50 80,68 Z"
        fill="var(--ink)"
      />
      <path
        d="M78,68 C82,48 90,28 98,14 C104,32 100,54 88,66 Z"
        fill="var(--blue-2)"
      />
      <path
        d="M86,66 C94,50 104,36 114,28 C118,44 112,60 98,64 Z"
        fill="var(--teal)"
      />
      <path
        d="M94,62 C104,52 114,44 122,48 C122,60 112,66 100,60 Z"
        fill="var(--gold)"
      />
    </>
  );
}

function TailStreaks() {
  return (
    <>
      <path d="M46,94 C36,104 26,117 16,129 C23,111 29,97 39,87 Z" fill="var(--orange)" />
      <path d="M53,97 C45,109 37,121 29,131 C35,115 41,103 49,91 Z" fill="var(--orange)" opacity={0.75} />
    </>
  );
}

function Body() {
  return (
    <>
      <ellipse cx="62" cy="78" rx="30" ry="26" fill="var(--paper-2)" stroke="var(--line)" />
      <ellipse cx="58" cy="88" rx="17" ry="13" fill="var(--white)" opacity={0.8} />
    </>
  );
}

/** Head, beak and eye — also reused standalone by MascotMark. */
function Head() {
  return (
    <>
      <circle cx="45" cy="45" r="22" fill="var(--paper-2)" stroke="var(--line)" />
      <path d="M22,45 L8,50 L22,55 Z" fill="var(--orange)" />
      <circle cx="39" cy="41" r="5" fill="var(--ink)" />
      <circle cx="41" cy="39" r="1.7" fill="var(--white)" />
    </>
  );
}

function Star() {
  return (
    <path
      d="M108,4 L111,12 L120,12 L113,17.5 L115.5,26 L108,20.5 L100.5,26 L103,17.5 L96,12 L105,12 Z"
      fill="var(--gold)"
    />
  );
}

export function Mascot({ pose, size = 96, className, title }: MascotProps) {
  const cfg = POSES[pose];
  return (
    <svg
      className={[styles.mascot, cfg.bob ? styles.bob : "", className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox={VIEWBOX}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <g transform={`rotate(${cfg.tailRotate} 60 80)`}>
        <TailStreaks />
      </g>
      <Body />
      <g transform={`rotate(${cfg.wingRotate} ${WING_PIVOT})`}>
        <WingFeathers />
      </g>
      <g transform={`rotate(${cfg.headTilt} ${HEAD_CENTER})`}>
        <Head />
      </g>
      {cfg.star ? <Star /> : null}
    </svg>
  );
}

/** Head-only crop of the mascot, for the app icon and favicon at small sizes. */
export function MascotMark({ size = 32, className, title }: Omit<MascotProps, "pose">) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="6 8 62 60"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <Head />
    </svg>
  );
}
