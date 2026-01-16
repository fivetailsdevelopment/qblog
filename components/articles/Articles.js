import styles from "./Articles.module.css";
import Link from "next/link";
import Date from "../date";

export default function Articles({ allArticlesData }) {
  return (
    <section aria-label="Articles">
      <ul className={styles.grid}>
        {allArticlesData.map(({ id, date, title, author, summary }) => (
          <li className={styles.card} key={id}>
            <div className={styles.body}>
              <p className={styles.date}>
                Published <Date dateString={date} />
              </p>

              <h3 className={styles.title}>
                <Link href={`/articles/${id}`}>{title}</Link>
              </h3>

              <p className={styles.summary}>{summary}</p>
            </div>

            <div className={styles.footer}>
              <div className={styles.authorRow}>
                <div className={styles.avatar}>
                  <img
                    src="/images/jh_profile.svg"
                    height="40"
                    width="40"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <span className={styles.authorName}>{author}</span>
              </div>

              <Link className={styles.cta} href={`/articles/${id}`}>
                Open →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
