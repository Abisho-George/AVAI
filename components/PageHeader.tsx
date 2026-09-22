import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
};

/** The section at the top of every inner page: eyebrow, h1, lede. */
export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <section className={styles.pghead}>
      <div className="wrap">
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
    </section>
  );
}
