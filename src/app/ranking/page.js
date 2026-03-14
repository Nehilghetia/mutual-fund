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
    <Box sx={{ bgcolor: '#0b0b0b', color: '#fff', minHeight: '100vh' }}>


      <Header />

      <Container sx={{ py: 10 }}>

        <Typography
          variant="h4"
          sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}
        >
          Top <span style={{ color: '#ff7a00' }}>Ranked Mutual Funds</span>
        </Typography>

        <Grid container spacing={4}>

          {topFunds.map((fund) => (

            <Grid item xs={12} sm={6} md={3} key={fund.rank}>

              <Box
                sx={{
                  bgcolor: '#1e1e1e',
                  borderRadius: 4,
                  p: 4,
                  textAlign: 'center',
                  transition: '0.3s',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 8px 25px rgba(255,122,0,0.2)',
                  },
                }}
              >

                <Typography
                  sx={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: '#ff7a00',
                  }}
                >
                  #{fund.rank}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mt: 1 }}
                >
                  {fund.name}
                </Typography>

                <Typography sx={{ color: '#bdbdbd', mt: 1 }}>
                  {fund.category}
                </Typography>

                <Typography
                  sx={{
                    color: '#ffb347',
                    mt: 2,
                    fontWeight: 600,
                  }}
                >
                  {fund.return} Returns (3Y)
                </Typography>

              </Box>

            </Grid>

          ))}

        </Grid>

      </Container>

      <Divider sx={{ borderColor: '#2b2b2b', my: 4 }} />

      <Container sx={{ py: 8, textAlign: 'center' }}>

        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 700,
            background: 'linear-gradient(90deg,#ff7a00,#ffb347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Fund Performance Insights
        </Typography>

        <Typography
          sx={{ color: '#bdbdbd', maxWidth: 800, mx: 'auto', mb: 4 }}
        >
          Mid-cap and small-cap funds continue to outperform large-cap funds in
          3-year returns. However, large-cap and hybrid funds remain stable
          choices for risk-averse investors.
        </Typography>

      </Container>

      <Footer />

    </Box>


  );
}
