import type { Metadata } from 'next';
import { Mascot, MascotMark, POSE_NAMES, poseLabel } from '../../../components/Mascot';
import styles from './mascot.module.css';

export const metadata: Metadata = {
  title: 'Mascot poses · Avai',
  robots: { index: false, follow: false },
};

const SIZES = [48, 96, 160];

export default function MascotHealth() {
  return (
    <main className={styles.page}>
      <header>
        <h1>Mascot poses</h1>
        <p className={styles.lede}>
          Five poses. <code>Mascot</code> renders the full bird at 120px and up
          and the head-only crop below that, so the 48px and 96px columns show
          the crop by design, not by omission. Not linked from the site and not
          indexed.
        </p>
      </header>

      <section className={styles.block}>
        <h2>Improve and neutral, side by side</h2>
        <p className={styles.lede}>
          These two must read as different states rather than as happy and sad.
          Neutral is the flat-result pose on a student report: wing at rest, no
          star, eye level, upright. Calm and present.
        </p>
        <div className={styles.pair}>
          <figure className={styles.figure}>
            <Mascot pose="improve" size={160} />
            <figcaption>
              <strong>improve</strong>
              <span>Lifted wing, head up, tail swept. A stronger attempt.</span>
            </figcaption>
          </figure>
          <figure className={styles.figure}>
            <Mascot pose="neutral" size={160} />
            <figcaption>
              <strong>neutral</strong>
              <span>Wing tucked, level gaze, feet planted. A flat result.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.block}>
        <h2>Every pose, at every size</h2>
        <div className={styles.scroller}>
          <table className={styles.grid}>
          <thead>
            <tr>
              <th scope="col">Pose</th>
              {SIZES.map((size) => (
                <th scope="col" key={size}>
                  {size}px
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {POSE_NAMES.map((pose) => (
              <tr key={pose}>
                <th scope="row">
                  <code>{pose}</code>
                  <span className={styles.note}>{poseLabel(pose)}</span>
                </th>
                {SIZES.map((size) => (
                  <td key={size}>
                    <Mascot pose={pose} size={size} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </section>

      <section className={styles.block}>
        <h2>MascotMark, the app-icon crop</h2>
        <p className={styles.lede}>
          On the app icon ground, which is <code>--ink-deep</code>.
        </p>
        <div className={styles.icons}>
          {POSE_NAMES.map((pose) => (
            <figure key={pose} className={styles.icon}>
              <span className={styles.iconTile}>
                <MascotMark pose={pose} size={40} />
              </span>
              <figcaption>
                <code>{pose}</code>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
