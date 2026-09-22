import { Mascot, MascotMark, type MascotPose } from "@/components/Mascot";
import styles from "./page.module.css";

const POSES: MascotPose[] = ["hello", "improve", "achieve", "wait", "calm"];
const SIZES = [48, 96, 160];

export default function MascotHealthPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Mascot</h1>
      <p className={styles.intro}>
        Every pose in <code>components/Mascot.tsx</code>, at the sizes it will
        actually ship at. Check this reads correctly at 48px before it goes
        anywhere else — that&rsquo;s much cheaper to fix now than once it is
        embedded across nine pages. &ldquo;wait&rdquo; bobs gently; that
        animation respects <code>prefers-reduced-motion</code>.
      </p>

      <div className={styles.table}>
        <div className={styles.rowHead}>
          <span className={styles.cell}>Pose</span>
          {SIZES.map((size) => (
            <span className={styles.cell} key={size}>
              {size}px
            </span>
          ))}
        </div>
        {POSES.map((pose) => (
          <div className={styles.row} key={pose}>
            <span className={styles.poseLabel}>{pose}</span>
            {SIZES.map((size) => (
              <div className={styles.cell} key={size}>
                <Mascot pose={pose} size={size} title={`Avai, ${pose} pose`} />
                <span className={styles.size}>{size}px</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <section className={styles.mark}>
        <h2 className={styles.title} style={{ fontSize: "1.2rem" }}>
          MascotMark — head-only crop
        </h2>
        <p className={styles.intro}>
          Used for the app icon and favicon, and anywhere the full body reads
          too small (below 120px in place of a full pose).
        </p>
        <div className={styles.markRow}>
          {[16, 24, 32, 48, 64].map((size) => (
            <div className={styles.markSwatch} key={size}>
              <MascotMark size={size} title="Avai" />
            </div>
          ))}
          <div className={`${styles.markSwatch} ${styles.dark}`}>
            <MascotMark size={48} title="Avai" />
          </div>
        </div>
      </section>
    </main>
  );
}
