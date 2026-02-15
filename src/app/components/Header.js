'use client';
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Header({ title }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{title || 'FundExplorer'}</div>
      <nav>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/funds">Explore Funds</Link></li>
          <li><Link href="/active-funds">Active Funds</Link></li> {/* ✅ New link added */}
          <li><Link href="/ranking">Rankings</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/watchlist">Watchlist</Link></li>
          <li>
            <Link href="/calculator" className={styles.sipButton}>
              Calculator
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
