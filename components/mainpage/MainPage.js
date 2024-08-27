import styles from './MainPage.module.css'
import Feature from "@/components/feature/Feature";
import Articles from "@/components/articles";

export default function MainPage({ allArticlesData }) {

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.main__heading}>qBlog</h1>
                <p>A selection of articles, research and insights about how getting better results in workplace ecosystems.</p>
            </div>
            <div className={styles.main}>
                <div className={styles.section__column_left}>
                    {allArticlesData && <Feature allArticlesData={allArticlesData} />}
                </div>
                <div className={styles.section__column_right}>
                    {allArticlesData && <Articles allArticlesData={allArticlesData} />}
                </div>
            </div>
        </section>
    )
}