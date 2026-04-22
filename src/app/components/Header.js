'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import usePortfolio from '@/hooks/usePortfolio';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getEnhancedFundDetails } from '@/app/utils/fundDetails';

export default function Header({ title }) {
  const { portfolio } = usePortfolio();

  // Calculate dynamic current value based on time-weighted performance
  const currentValue = portfolio.reduce((acc, item) => {
    const details = getEnhancedFundDetails(item.schemeCode);
    const annualReturn = parseFloat(details.oneYearReturn);

    const buyDate = new Date(item.date);
    const today = new Date();
    const daysPassed = Math.max(1, Math.ceil(Math.abs(today - buyDate) / (1000 * 60 * 60 * 24)));

    const dailyGrowth = (annualReturn / 100) / 365;
    const currentGrowthFactor = 1 + (dailyGrowth * daysPassed);

    return acc + (Number(item.invested) * currentGrowthFactor);
  }, 0);

  const totalInvested = portfolio.reduce((acc, curr) => acc + Number(curr.invested || 0), 0);

  return (
    <header className={styles.header}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className={styles.logo}>{title || 'FundExplorer'}</div>
        </Link>
        <Box sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          background: 'rgba(255,255,255,0.05)',
          px: 1.5,
          py: 0.5,
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box sx={{
            width: 8,
            height: 8,
            bgcolor: '#4caf50',
            borderRadius: '50%',
            mr: 1,
            boxShadow: '0 0 10px #4caf50'
          }} />
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: 1 }}>
            LIVE MARKET
          </Typography>
        </Box>
      </Box>
      <nav>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/funds">Explore</Link></li>
          <li><Link href="/active-funds">Active</Link></li>
          <li><Link href="/ranking">Rankings</Link></li>
          <li><Link href="/compare">Compare</Link></li>
          <li><Link href="/goals">Goals</Link></li>
          <li><Link href="/learn">Learn</Link></li>
          <li><Link href="/news">News</Link></li>
          <li><Link href="/watchlist">Watchlist</Link></li>
          <li><Link href="/portfolio" style={{
            background: 'rgba(76, 175, 80, 0.12)',
            padding: '8px 20px',
            borderRadius: '50px',
            color: '#4caf50',
            fontWeight: 900,
            border: '1px solid rgba(76, 175, 80, 0.25)',
            display: 'inline-block'
          }}>Portfolio</Link></li>
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
