import styles from './MainPage.module.css'
import Feature from "@/components/feature/Feature";
import Articles from "@/components/articles";
import heroImage from "../../public/images/qblog-workplace-3.webp"
import Image from 'next/image';

export default function MainPage({ allArticlesData }) {

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <Image className={styles.heroImage} src={heroImage} alt="workplace"/>
                <div className={styles.hero_text}>
                    <h1 className={styles.main__heading}>qBlog</h1>
                    <p className={styles.hero_bodyText}>Workplace insights, simplified.</p>
                </div>
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