import Link from "next/link";
import styles from "./ProductsStrip.module.css";
import { Icon, IconTile, type IconName } from "./Icon";

const PRODUCTS: { id: string; icon: IconName; tone: "gold" | "teal" | "blue"; name: string; line: string; points: string[] }[] = [
  {
    id: "papers",
    icon: "paper",
    tone: "gold",
    name: "Question Paper Engine",
    line: "CBSE papers built to the Board's own design.",
    points: ["Full syllabus or a unit test", "Marking scheme and design report"],
  },
  {
    id: "diagnostics",
    icon: "search",
    tone: "teal",
    name: "Avai Diagnostics",
    line: "The marks you already have, read down to the topic.",
    points: ["Per student, class and section", "Honest when evidence is thin"],
  },
  {
    id: "boardx",
    icon: "user",
    tone: "blue",
    name: "BoardX",
    line: "A profile of every student, Class 9 to Class 12.",
    points: ["Five dimensions per student", "One record across four years"],
  },
];

/** The three products as one system, each linking to its section on /products. */
export function ProductsStrip() {
  return (
    <div className={styles.strip} data-stagger>
      {PRODUCTS.map((p, i) => (
        <Link key={p.id} href={`/products#${p.id}`} className={`spot ${styles.card}`}>
          <span className={styles.top}>
            <IconTile name={p.icon} tone={p.tone} size={48} />
            <span className={styles.n}>0{i + 1}</span>
          </span>
          <b className={styles.name}>{p.name}</b>
          <span className={styles.line}>{p.line}</span>
          <ul className={styles.points}>
            {p.points.map((pt) => (
              <li key={pt}>
                <Icon name="check" size={13} strokeWidth={2.6} />
                {pt}
              </li>
            ))}
          </ul>
          <span className={styles.more}>
            Explore <Icon name="arrow-right" size={14} strokeWidth={2.2} />
          </span>
        </Link>
      ))}
    </div>
  );
}
