import styles from "./RecentNotes.module.css";
import notes from "@/content/recent-notes.json";

export default function RecentNotes() {
  if (!notes?.length) return null;

  return (
    <div className={styles.grid}>
      {notes.map((n) => (
        <a
          key={n.url}
          className={styles.card}
          href={n.url}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.meta}>LinkedIn</div>

          <div className={styles.title}>
            {n.title || "Recent note on LinkedIn"}
          </div>

          <div className={styles.cta}>Read</div>
        </a>
      ))}
    </div>
  );
}
