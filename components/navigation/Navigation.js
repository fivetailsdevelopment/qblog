"use client";

import styles from "./Navigation.module.css";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className={styles.navigation_container} aria-label="Primary">
      <div className={styles.inner}>
        <a
          href="https://www.quantimatica.com.au"
          className={styles.logo_container}
          target="_blank"
          rel="noreferrer"
          aria-label="Quantimatica main site (opens in a new tab)"
        >
          <img height="42" src="/images/white_Q2_logo.svg" alt="Quantimatica logo" />
          <p className={styles.brandName}>Quantimatica</p>
        </a>

        <ul className={styles.navbar}>
          <li>
            <Link href="/" aria-current="page">
              Content
            </Link>
          </li>
        </ul>

        <div className={styles.contact_us_container}>
          <a
            className={styles.contactButton}
            href="https://www.quantimatica.com.au/#contact"
            target="_blank"
            rel="noreferrer"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
