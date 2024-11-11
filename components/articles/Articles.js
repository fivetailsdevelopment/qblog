import styles from './Articles.module.css'
import Link from 'next/link'

import Date from '../date';


export default function Articles({ allArticlesData }) {
//   console.log(allArticlesData)

    return (
        <article>
           <ul className={styles.article__list} >
            {allArticlesData.map(({ id, date, title, author, summary }) => (
                <li className={styles.cardNew} key={id}>
                    <div className={styles.card__body}>
                        <p className={styles.article__date}>Published <Date dateString={date} /></p>
                        <div className={styles.cardNew_Title}>
                            <Link href={`articles/${id}`}>{title}</Link>
                        </div>
                        <div className={styles.cardNew_Body}>
                            <p>{summary}</p>
                        </div>
                    </div>
                    <div className={styles.cardNew_Button}><Link href={`articles/${id}`}>Open article</Link></div>
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