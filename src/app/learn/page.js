'use client';

import { Box, Typography, Container, Grid, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';

const lessons = [
    { title: 'What is a Mutual Fund?', desc: 'Learn the basics of how professional managers pool money to invest in stocks and bonds.', icon: '🎓' },
    { title: 'Choosing between SIP & Lumpsum', desc: 'Understand the power of Rupee Cost Averaging versus one-time investing.', icon: '💰' },
    { title: 'Understanding Riskometers', desc: 'How to read the risk levels from Moderate to Very High for your funds.', icon: '⚠️' },
    { title: 'Expense Ratio & Exit Loads', desc: 'Hidden costs that can affect your long-term returns if not monitored.', icon: '📉' }
];

const faqs = [
    { q: "How do I start investing?", a: "You can search for any fund in our Explore section, click on 'Invest Now', and add it to your personal portfolio." },
    { q: "Is my data secure?", a: "We use localized encrypted storage to ensure your portfolio and watchlist remain private on your device." },
    { q: "What is NAV?", a: "Net Asset Value (NAV) represents the market value per unit of a mutual fund scheme." },
    { q: "Can I sell my funds anytime?", a: "Yes, you can visit your Portfolio page and click the 'Sell' button to remove holdings from your tracker." }
];

export default function EducationPage() {
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
            <Header />

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff', mb: 2 }}>
                        <SchoolIcon sx={{ fontSize: '4rem', color: '#4caf50', verticalAlign: 'middle', mr: 2 }} />
                        Investor <span style={{ color: '#4caf50' }}>Education</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Everything you need to know to become a smart investor.
                    </Typography>
                </Box>

                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 4 }}>Learning Modules</Typography>
                <Grid container spacing={4} sx={{ mb: 10 }}>
                    {lessons.map((lesson, i) => (
                        <Grid item xs={12} md={6} key={i}>
                            <Card sx={{ background: 'rgba(255,255,255,0.03)', borderRadius: 5, border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s', '&:hover': { background: 'rgba(255,255,255,0.06)' } }}>
                                <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ fontSize: '3rem', mr: 4 }}>{lesson.icon}</Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, mb: 1 }}>{lesson.title}</Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{lesson.desc}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 4 }}>Common Questions (FAQ)</Typography>
                <Box sx={{ mb: 10 }}>
                    {faqs.map((f, i) => (
                        <Accordion key={i} sx={{ background: 'rgba(255,255,255,0.02)', color: '#fff', mb: 2, borderRadius: '16px !important', '&:before': { display: 'none' }, border: '1px solid rgba(255,255,255,0.05)' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#4caf50' }} />}>
                                <Typography sx={{ fontWeight: 700, p: 1 }}>{f.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: 'rgba(255,255,255,0.5)', pb: 2, px: 1 }}>{f.a}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}
