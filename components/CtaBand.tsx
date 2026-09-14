import Link from 'next/link';
import { Mascot } from './Mascot';
import styles from './CtaBand.module.css';

export type CtaBandProps = {
  title: string;
  body?: string;
  action: { href: string; label: string };
  secondary?: { href: string; label: string };
  /**
   * The achieve pose. Reserved for a genuine standout, which on this site means
   * exactly once: the final call to action on the homepage. Every other CtaBand
   * leaves it off, and no page may set it twice.
   */
  mascot?: boolean;
};

export function CtaBand({ title, body, action, secondary, mascot }: CtaBandProps) {
  return (
    <section className={styles.band}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 className={styles.title}>{title}</h2>
          {body && <p className={styles.body}>{body}</p>}
          <div className={styles.actions}>
            <Link className={styles.primary} href={action.href}>
              {action.label}
            </Link>
            {secondary && (
              <Link className={styles.ghost} href={secondary.href}>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
        {mascot && (
          <div className={styles.bird}>
            <Mascot pose="achieve" size={160} />
          </div>
        )}
      </div>
    </section>
  );
}
