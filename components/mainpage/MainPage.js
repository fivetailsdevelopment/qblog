import styles from "./MainPage.module.css";
import Feature from "@/components/feature/Feature";
import ArticlesBrowser from "@/components/articles/ArticlesBrowser";
import heroImage from "../../public/images/network-mesh.webp";
import RecentNotes from "@/components/recent-notes/RecentNotes";
import Image from "next/image";

export default function MainPage({ allArticlesData }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <section className={styles.wrapper}>
      {/* HERO: title + tagline only */}
      <div className={styles.header}>
        <Image className={styles.heroImage} src={heroImage} alt="network" priority />
        <div className={styles.heroOverlay} />

        <div className={styles.hero_text}>
          <h1 className={styles.main__heading}>
            <span className={styles.qMark}>q</span>Blog {isDev && <span className={styles.devBadge}>Dev</span>}
          </h1>
          <p className={styles.hero_bodyText}>
            Insights and practical thinking on culture, capability, and how work actually gets done.
          </p>
        </div>
      </div>

      {/* RECENT POSTS BAND */}
      <section className={styles.band} aria-label="Recent posts">
        <div className={styles.bandInner}>
          <div className={styles.bandHeader}>
            <h2 className={styles.bandTitle}>Recent Posts</h2>
          </div>
          <RecentNotes />
        </div>
      </section>

      {/* MAIN */}
      <div className={styles.main}>
        <div className={styles.section__column_left}>
          {allArticlesData && <Feature allArticlesData={allArticlesData} />}
        </div>

        <div className={styles.section__column_right}>
          {allArticlesData && <ArticlesBrowser allArticlesData={allArticlesData} />}
        </div>
      </div>
    </section>
  );
}
