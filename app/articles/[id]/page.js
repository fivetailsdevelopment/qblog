import Link from "next/link";
import Date from "../../../components/date";
import styles from "./page.module.css";
import { getAllArticleParams, getArticleData } from "@/lib/articles";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/readingprogress/ReadingProgress";

export async function generateStaticParams() {
  return getAllArticleParams();
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const articleData = await getArticleData(id);
    return { title: articleData.title };
  } catch {
    return { title: "Article not found" };
  }
}

export default async function Post({ params }) {
  const { id } = await params;

  let articleData;
  try {
    articleData = await getArticleData(id);
  } catch {
    return notFound();
  }

  return (
    <section className={styles.articlePage}>
      <ReadingProgress targetId="articleContent" />
      <div className={styles.shell}>
        <Link href="/" className={styles.backLink}>
          <span aria-hidden="true" className={styles.backIcon}>←</span>
          Back to articles
        </Link>

        <header className={styles.header}>
          <div className={styles.metaRow}>
            <span className={styles.date}>
              <Date dateString={articleData.date} />
            </span>
            {articleData.author ? (
              <span className={styles.metaSep} aria-hidden="true">•</span>
            ) : null}
            {articleData.author ? (
              <span className={styles.author}>{articleData.author}</span>
            ) : null}
            {articleData.minutesToRead ? (
              <>
                <span className={styles.metaSep} aria-hidden="true">•</span>
                <span className={styles.readTime}>{articleData.minutesToRead} min read</span>
              </>
            ) : null}
          </div>

          <h1 className={styles.title}>{articleData.title}</h1>

          {articleData.summary ? (
            <p className={styles.summary}>{articleData.summary}</p>
          ) : null}
          <div className={styles.titleDivider} aria-hidden="true" />
        </header>

        <article className={styles.article} id="articleContent">
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
          />
        </article>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <h3 className={styles.footerTitle}>{articleData.author}</h3>
            <p className={styles.footerText}>
              <strong>Email:</strong>{" "}
              <a className={styles.footerLink} href="mailto:articles@quantimatica.com.au">
                articles@quantimatica.com.au
              </a>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
