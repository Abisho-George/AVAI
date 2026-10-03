import Image from "next/image";
import styles from "./Mascot.module.css";

/**
 * Avai, the bird from the brand artwork in public/brand/. Hello is the
 * default pose; Achieve is reserved for the homepage's final call to action.
 * MascotMark is the head-only crop for anything under 120px.
 */

export type MascotPose = "hello" | "achieve";

type MascotProps = {
  pose: MascotPose;
  /** Rendered width in px. Full body only at 120 and up (CLAUDE.md). */
  size?: number;
  className?: string;
  /** Accessible name. Omit when the bird is decorative next to text that already says it. */
  title?: string;
};

const POSES: Record<MascotPose, { src: string; width: number; height: number }> = {
  hello: { src: "/brand/mascot-hello.webp", width: 480, height: 476 },
  // Cut from the brand sheet on a near-white ground; only place it on a light surface.
  achieve: { src: "/brand/mascot-achieve.webp", width: 500, height: 334 },
};

export function Mascot({ pose, size = 120, className, title }: MascotProps) {
  const art = POSES[pose];
  return (
    <Image
      className={[styles.mascot, pose === "achieve" ? styles.onLight : "", className].filter(Boolean).join(" ")}
      src={art.src}
      width={size}
      height={Math.round((size * art.height) / art.width)}
      alt={title ?? ""}
    />
  );
}

/** Head-only crop of the mascot, for small sizes. */
export function MascotMark({ size = 32, className, title }: Omit<MascotProps, "pose">) {
  return (
    <Image
      className={[styles.mascot, className].filter(Boolean).join(" ")}
      src="/brand/mascot-head.webp"
      width={size}
      height={size}
      alt={title ?? ""}
    />
  );
}
