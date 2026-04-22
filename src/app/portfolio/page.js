'use client';

import { Box, Typography, Container, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Snackbar, Alert } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePortfolio from '@/hooks/usePortfolio';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { getEnhancedFundDetails } from '../utils/fundDetails';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function PortfolioPage() {
    const { portfolio, sellTransaction } = usePortfolio();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    // Generate chart data based UNLY on actual time elapsed since purchase
    const chartData = useMemo(() => {
        const points = [];
        const baseValue = portfolio.reduce((acc, curr) => acc + Number(curr.invested || 0), 0);
        if (baseValue === 0) return [];

        // Find earliest buy date
        const earliest = new Date(Math.min(...portfolio.map(f => new Date(f.date))));
        const today = new Date();
        const diff = Math.ceil(Math.abs(today - earliest) / (1000 * 60 * 60 * 24));

        // Average portfolio return
        const avgReturn = portfolio.reduce((acc, curr) => acc + parseFloat(getEnhancedFundDetails(curr.schemeCode).oneYearReturn), 0) / portfolio.length;
        const dailyRate = (avgReturn / 100) / 365;

        // Show growth since buy date
        for (let i = 0; i <= diff; i++) {
            const d = new Date(earliest);
            d.setDate(d.getDate() + i);
            const label = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
            points.push({ date: label, value: Math.round(baseValue * (1 + (dailyRate * i))) });
        }
        return points;
    }, [portfolio]);

    // Calculate dynamic current value based on each fund's performance and time held
    const portfolioSummary = portfolio.reduce((acc, item) => {
        const details = getEnhancedFundDetails(item.schemeCode);
        const annualReturn = parseFloat(details.oneYearReturn);

        // Calculate days since investment
        const buyDate = new Date(item.date);
        const today = new Date();
        const diffTime = Math.abs(today - buyDate);
        const daysPassed = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); // Min 1 day for simulation

        // Daily growth Rate (approximate compounding for 1 year)
        const dailyGrowth = (annualReturn / 100) / 365;
        const totalGrowthFactor = 1 + (dailyGrowth * daysPassed);

        const itemCurrentValue = Number(item.invested) * totalGrowthFactor;

        acc.invested += Number(item.invested);
        acc.current += Number(itemCurrentValue);
        return acc;
    }, { invested: 0, current: 0 });

    const totalInvested = portfolioSummary.invested;
    const currentValue = portfolioSummary.current;
    const totalGain = currentValue - totalInvested;
    const gainPercent = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
            <Header />

            <Container maxWidth="xl" sx={{ py: 6 }}>
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff', mb: 1 }}>
                        Personal <span style={{ color: '#4caf50' }}>Portfolio</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                        Track your wealth and monitor mutual fund performance in real-time.
                    </Typography>
                </Box>

                {/* Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {[
                        { label: 'Total Invested', value: `₹${totalInvested.toLocaleString('en-IN')}`, icon: <AccountBalanceWalletIcon />, color: '#fff' },
                        { label: 'Current Value', value: `₹${currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: <TrendingUpIcon />, color: '#4caf50' },
                        { label: 'Total Returns', value: `+₹${totalGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })} (${gainPercent.toFixed(2)}%)`, icon: <TrendingUpIcon />, color: '#4caf50' }
                    ].map((card, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Box className="glass-card" sx={{ p: 4, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'rgba(255,255,255,0.5)' }}>
                                    {card.icon}
                                    <Typography variant="subtitle2" sx={{ ml: 1, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{card.label}</Typography>
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 900, color: card.color }}>{card.value}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Portfolio Trend Chart */}
                {portfolio.length > 0 && (
                    <Box sx={{ mb: 6, p: 4, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 5 }}>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center' }}>
                            <TrendingUpIcon sx={{ mr: 1, color: '#4caf50' }} /> Personal Portfolio Growth (Since Buy)
                        </Typography>
                        <Box sx={{ height: 350, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4caf50" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 700 }}
                                    />
                                    <YAxis
                                        hide
                                        domain={['dataMin - 10000', 'dataMax + 10000']}
                                    />
                                    <Tooltip
                                        contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#4caf50', fontWeight: 800 }}
                                        labelStyle={{ color: 'rgba(255,255,255,0.5)', mb: 0.5 }}
                                        formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Portfolio Value']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4caf50"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Box>
                )}

                {/* Holdings Table */}
                <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 3 }}>Active Holdings</Typography>

                {portfolio.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 10, background: 'rgba(255,255,255,0.02)', borderRadius: 4, border: '2px dashed rgba(255,255,255,0.05)' }}>
                        <Typography variant="h6" sx={{ color: '#555', mb: 3 }}>No investments found in your portfolio.</Typography>
                        <Button component={Link} href="/funds" variant="outlined" sx={{ borderColor: '#4caf50', color: '#4caf50', fontWeight: 700, borderRadius: 2 }}>Start Investing Now</Button>
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ background: 'rgba(26,26,26,0.5)', backdropFilter: 'blur(10px)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                        <Table>
                            <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.3)' }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, border: 0 }}>SCHEME NAME</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, border: 0 }}>UNITS</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, border: 0 }}>BUY PRICE</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, border: 0 }}>INVESTED</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, border: 0 }}>CURRENT VALUE</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, border: 0 }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {portfolio.map((item) => {
                                    const details = getEnhancedFundDetails(item.schemeCode);
                                    const annualReturn = parseFloat(details.oneYearReturn);

                                    const buyDate = new Date(item.date);
                                    const today = new Date();
                                    const daysPassed = Math.max(1, Math.ceil(Math.abs(today - buyDate) / (1000 * 60 * 60 * 24)));

                                    const dailyGrowth = (annualReturn / 100) / 365;
                                    const personalGrowthRate = dailyGrowth * daysPassed;
                                    const itemCurrentValue = item.invested * (1 + personalGrowthRate);
                                    const isPositive = annualReturn >= 0;

                                    return (
                                        <TableRow key={item.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                                            <TableCell sx={{ border: 0, color: '#fff', fontWeight: 700 }}>{item.schemeName}</TableCell>
                                            <TableCell sx={{ border: 0, color: 'rgba(255,255,255,0.7)' }}>{item.units.toFixed(3)}</TableCell>
                                            <TableCell sx={{ border: 0, color: 'rgba(255,255,255,0.7)' }}>₹{item.buyPrice}</TableCell>
                                            <TableCell sx={{ border: 0, color: '#fff', fontWeight: 800 }}>₹{item.invested.toLocaleString('en-IN')}</TableCell>
                                            <TableCell sx={{ border: 0 }}>
                                                <Typography sx={{ color: isPositive ? '#4caf50' : '#f44336', fontWeight: 900 }}>
                                                    ₹{itemCurrentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: isPositive ? '#4caf50' : '#f44336', fontWeight: 700 }}>
                                                    {isPositive ? '+' : ''}{(personalGrowthRate * 100).toFixed(4)}% (Since Buy)
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ border: 0 }}>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => {
                                                        sellTransaction(item.id);
                                                        setSnackbar({ open: true, message: `Units of ${item.schemeName} sold successfully!`, severity: 'error' });
                                                    }}
                                                    sx={{ bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' }, borderRadius: 2, fontWeight: 800 }}
                                                >
                                                    Sell
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%', fontWeight: 700, borderRadius: 3 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Footer />
        </Box >
    );
}
