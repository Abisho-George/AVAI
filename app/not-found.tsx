import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";
import { Mascot } from "@/components/Mascot";

export const metadata: Metadata = {
  title: "Page not found — Avai",
};

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <Mascot pose="hello" size={120} title="Avai" />
      <h1>Page not found</h1>
      <p className={styles.line}>
        That page doesn&rsquo;t exist. The rest of the site is right where you left it.
      </p>
      <Link className="btn btn-primary" href="/">
        Back to avai.school
      </Link>
    </div>
  );
}
