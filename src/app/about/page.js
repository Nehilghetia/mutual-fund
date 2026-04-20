'use client';

import { Box, Typography, Grid, Container } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
      <Header />

      {/* Intro */}
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            color: '#fff',
            mb: 3,
            letterSpacing: '-0.03em'
          }}
        >
          About <span style={{ color: '#ff7a00' }}>FundExplorer</span>
        </Typography>

        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.8, fontWeight: 500 }}>
          FundExplorer is a high-performance analytics platform designed to simplify
          mutual fund investing. We bridge the gap between complex market data and
          actionable financial insights.
        </Typography>
      </Container>

      {/* Mission & Vision */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box className="glass-card" sx={{ p: 6, height: '100%', borderLeft: '4px solid #ff7a00' }}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 3, color: '#fff' }}>
                Our Mission
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                To democratize financial intelligence by providing every investor with
                enterprise-grade tools, real-time data transparency, and unbiased
                fund analytics.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="glass-card" sx={{ p: 6, height: '100%', borderLeft: '4px solid #ffb347' }}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 3, color: '#fff' }}>
                Our Vision
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                To become the global standard for mutual fund analysis, where data-driven
                decisions replace guesswork, empowering a new generation of wealth builders.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 15 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 10, fontWeight: 900 }}>
          Why <span style={{ color: '#ff7a00' }}>Trust Us</span>
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 3
          }}
        >
          {[
            { icon: '📊', title: 'Live Data', desc: 'Real-time performance sync from primary market sources.' },
            { icon: '💡', title: 'Simulations', desc: 'Advanced algorithms to predict future wealth growth.' },
            { icon: '🔒', title: 'Privacy First', desc: 'Cloud-native security for your financial watchlist.' },
            { icon: '🤝', title: 'Expert Picks', desc: 'Data-backed fund rankings updated daily.' },
          ].map((feature, idx) => (
            <Box
              key={idx}
              className="glass-card"
              sx={{
                p: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                '&:hover': {
                  borderColor: '#ff7a00',
                  transform: 'translateY(-10px)'
                }
              }}
            >
              <Typography sx={{ fontSize: 48, mb: 2 }}>{feature.icon}</Typography>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 800, color: '#fff' }}>
                {feature.title}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{feature.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Final Message */}
      <Box
        sx={{
          py: 12,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255, 122, 0, 0.2), transparent)',
          borderY: '1px solid rgba(255, 255, 255, 0.05)',
          mb: 10
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
          Join the FundExplorer Community Today!
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, mx: 'auto', mb: 5 }}>
          Take your first step towards smarter and more confident mutual fund investing.
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
}
