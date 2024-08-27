import styles from './Articles.module.css'
import Link from 'next/link'

import Date from '../date';


export default function Articles({ allArticlesData }) {
//   console.log(allArticlesData)

    return (
        <article>
           <ul className={styles.article__list} >
            {allArticlesData.map(({ id, date, title, author, summary }) => (
                <li className={styles.card} key={id}>

                    <div className={styles.card__image}>
                        <img src='/images/maze-sketch.png'/>
                    </div>

                    <div className={styles.card__body}>
                        <div className={styles.card__tag}>
                            <p className={styles.article__tags}>Problem Solving</p>
                        </div>
                        <p className={styles.article__date}>Published <Date dateString={date} /></p>
                        <div className={styles.article__title}>
                            <Link href={`articles/${id}`}>{title}</Link>
                        </div>
                        <div className={styles.article__summary}>
                            <p>{summary}</p>
                        </div>
                    </div>

                    <div className={styles.card__footer}>
                        <div className={styles.profile_img_container}><img src="/images/jh_profile.svg" height="40px" width="40px" alt="profile photo" /></div>
                        {author}
                    </div>
                </li>
            ))}
           </ul>
        </article>
    )
}