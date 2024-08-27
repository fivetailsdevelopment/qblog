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
            <Head>
                <title>{articleData.title}</title>
            </Head>
            <article>
                <div>
                    <Date dateString={articleData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
            </article>
        </section>
    )
}