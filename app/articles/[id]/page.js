import Head from 'next/head';
import Date from '../../../components/date';
import styles from './page.module.css'

import { getAllArticleIds, getArticleData } from '@/lib/articles';

export async function getStaticPaths() {
    const paths = getAllArticleIds();
    return {
        paths,
        fallback: false
    };
}

export default async function Post({ params }) {

    const articleData = await getArticleData(params.id); 

    const handleReturn = (e) => {
        console.log('hello')
    }

    return (
        <section className={styles.article_page}>
            <div className={styles.whitePage}>
            <Head>
                <title>{articleData.title}</title>
            </Head>
            <article>
                <div className={styles.headingBanner}>
                    <span className={styles.date}><Date dateString={articleData.date} /></span>
                    <h1>{articleData.title}</h1>
                    <p className={styles.author}>{articleData.author}</p>
                </div>
                <div  className={styles.articleBody}>
                    <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
                </div>
            </article>
            <footer className={styles.article__footer}>
            <h3>{articleData.author}</h3>
            <p><strong>Email:</strong> articles@quantimatica.com.au</p>
            </footer>
            </div>
        </section>
    )
}