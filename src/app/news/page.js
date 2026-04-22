'use client';
import { Box, Typography, Container, Grid, Card, CardContent, Chip, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MarketTicker from '../components/MarketTicker';
import Link from 'next/link';
import { useState } from 'react';

export default function NewsPage() {
    const [selectedNews, setSelectedNews] = useState(null);

    const newsItems = [
        {
            title: 'Why Mid-Cap Funds are Surging',
            date: '22 APR 2026',
            tag: 'Market Trends',
            icon: '📈',
            desc: 'Mid-cap stocks have shown remarkable resilience in the last quarter, outperforming large-cap indices by nearly 4%...',
            full: 'The current rally in mid-cap stocks is driven by strong domestic earnings and a surge in retail participation. Unlike large-cap stocks which are global-facing, mid-caps are benefiting from the domestic recovery in manufacturing and consumer spending. Analysts suggest that the valuation gap between large and mid-caps is tightening, making selective stock picking crucial for investors.'
        },
        {
            title: 'Impact of Interest Rates on Debt Funds',
            date: '21 APR 2026',
            tag: 'Economy',
            icon: '🏛️',
            desc: 'With the central bank hinting at a rate pause, debt fund investors are looking at attractive yields in the 3-5 year segment...',
            full: 'Interest rate cycles have a direct inverse relationship with debt fund returns. As we approach a potential peak in the rate hiking cycle, long-duration debt funds become attractive. Investors looking for stable income should consider Gilt funds or Dynamic Bond funds which can capitalize on potential rate cuts in late 2026.'
        },
        {
            title: 'Top 5 Tax Saving Funds for 2026',
            date: '20 APR 2026',
            tag: 'Investment Tips',
            icon: '💰',
            desc: 'ELSS funds remain the most attractive tax-saving instrument under Section 80C. Here are our top picks based on 5-year rolling returns...',
            full: 'ELSS (Equity Linked Savings Schemes) offer the shortest lock-in period of 3 years compared to other tax-saving instruments. For 2026, we recommend focusing on funds with a consistent 5-year alpha. Diversifying across 2 different AMC styles (Growth vs. Value) can further optimize your tax-saving portfolio performance.'
        },
        { title: 'The Rise of ESG Investing in India', date: '19 APR 2026', tag: 'Sustainability', icon: '🌱', desc: 'Environment, Social, and Governance (ESG) funds are seeing record inflows as millennial investors prioritize sustainable growth...', full: 'ESG investing is no longer a niche. Indian companies are increasingly adopting global disclosure standards, making it easier for fund managers to filter for high-governance firms. Data shows ESG leaders often exhibit lower volatility and better stock price resilience during market downturns.' },
        { title: 'Gold vs Equity: The 2026 Outlook', date: '18 APR 2026', tag: 'Asset Allocation', icon: '✨', desc: 'As global uncertainty persists, we analyze the historical correlation between gold and domestic equity markets...', full: 'A balanced portfolio in 2026 requires a strategic allocation to Gold as a hedge against inflation. While equity remains the primary wealth creator, maintaining 10-15% in Sovereign Gold Bonds or Gold ETFs is advisable given the current geopolitical landscape and currency fluctuations.' },
        { title: 'New Fund Offerings (NFO) to Watch', date: '17 APR 2026', tag: 'New Launches', icon: '🚀', desc: 'Several top fund houses are launching thematic funds this month. We evaluate which ones are worth your early investment...', full: 'NFOs can offer unique entries into nascent sectors like Green Energy or Semi-conductors. However, investors should be cautious of "gimmick" funds. Always check the track record of the underlying fund manager and ensure the theme fits your long-term risk profile before committing capital.' }
    ];

    return (
        <Box sx={{ background: '#0b0b0b', color: '#fff', minHeight: '100vh' }}>
            <Header />
            <MarketTicker />

            <Container maxWidth="lg" sx={{ pt: 15, pb: 10 }}>
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
                        Market <span style={{ color: '#ff7a00' }}>Analysis & News</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, mx: 'auto' }}>
                        Inside looks, daily updates, and expert analysis of the Indian Mutual Fund landscape.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {newsItems.map((news, i) => (
                        <Grid item xs={12} md={6} key={i}>
                            <Card
                                onClick={() => setSelectedNews(news)}
                                sx={{
                                    background: 'rgba(255,255,255,0.02)',
                                    borderRadius: 5,
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: '0.4s',
                                    cursor: 'pointer',
                                    height: '100%',
                                    '&:hover': { transform: 'translateY(-8px)', borderColor: '#ff7a00', boxShadow: '0 10px 40px rgba(255,122,0,0.1)' }
                                }}
                            >
                                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                        <Chip label={news.tag} sx={{ background: 'rgba(255,122,0,0.1)', color: '#ff7a00', fontWeight: 800, borderRadius: 2 }} />
                                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{news.date}</Typography>
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: '#fff' }}>{news.title}</Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4, lineHeight: 1.8 }}>{news.desc}</Typography>
                                    <Box sx={{ mt: 'auto' }}>
                                        <Button variant="text" sx={{ color: '#ff7a00', fontWeight: 800, p: 0 }}>Read Full Analysis →</Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Full Analysis Modal */}
            <Modal
                open={!!selectedNews}
                onClose={() => setSelectedNews(null)}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{
                    width: { xs: '90%', md: 600 },
                    bgcolor: '#1a1a1a',
                    borderRadius: 6,
                    p: 6,
                    border: '1px solid rgba(255,122,0,0.3)',
                    position: 'relative',
                    outline: 'none',
                    boxShadow: '0 0 50px rgba(255,122,0,0.2)'
                }}>
                    <IconButton
                        onClick={() => setSelectedNews(null)}
                        sx={{ position: 'absolute', top: 15, right: 15, color: 'rgba(255,255,255,0.5)' }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {selectedNews && (
                        <>
                            <Chip label={selectedNews.tag} sx={{ background: 'rgba(255,122,0,0.1)', color: '#ff7a00', mb: 3 }} />
                            <Typography variant="h4" sx={{ fontWeight: 900, color: '#fff', mb: 3 }}>{selectedNews.title}</Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, mb: 4 }}>
                                {selectedNews.full}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Published on {selectedNews.date}</Typography>
                                <Button onClick={() => setSelectedNews(null)} variant="outlined" sx={{ color: '#ff7a00', borderColor: '#ff7a00' }}>Close</Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>

            <Footer />
        </Box>
    );
}
