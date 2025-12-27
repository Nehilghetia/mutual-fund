'use client';

import { Box, Typography, Grid, Container } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: '#0b0b0b', color: '#fff', minHeight: '100vh' }}>
      <Header />

      {/* Intro */}
      <Container sx={{ py: 10, textAlign: 'center', maxWidth: 800 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            background: 'linear-gradient(90deg, #ff7a00, #ffb347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          About FundExplorer
        </Typography>

        <Typography variant="body1" sx={{ color: '#bdbdbd', mb: 3 }}>
          FundExplorer is your one-stop destination for exploring and analyzing mutual funds. We
          simplify complex investment data into easy insights so you can make confident, informed
          decisions about your wealth.
        </Typography>
      </Container>

      {/* Mission & Vision */}
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Our Mission
        </Typography>
        <Typography sx={{ color: '#bdbdbd', mb: 5, maxWidth: 700, mx: 'auto' }}>
          To make investing accessible, transparent, and data-driven for everyone — from beginners
          to professionals.
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Our Vision
        </Typography>
        <Typography sx={{ color: '#bdbdbd', maxWidth: 700, mx: 'auto' }}>
          Empowering investors to take control of their financial growth using AI-powered mutual
          fund insights and easy-to-use tools.
        </Typography>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
          Why <span style={{ color: '#ff7a00' }}>Choose FundExplorer</span>
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            { icon: '📊', title: 'Data-Driven Insights', desc: 'Access real-time performance analytics for 5,000+ mutual funds.' },
            { icon: '💡', title: 'Smart SIP Calculator', desc: 'Estimate your future wealth using historical NAV data.' },
            { icon: '🔒', title: 'Safe & Secure', desc: 'Your financial data is protected with industry-standard encryption.' },
            { icon: '🤝', title: 'Trusted by Investors', desc: 'Join thousands of users tracking and comparing funds daily.' },
          ].map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: '#1e1e1e',
                  borderRadius: 4,
                  textAlign: 'center',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 8px 25px rgba(255, 122, 0, 0.2)',
                  },
                }}
              >
                <Typography sx={{ fontSize: 40 }}>{feature.icon}</Typography>
                <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: '#bdbdbd' }}>{feature.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Final Message */}
      <Box
        sx={{
          py: 6,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #ff7a00, #ffb347)',
          color: '#000',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Join the FundExplorer Community Today!
        </Typography>
        <Typography variant="body1">
          Take your first step towards smarter and more confident mutual fund investing.
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
}
