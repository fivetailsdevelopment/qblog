'use client'

import styles from './Navigation.module.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navigation() {

    const pathname = usePathname();
    const router = useRouter();

    function goHome() {
        router.push('/')
    }

    return (
        <nav className={styles.navigation_container}>
            <a href="http://wwww.quantimatica.com.au"><div className={styles.logo_container}>
                    <img height="50px" src="/images/qlogo_white.svg"/>
                    <p>QUANTIMATICA</p>
                    </div></a>
            <ul className={styles.navbar}>
                <li><Link href="/">qBlog Home</Link></li>
            </ul>
            <div className={styles.contact_us_container}>
                <button>Contact Us</button>
            </div>
        </nav>
    )
}