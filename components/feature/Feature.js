import styles from "./Feature.module.css";
import Link from "next/link";
import Date from "../date";

export default function Feature({ allArticlesData }) {
  const featured = allArticlesData
    .filter((a) => a.feature === "Yes")
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  if (!featured) return null;

  const { id, date, title, author, summary } = featured;

  return (
    <aside aria-label="Featured article" className={styles.wrapper}>
      <Link className={styles.card} href={`/articles/${id}`}>
        <div className={styles.image}>
          {/* keep your existing hero image for now */}
          <img src="/articleimages/ai-evolution.webp" alt="" aria-hidden="true" />
          <div className={styles.imageOverlay} />
          <div className={styles.imageTitle}>{title}</div>
        </div>

        <div className={styles.body}>
          <p className={styles.kicker}>Featured</p>
          <p className={styles.summary}>{summary}</p>
        </div>

        <div className={styles.footer}>
          <div className={styles.authorRow}>
            <div className={styles.avatar}>
              <img src="/images/jh_profile.svg" height="32" width="32" alt="" aria-hidden="true" />
            </div>
            <span className={styles.author}>{author}</span>
          </div>
          <span className={styles.date}>
            <Date dateString={date} />
          </span>
        </div>
      </Link>
    </aside>
  );
}
