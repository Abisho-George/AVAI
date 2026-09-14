import styles from './PageHeader.module.css';

export type PageHeaderProps = {
  /** Short section label. Says where the reader is, not how they feel. */
  eyebrow?: string;
  title: string;
  lede?: string;
};

export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
      </div>
    </div>
  );
}
