'use client';

import { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

const goalPlans = [
    {
        id: 'retirement',
        title: 'Retirement Planning',
        desc: 'Build a massive corpus for a peaceful life after work.',
        icon: '🏖️',
        suggestedCategory: 'Small Cap / Flexi Cap',
        benefits: ['Long-term compounding', 'Aggressive Growth', 'Wealth Creation'],
        color: '#ff7a00'
    },
    {
        id: 'tax',
        title: 'Tax Saving (ELSS)',
        desc: 'Save up to ₹46,800 in taxes under Section 80C.',
        icon: '📝',
        suggestedCategory: 'ELSS (Equity Linked Saving Scheme)',
        benefits: ['Lowest Lock-in (3Y)', 'High Returns', 'Tax Deductions'],
        color: '#4caf50'
    },
    {
        id: 'emergency',
        title: 'Emergency Fund',
        desc: 'Park your money safely for unexpected expenses.',
        icon: '🛡️',
        suggestedCategory: 'Liquid / Debt Funds',
        benefits: ['Instant Liquidity', 'Low Risk', 'Stable Returns'],
        color: '#4facfe'
    },
    {
        id: 'education',
        title: 'Kids Education',
        desc: 'Secure your children\'s future education needs.',
        icon: '🎓',
        suggestedCategory: 'Balanced / Hybrid Funds',
        benefits: ['Moderate Risk', 'Capital Protection', 'Structured Growth'],
        color: '#f093fb'
    }
];

export default function GoalsPage() {
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
            <Header />

            <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff', mb: 2 }}>
                        Invest by <span style={{ color: '#4caf50' }}>Life Goals</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: 700, mx: 'auto' }}>
                        Choose a strategy that matches your dream and timeline.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {goalPlans.map((plan) => (
                        <Grid item xs={12} sm={6} md={3} key={plan.id}>
                            <Card sx={{
                                background: 'rgba(255,255,255,0.03)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: 5,
                                border: `1px solid ${plan.color}33`,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                '&:hover': { transform: 'translateY(-8px)', borderColor: plan.color, background: 'rgba(255,255,255,0.05)' }
                            }}>
                                <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                        <Box sx={{ fontSize: '2.5rem' }}>{plan.icon}</Box>
                                        <Typography variant="caption" sx={{ color: plan.color, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>{plan.id}</Typography>
                                    </Box>

                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, mb: 1 }}>{plan.title}</Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mb: 2, lineHeight: 1.5, minHeight: 45, display: 'block' }}>{plan.desc}</Typography>

                                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 2 }} />

                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mb: 0.5, fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Recommended</Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 800, mb: 2, minHeight: 40, lineHeight: 1.3 }}>{plan.suggestedCategory}</Typography>

                                    <Box sx={{ mb: 2, flexGrow: 1 }}>
                                        {plan.benefits.map(b => (
                                            <Box key={b} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                <CheckCircleIcon sx={{ color: plan.color, fontSize: 12, mr: 1 }} />
                                                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.7rem' }}>{b}</Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    <Link href="/funds" style={{ textDecoration: 'none' }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                bgcolor: plan.color,
                                                color: '#000',
                                                fontWeight: 900,
                                                py: 1.2,
                                                borderRadius: 2.5,
                                                fontSize: '0.75rem',
                                                '&:hover': { background: plan.color, filter: 'brightness(1.1)' }
                                            }}
                                        >
                                            Explore <ArrowForwardIosIcon sx={{ fontSize: 10, ml: 1 }} />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}

function CheckCircleIcon(props) {
    return (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    );
}
