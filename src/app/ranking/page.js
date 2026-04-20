'use client';

import { Box, Typography, Grid, Container, Divider } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RankingPage() {

  const topFunds = [
    { rank: 1, name: 'SBI Bluechip Fund', category: 'Large Cap', return: '12.5%' },
    { rank: 2, name: 'HDFC Midcap Opportunities Fund', category: 'Mid Cap', return: '15.2%' },
    { rank: 3, name: 'Axis Small Cap Fund', category: 'Small Cap', return: '18.9%' },
    { rank: 4, name: 'ICICI Prudential Equity & Debt Fund', category: 'Balanced Advantage', return: '10.3%' },
    { rank: 5, name: 'Kotak Emerging Equity Fund', category: 'Mid Cap', return: '14.8%' },
    { rank: 6, name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', return: '13.6%' },
    { rank: 7, name: 'Nippon India Small Cap Fund', category: 'Small Cap', return: '19.5%' },
    { rank: 8, name: 'Mirae Asset Large Cap Fund', category: 'Large Cap', return: '11.9%' },
    { rank: 9, name: 'Canara Robeco Emerging Equities', category: 'Large & Mid Cap', return: '13.4%' },
    { rank: 10, name: 'UTI Flexi Cap Fund', category: 'Flexi Cap', return: '12.8%' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
      <Header />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: '#fff',
              mb: 2,
              letterSpacing: '-0.03em'
            }}
          >
            Top <span style={{ color: '#ff7a00' }}>Ranked Funds</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
            Expert curated selections based on 3-year performance and risk-adjusted returns.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 3,
            mb: 10
          }}
        >
          {topFunds.map((fund) => (
            <Box
              key={fund.rank}
              className="glass-card"
              sx={{
                p: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                minHeight: '300px',
                position: 'relative'
              }}
            >
              <Typography
                sx={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: 'rgba(255, 122, 0, 0.2)',
                  position: 'absolute',
                  top: 10,
                  right: 20
                }}
              >
                #{fund.rank}
              </Typography>

              <Typography
                variant="h5"
                sx={{ fontWeight: 800, mb: 1, color: '#fff' }}
              >
                {fund.name}
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: 2, fontWeight: 600 }}>
                {fund.category}
              </Typography>

              <Box sx={{
                bgcolor: 'rgba(255, 122, 0, 0.1)',
                px: 2,
                py: 1,
                borderRadius: 2,
                border: '1px solid rgba(255, 122, 0, 0.3)'
              }}>
                <Typography
                  sx={{
                    color: '#ff7a00',
                    fontWeight: 800,
                    fontSize: '1.2rem'
                  }}
                >
                  {fund.return} Returns
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 122, 0, 0.6)', display: 'block' }}>
                  Annualized (3Y)
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          className="glass-card"
          sx={{
            p: { xs: 4, md: 8 },
            textAlign: 'center',
            background: 'rgba(255, 122, 0, 0.03)',
            borderColor: 'rgba(255, 122, 0, 0.1)'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 900,
              background: 'linear-gradient(90deg, #fff, #ff7a00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Institutional Insights
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}
          >
            Mid-cap and small-cap funds continue to lead the market in 3-year growth cycles.
            However, we recommend Large-cap and Index funds for stable, long-term capital preservation
            in volatile market conditions.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>


  );
}
