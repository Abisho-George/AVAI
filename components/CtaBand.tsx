import Link from "next/link";
import styles from "./CtaBand.module.css";

type CtaBandProps = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
};

/** The closing pitch band: a heading, one line, one button. */
export function CtaBand({ title, description, ctaLabel, ctaHref, className }: CtaBandProps) {
  return (
    <section className={className}>
      <div className="wrap">
        <div className={styles.ctaBand}>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <Link className="btn btn-gold" href={ctaHref}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
