'use client';
import { Box, Container, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
            <Header />
            <Container maxWidth="md" sx={{ py: 10 }}>
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.03em' }}>
                    Terms of <span style={{ color: '#ff7a00' }}>Service</span>
                </Typography>

                <Box className="glass-card" sx={{ p: 6, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                    <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>1. Acceptance of Terms</Typography>
                    <Typography sx={{ mb: 4 }}>
                        By accessing FundExplorer, you agree to comply with these terms. The platform is provided &quot;as-is&quot; for informational purposes only.
                    </Typography>

                    <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>2. Not Financial Advice</Typography>
                    <Typography sx={{ mb: 4 }}>
                        The data, rankings, and simulations provided are for educational purposes. We are not SEBI-registered advisors. Always consult a professional before making investment decisions.
                    </Typography>

                    <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>3. Data Accuracy</Typography>
                    <Typography sx={{ mb: 4 }}>
                        While we strive for 100% accuracy using official APIs, we are not responsible for any discrepancies caused by third-party data providers or technical delays.
                    </Typography>

                    <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>4. User Responsibility</Typography>
                    <Typography>
                        Users are responsible for how they use the information provided. Redistribution of our analytics or scraping our service is prohibited.
                    </Typography>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}
