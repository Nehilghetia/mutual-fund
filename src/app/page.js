'use client';

import { Box, Typography, Button, Grid, Container } from '@mui/material';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function HomePage() {

  const features = [
    {
      icon: '📊',
      title: 'Comprehensive Fund Data',
      desc: 'Access performance, returns, and fund insights updated in real-time.',
    },
    {
      icon: '💡',
      title: 'Advanced SIP Calculator',
      desc: 'Simulate your investments using real NAV history and analytics.',
    },
    {
      icon: '📈',
      title: 'Smart Insights',
      desc: 'Compare top-performing funds and make data-driven decisions.',
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      desc: 'Your data and transactions are encrypted to ensure complete safety and privacy.',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#0b0b0b', color: '#fff', minHeight: '100vh' }}>


      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 10, md: 14 },
          px: 3,
          background: 'linear-gradient(135deg, #111, #1a1a1a)',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            background: 'linear-gradient(90deg, #ff7a00, #ffb347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Empower Your Wealth with Smart Mutual Fund Investments
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 4, color: '#bdbdbd', maxWidth: 700, mx: 'auto' }}
        >
          Analyze, compare, and simulate thousands of funds to make smarter investment decisions.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>

          <Link href="/funds">
            <Button
              variant="contained"
              sx={{
                px: 5,
                py: 1.5,
                background: 'linear-gradient(90deg, #ff7a00, #ffb347)',
                fontWeight: 'bold',
                borderRadius: '10px',
              }}
            >
              Explore Funds
            </Button>
          </Link>

          <Link href="/calculator">
            <Button
              variant="outlined"
              sx={{
                px: 5,
                py: 1.5,
                borderColor: '#ff7a00',
                color: '#ffb347',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
            >
              Try Calculator
            </Button>
          </Link>

        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h4"
          sx={{ mb: 6, fontWeight: 700, textAlign: 'center' }}
        >
          Why Choose <span style={{ color: '#ff7a00' }}>FundExplorer</span>
        </Typography>

        <Grid container spacing={4} justifyContent="center">

          {features.map((feature, idx) => (
            <Grid xs={12} sm={6} md={3} key={idx}>

              <Box
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: '#1e1e1e',
                  borderRadius: 4,
                  height: '100%',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 8px 25px rgba(255,122,0,0.2)',
                  },
                }}
              >
                <Typography sx={{ fontSize: 50 }}>{feature.icon}</Typography>

                <Typography
                  variant="h6"
                  sx={{ mt: 2, mb: 1, fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>

                <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                  {feature.desc}
                </Typography>

              </Box>

            </Grid>
          ))}

        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
          background: 'linear-gradient(90deg, #ff7a00, #ffb347)',
          color: '#000',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Start Your Investment Journey Today!
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Join thousands of investors using FundExplorer to track and grow their wealth.
        </Typography>

        <Link href="/signup">
          <Button
            variant="contained"
            sx={{
              background: '#000',
              color: '#ffb347',
              px: 5,
              py: 1.5,
              borderRadius: '10px',
              fontWeight: 'bold',
            }}
          >
            Get Started
          </Button>
        </Link>

      </Box>

      <Footer />

    </Box>


  );
}
