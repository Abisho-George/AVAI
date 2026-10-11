import Link from "next/link";
import styles from "./CtaBand.module.css";
import { Mascot, type MascotPose } from "./Mascot";
import { SchoolDoodles } from "./SchoolDoodles";
import { Icon } from "./Icon";

type CtaBandProps = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
  /**
   * Only the homepage's final CtaBand should pass "achieve": CLAUDE.md
   * reserves that pose for exactly one appearance sitewide. Other pages
   * that want a mascot here should use "hello" instead.
   */
  mascotPose?: MascotPose;
  /** "gold" (default) for a hard sell; "line" for a softer ask like "Still have questions?". */
  ctaTone?: "gold" | "line";
};

/** The closing pitch band: a heading, one line, one button. */
export function CtaBand({
  title,
  description,
  ctaLabel,
  ctaHref,
  className,
  mascotPose,
  ctaTone = "gold",
}: CtaBandProps) {
  return (
    <section className={`${className ?? ""} has-doodles`}>
      <SchoolDoodles variant={className?.includes("band-ink") ? "dark" : "header"} />
      <div className="wrap">
        <div className={`${styles.ctaBand} glow-border spot`} data-reveal="zoom">
          <div className={styles.copy}>
            {mascotPose ? <Mascot pose={mascotPose} size={mascotPose === "achieve" ? 180 : 120} /> : null}
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
          <Link className={`btn btn-${ctaTone}`} href={ctaHref}>
            {ctaLabel}
            <Icon name="arrow-right" size={16} strokeWidth={2.2} className="btn-ic" />
          </Link>
        </div>
      </div>
    </section>
  );
}
