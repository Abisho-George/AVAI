import type { Metadata } from 'next';
import { readTokens, isColour } from './readTokens';
import styles from './health.module.css';

export const metadata: Metadata = {
  title: 'Token palette · Avai',
  robots: { index: false, follow: false },
};

/**
 * All five carry a 1px border so their metrics are identical. Only
 * Insufficient evidence draws one; the other four are transparent.
 */
const ATTENTION = [
  { label: 'Immediate', bg: '--attention-act-bg', fg: '--attention-act-fg' },
  { label: 'Watch', bg: '--attention-watch-bg', fg: '--attention-watch-fg' },
  { label: 'On track', bg: '--attention-track-bg', fg: '--attention-track-fg' },
  {
    label: 'Investigation required',
    bg: '--attention-inv-bg',
    fg: '--attention-inv-fg',
  },
  {
    label: 'Insufficient evidence',
    bg: '--attention-insuf-bg',
    fg: '--attention-insuf-fg',
    border: '--attention-insuf-border',
  },
];

export default async function Health() {
  const groups = await readTokens();

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <h1>Token palette</h1>
        <p>
          Every custom property in <code>styles/tokens.css</code>, read from the
          file at build time and shown in source order. Check these against
          <code> reference/brand-sheet.jpeg</code>. Not linked from the site and
          not indexed.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.title} className={styles.group}>
          <h2>{group.title}</h2>
          <ul className={styles.swatches}>
            {group.tokens.map((token) => (
              <li key={token.name} className={styles.swatch}>
                <span
                  className={
                    isColour(token) ? styles.chip : `${styles.chip} ${styles.chipAlias}`
                  }
                  style={{ background: `var(${token.name})` }}
                  aria-hidden="true"
                />
                <span className={styles.meta}>
                  <code className={styles.name}>{token.name}</code>
                  <span className={styles.value}>{token.value}</span>
                  {token.note ? (
                    <span className={styles.note}>{token.note}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className={styles.group}>
        <h2>Attention pills, as they will be painted</h2>
        <p className={styles.lede}>
          Five values. <code>Insufficient evidence</code> is derived from
          existing tokens rather than sampled, because the brand sheet has no
          neutral pill. It is the quietest of the five, and its border keeps it
          legible on a <code>--paper-2</code> band.
        </p>
        <ul className={styles.pills}>
          {ATTENTION.map((state) => (
            <li
              key={state.label}
              className={styles.pill}
              style={{
                background: `var(${state.bg})`,
                color: `var(${state.fg})`,
                borderColor: state.border ? `var(${state.border})` : 'transparent',
              }}
            >
              {state.label}
            </li>
          ))}
        </ul>
        <p className={styles.lede}>
          The same five on a <code>--paper-2</code> band, which is where an
          unbordered neutral pill would disappear.
        </p>
        <ul className={`${styles.pills} ${styles.onBand}`}>
          {ATTENTION.map((state) => (
            <li
              key={state.label}
              className={styles.pill}
              style={{
                background: `var(${state.bg})`,
                color: `var(${state.fg})`,
                borderColor: state.border ? `var(${state.border})` : 'transparent',
              }}
            >
              {state.label}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.group}>
        <h2>Type specimens</h2>
        <p className={styles.display}>
          Outfit, display. What is stopping students from scoring higher?
        </p>
        <p className={styles.sans}>
          IBM Plex Sans, body. 146 of 240 students, 4.2 marks per student.
        </p>
        <p className={styles.mono}>
          IBM Plex Mono, marks and IDs. 31/2/1 · 0123456789
        </p>
        <p className={styles.sans}>
          Tabular numerals line up: 1111111111 / 0000000000
        </p>
      </section>
    </main>
  );
}
