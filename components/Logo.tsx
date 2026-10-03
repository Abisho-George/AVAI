import Image from "next/image";
import styles from "./Logo.module.css";

type LogoProps = {
  /** Use on dark surfaces: the footer, the portal panel. */
  dark?: boolean;
  /** Rendered height in px. */
  height?: number;
  className?: string;
};

// Intrinsic size of the exported wordmark in public/brand/.
const W = 411;
const H = 120;

/** The AVAI wordmark. The dark-surface version swaps the navy letterforms for white. */
export function Logo({ dark = false, height = 34, className }: LogoProps) {
  return (
    <Image
      className={[styles.logo, className].filter(Boolean).join(" ")}
      src={dark ? "/brand/avai-logo-light.webp" : "/brand/avai-logo.webp"}
      width={Math.round((height * W) / H)}
      height={height}
      alt="Avai"
      priority={!dark}
    />
  );
}
