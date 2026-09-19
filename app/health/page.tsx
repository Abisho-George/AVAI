import styles from "./page.module.css";

type Token = { name: string; desc: string };
type Section = { title: string; tokens: Token[] };

const sections: Section[] = [
  {
    title: "Ink",
    tokens: [
      { name: "--ink", desc: "wordmark navy — primary text, dark surfaces" },
      { name: "--ink-2", desc: "hover state on dark surfaces" },
      { name: "--ink-deep", desc: "app-icon background" },
      { name: "--body", desc: "body copy" },
      { name: "--muted", desc: "hints, captions, table headers" },
    ],
  },
  {
    title: "Surfaces",
    tokens: [
      { name: "--paper", desc: "sheet background" },
      { name: "--paper-2", desc: "alternating band" },
      { name: "--white", desc: "white" },
      { name: "--tint", desc: "in-app assistant panel blue" },
      { name: "--line", desc: "border" },
      { name: "--line-soft", desc: "soft border" },
    ],
  },
  {
    title: "Wing gradient — the severity scale",
    tokens: [
      { name: "--teal", desc: "dot on the “i”, script underline — STRONG" },
      { name: "--teal-deep", desc: "teal, deep" },
      { name: "--teal-tint", desc: "teal, tint" },
      { name: "--blue", desc: "wing mid-tone — GOOD" },
      { name: "--blue-2", desc: "wing highlight" },
      { name: "--gold", desc: "wing leading edge — WATCH" },
      { name: "--gold-deep", desc: "gold, deep" },
      { name: "--gold-tint", desc: "gold, tint" },
      { name: "--orange", desc: "tail feather — HIGH" },
      { name: "--coral", desc: "AT RISK" },
      { name: "--coral-tint", desc: "coral, tint" },
    ],
  },
  {
    title: "Semantic — severity aliases",
    tokens: [
      { name: "--state-strong", desc: "strong / on track (never a generic green)" },
      { name: "--state-good", desc: "good" },
      { name: "--state-watch", desc: "watch" },
      { name: "--state-high", desc: "high" },
      { name: "--state-risk", desc: "risk" },
    ],
  },
  {
    title: "Semantic — attention pill",
    tokens: [
      { name: "--attention-track-bg", desc: "on track — background" },
      { name: "--attention-track-fg", desc: "on track — foreground" },
      { name: "--attention-watch-bg", desc: "watch — background" },
      { name: "--attention-watch-fg", desc: "watch — foreground" },
      { name: "--attention-act-bg", desc: "immediate — background" },
      { name: "--attention-act-fg", desc: "immediate — foreground" },
      { name: "--attention-inv-bg", desc: "investigation required — background" },
      { name: "--attention-inv-fg", desc: "investigation required — foreground" },
    ],
  },
];

export default function HealthPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Design tokens</h1>
      <p className={styles.intro}>
        Every colour and font below is read live from{" "}
        <code>styles/tokens.css</code>. Check this against{" "}
        <code>reference/brand-sheet.jpeg</code> before building anything else.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Type</h2>
        <div className={styles.fonts}>
          <div className={styles.fontSample}>
            <span className={styles.fontLabel}>--display (Outfit)</span>
            <span className={styles.displaySample}>What is stopping students from scoring higher?</span>
          </div>
          <div className={styles.fontSample}>
            <span className={styles.fontLabel}>--sans (IBM Plex Sans)</span>
            <span className={styles.sansSample}>146 of 240 students lost 4.2 marks per student on average.</span>
          </div>
          <div className={styles.fontSample}>
            <span className={styles.fontLabel}>--mono (IBM Plex Mono, tabular numerals)</span>
            <span className={styles.monoSample}>Q1 Q2 Q3 Q4 — 12 / 20 — 0123456789</span>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section className={styles.section} key={section.title}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <div className={styles.grid}>
            {section.tokens.map((token) => (
              <div className={styles.swatch} key={token.name}>
                <div className={styles.fill} style={{ background: `var(${token.name})` }} />
                <div className={styles.meta}>
                  <span className={styles.varName}>{token.name}</span>
                  <span className={styles.desc}>{token.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
