'use client';
import { Box, Container, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPage() {
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
            <Header />
            <Container maxWidth="md" sx={{ py: 10 }}>
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.03em' }}>
                    Privacy <span style={{ color: '#ff7a00' }}>Policy</span>
                </Typography>

                <Box className="glass-card" sx={{ p: 6, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                    <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>1. Data Collection</Typography>
                    <Typography sx={{ mb: 4 }}>
                        We collect minimal technical data required to provide mutual fund insights. This includes API query parameters and watchlist preferences stored locally in your browser.
                    </Typography>

                    <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>2. Usage of Information</Typography>
                    <Typography sx={{ mb: 4 }}>
                        Your data is used solely to personalize your experience, such as maintaining your saved funds and providing accurate calculator simulations.
                    </Typography>

                    <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>3. Third-Party Services</Typography>
                    <Typography sx={{ mb: 4 }}>
                        We use public APIs from mfapi.in and AMFI to provide live market data. These services may have their own privacy policies. We do not sell your data to any third parties.
                    </Typography>

                    <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>4. Security</Typography>
                    <Typography>
                        We implement industry-standard encryption and security measures to protect the platform. Since we do not store sensitive financial credentials, your risk is minimized.
                    </Typography>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}
