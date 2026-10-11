import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";
import { Icon, type IconName } from "./Icon";
import { SchoolDoodles } from "./SchoolDoodles";

type PageHeaderProps = {
  eyebrow?: string;
  icon?: IconName;
  title: string;
  lede?: string;
  /** A graphic shown beside the heading on wide screens, below it on narrow ones. */
  aside?: ReactNode;
};

/** The section at the top of every inner page: eyebrow, h1, lede, optional graphic. */
export function PageHeader({ eyebrow, icon, title, lede, aside }: PageHeaderProps) {
  return (
    <section className={`${styles.pghead} ${aside ? styles.withAside : ""} has-doodles`}>
      <SchoolDoodles variant="header" />
      <div className="wrap">
        <div className={styles.grid}>
          <div>
            {eyebrow ? (
              <p className="chip enter">
                {icon ? <Icon name={icon} size={16} /> : null}
                {eyebrow}
              </p>
            ) : null}
            <h1 className="enter" style={{ ["--d" as string]: "0.08s" }}>
              {title}
            </h1>
            {lede ? (
              <p className="lede enter" style={{ ["--d" as string]: "0.16s" }}>
                {lede}
              </p>
            ) : null}
          </div>
          {aside ? (
            <div className={`${styles.aside} enter`} style={{ ["--d" as string]: "0.24s" }}>
              {aside}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
