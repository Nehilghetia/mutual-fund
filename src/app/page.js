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

  const stats = [
    { label: 'Active Investors', value: '10K+' },
    { label: 'Mutual Funds', value: '5,000+' },
    { label: 'Data Updates', value: 'Real-time' },
    { label: 'User Satisfaction', value: '99%' },
  ];

  return (
    <Box sx={{ bgcolor: 'transparent', color: '#fff', minHeight: '100vh' }}>

      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 10, md: 15 },
          px: 3,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h2"
          className="animate-float"
          sx={{
            fontWeight: 900,
            mb: 3,
            fontSize: { xs: '2.8rem', md: '4.5rem' },
            background: 'linear-gradient(90deg, #fff 0%, #ff7a00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
          }}
        >
          Empower Your Wealth with <br />
          <span style={{ color: '#ff7a00' }}>Smart Mutual Fund</span> Investments
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 5,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: 850,
            mx: 'auto',
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            lineHeight: 1.6,
          }}
        >
          Master your financial future. Analyze, compare, and simulate thousands of funds with
          enterprise-grade analytics tailored for the modern investor.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Link href="/funds">
            <Button
              variant="contained"
              sx={{
                px: 6,
                py: 2,
                background: 'linear-gradient(90deg, #ff7a00, #ffb347)',
                fontWeight: 800,
                borderRadius: '14px',
                fontSize: '1.1rem',
                boxShadow: '0 8px 25px rgba(255, 122, 0, 0.4)',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(90deg, #ffb347, #ff7a00)',
                  transform: 'translateY(-3px)',
                  transition: '0.3s'
                }
              }}
            >
              Explore Funds
            </Button>
          </Link>

          <Link href="/calculator">
            <Button
              variant="outlined"
              sx={{
                px: 6,
                py: 2,
                borderColor: 'rgba(255, 122, 0, 0.6)',
                borderWidth: '2px',
                color: '#fff',
                borderRadius: '14px',
                fontWeight: 800,
                fontSize: '1.1rem',
                textTransform: 'none',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: '#ff7a00',
                  borderWidth: '2px',
                  background: 'rgba(255, 122, 0, 0.1)',
                  transform: 'translateY(-3px)',
                  transition: '0.3s'
                }
              }}
            >
              Simulation Tool
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, borderY: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(255,255,255,0.02)' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 4, sm: 6, md: 8, lg: 12 }
            }}
          >
            {stats.map((stat, idx) => (
              <Box key={idx} sx={{ textAlign: 'center', minWidth: 'fit-content' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#ff7a00', mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Why Choose Section */}
      <Container sx={{ py: 15 }}>
        <Typography
          variant="h3"
          sx={{ mb: 2, fontWeight: 900, textAlign: 'center', letterSpacing: '-0.02em' }}
        >
          Why Choose <span style={{ color: '#ff7a00' }}>FundExplorer</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'center', maxWidth: 600, mx: 'auto' }}
        >
          We provide the tools you need to stay ahead in the market.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 2.5,
            mt: 6
          }}
        >
          {features.map((feature, idx) => (
            <Box
              key={idx}
              className="glass-card"
              sx={{
                p: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '320px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#ff7a00',
                  transform: 'translateY(-10px)',
                  boxShadow: '0 10px 30px rgba(255, 122, 0, 0.15)'
                }
              }}
            >
              <Box sx={{
                fontSize: 64,
                mb: 4,
                filter: 'drop-shadow(0 0 15px rgba(255, 122, 0, 0.2))'
              }}>
                {feature.icon}
              </Box>

              <Typography
                variant="h5"
                sx={{ mb: 2, fontWeight: 800, color: '#fff', fontSize: '1.4rem' }}
              >
                {feature.title}
              </Typography>

              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.7 }}>
                {feature.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Suggested Section: Asset Categories */}
      <Box sx={{ py: 15, position: 'relative' }}>
        <Container>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 900, mb: 10 }}>
            Invest in <span style={{ color: '#ff7a00' }}>Categories</span> That Matter
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)'
              },
              gap: 2.5
            }}
          >
            {[
              { name: 'Equity Funds', color: '#4facfe', desc: 'High growth potential for long-term wealth.' },
              { name: 'Debt Funds', color: '#00f2fe', desc: 'Stable returns with lower risk profiles.' },
              { name: 'Hybrid Funds', color: '#f093fb', desc: 'The best of both worlds: equity & debt.' },
              { name: 'Index Funds', color: '#ff9a9e', desc: 'Low-cost tracking of market indices.' }
            ].map((cat, i) => (
              <Box key={i} sx={{
                p: 4,
                borderRadius: '24px',
                background: `linear-gradient(135deg, ${cat.color}15, transparent)`,
                border: `1px solid ${cat.color}33`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': {
                  background: `linear-gradient(135deg, ${cat.color}33, transparent)`,
                  transform: 'translateY(-10px)',
                  borderColor: cat.color
                },
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: cat.color }}>
                    {cat.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, lineHeight: 1.6 }}>
                    {cat.desc}
                  </Typography>
                </Box>
                <Link href="/funds" style={{ textDecoration: 'none' }}>
                  <Button sx={{
                    color: cat.color,
                    fontWeight: 800,
                    p: 0,
                    width: 'fit-content',
                    textTransform: 'none',
                    '&:hover': { background: 'none', color: '#fff' }
                  }}>
                    Learn More →
                  </Button>
                </Link>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: 'center',
          py: 15,
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(circle at center, rgba(255, 122, 0, 0.1) 0%, transparent 70%)'
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, letterSpacing: '-0.03em' }}>
          Ready to Grow Your Wealth?
        </Typography>

        <Typography variant="h6" sx={{ mb: 8, color: 'rgba(255, 255, 255, 0.7)', maxWidth: 650, mx: 'auto' }}>
          Join 10,000+ investors who trust FundExplorer for their daily insights and simulations.
        </Typography>

        <Link href="/signup">
          <Button
            variant="contained"
            sx={{
              background: '#fff',
              color: '#000',
              px: 10,
              py: 3,
              borderRadius: '20px',
              fontWeight: 900,
              fontSize: '1.3rem',
              textTransform: 'none',
              boxShadow: '0 15px 40px rgba(255, 255, 255, 0.2)',
              '&:hover': {
                background: '#ff7a00',
                color: '#fff',
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 50px rgba(255, 122, 0, 0.5)'
              }
            }}
          >
            Start Investing Free
          </Button>
        </Link>
      </Box>

      <Footer />

    </Box>
  );
}
