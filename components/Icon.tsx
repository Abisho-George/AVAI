/**
 * Line icons drawn on a 24px grid with a 1.8 stroke in currentColor, so they
 * take the colour of whatever text they sit beside. Always decorative: the
 * label next to the icon carries the meaning.
 */

export type IconName =
  | "paper"
  | "blueprint"
  | "scorecard"
  | "scan"
  | "check"
  | "check-circle"
  | "gauge"
  | "finding"
  | "target"
  | "share"
  | "lock"
  | "key"
  | "users"
  | "user"
  | "calendar"
  | "school"
  | "chat"
  | "send"
  | "eye"
  | "chart"
  | "layers"
  | "arrow-right"
  | "clock"
  | "research"
  | "building"
  | "shield"
  | "flag"
  | "search"
  | "pause"
  | "play"
  | "no-rank"
  | "numbers"
  | "pen-off"
  | "info"
  | "alert"
  | "mail"
  | "spark"
  | "settings"
  | "book"
  | "laptop"
  | "cursor"
  | "bell";

const PATHS: Record<IconName, React.ReactNode> = {
  paper: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 11h5M10 15h5" />
    </>
  ),
  blueprint: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 10v10M13 14h4M13 17h2" />
    </>
  ),
  scorecard: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h3v3H8zM13 8h3v3h-3zM8 14h3v3H8zM13 14h3v3h-3z" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M4 12h16" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16.5 9.5" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.5 17a8.5 8.5 0 1 1 15 0" />
      <path d="M12 13l4-4" />
      <circle cx="12" cy="13" r="1.2" />
    </>
  ),
  finding: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9h6M7 13h10M7 16h4" />
      <circle cx="17" cy="9" r="1.6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.3 10.8l7.4-3.6M8.3 13.2l7.4 3.6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8-8M16 7l2.5 2.5M14 9l2 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.8c1.6.7 2.6 2.4 3 4.7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  school: (
    <>
      <path d="M3 10l9-5 9 5-9 5z" />
      <path d="M7 12.2V17c1.4 1.3 3 2 5 2s3.6-.7 5-2v-4.8" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  send: (
    <>
      <path d="M20.5 3.5L3.5 10.5l7 3 3 7z" />
      <path d="M10.5 13.5l10-10" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 16v-4M12 16V7M17 16v-7" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5" />
    </>
  ),
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  research: (
    <>
      <path d="M9 3h6M10 3v6L5 18.5A1.6 1.6 0 0 0 6.4 21h11.2a1.6 1.6 0 0 0 1.4-2.5L14 9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5l8-2v18M12 7h8v14" />
      <path d="M7 8h2M7 12h2M7 16h2M15 11h2M15 15h2M2.5 21h19" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z" />
      <path d="M8.8 12l2.3 2.3 4.2-4.3" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  pause: <path d="M8.5 5v14M15.5 5v14" />,
  play: <path d="M7 4.5l12 7.5-12 7.5z" />,
  "no-rank": (
    <>
      <path d="M6 20v-5M12 20V9M18 20v-8" />
      <path d="M4 4l16 16" />
    </>
  ),
  numbers: (
    <>
      <path d="M5 8l2-1.5V17M11 8.5a2.2 2.2 0 0 1 4 1.2c0 2.3-4 3.6-4 7.3h4.5" />
      <path d="M17.5 7h3l-1.8 3.2a2.4 2.4 0 1 1-1.6 4.4" />
    </>
  ),
  "pen-off": (
    <>
      <path d="M15 5l4 4-9.5 9.5H5.5v-4z" />
      <path d="M3 3l18 18" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.8v.4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5l9.5 16.5h-19z" />
      <path d="M12 10v4.5M12 17.2v.4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  spark: <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
  book: (
    <>
      <path d="M3.5 6c3-1.5 6-1.5 8.5 0v13c-2.5-1.5-5.5-1.5-8.5 0z" />
      <path d="M20.5 6c-3-1.5-6-1.5-8.5 0v13c2.5-1.5 5.5-1.5 8.5 0z" />
    </>
  ),
  laptop: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M2 19h20" />
    </>
  ),
  cursor: <path d="M5 3.5l13 7-5.6 1.6L10 18z" />,
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function Icon({ name, size = 22, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}

/** An icon in a soft rounded tile, for feature lists and step headers. */
export function IconTile({
  name,
  tone = "teal",
  size = 44,
}: {
  name: IconName;
  tone?: "teal" | "blue" | "gold" | "ink" | "coral";
  size?: number;
}) {
  return (
    <span className={`icon-tile icon-tile-${tone}`} style={{ width: size, height: size }}>
      <Icon name={name} size={Math.round(size * 0.5)} />
    </span>
  );
}
