import styles from './Feature.module.css'
import Link from 'next/link'

import Date from '../date'

export default function Feature({ allArticlesData}) {

    const featureArticlesData = allArticlesData.filter(article => article.feature === 'Yes')

    return (
        <article>
           <ul className={styles.article_list} >
            {featureArticlesData.map(({ id, date, title, author, summary }) => (
                <li className={styles.blog_card} key={id}>
                    
                    <div className={styles.card__image}>
                        <img src="/images/maze-sketch.png" alt=""/>
                        <Link className={styles.article__title} href={`articles/${id}`}>{title}</Link>
                    </div>

                    <div className={styles.card__body}>

                        <div className={styles.article__summary}>
                            <p>{summary}</p>
                        </div>
                    </div>
                    <div className={styles.card__footer}>
                        {author}
                        <Date dateString={date} />
                    </div>
                </li>
            ))}
           </ul>
        </article>
    )
}