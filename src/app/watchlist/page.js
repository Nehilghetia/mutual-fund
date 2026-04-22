'use client';

import { Box, Typography, Container, Grid, Card, CardContent, Button, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useWatchlist from '@/hooks/useWatchlist';
import { getEnhancedFundDetails } from '../utils/fundDetails';

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useWatchlist();

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
      <Header />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: '#fff',
              mb: 2,
              letterSpacing: '-0.03em'
            }}
          >
            My <span style={{ color: '#ff7a00' }}>Watchlist</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
            You have saved {watchlist.length} {watchlist.length === 1 ? 'fund' : 'funds'} for tracking.
          </Typography>
        </Box>

        {watchlist.length === 0 ? (
          <Box className="glass-card" sx={{ textAlign: 'center', py: 10, px: 4 }}>
            <Typography variant="h5" sx={{ color: '#888', mb: 4, fontWeight: 700 }}>
              Your watchlist is currently empty.
            </Typography>
            <Button
              component={Link}
              href="/funds"
              variant="contained"
              sx={{
                px: 6,
                py: 2,
                borderRadius: '14px',
                background: 'linear-gradient(90deg, #ff7a00, #ffb347)',
                fontWeight: 800,
                color: '#000',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(90deg, #ffb347, #ff7a00)',
                  boxShadow: '0 8px 25px rgba(255, 122, 0, 0.4)'
                }
              }}
            >
              Discover Funds Now
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)'
              },
              gap: 3
            }}
          >
            {watchlist.map((s) => {
              const details = getEnhancedFundDetails(s.schemeCode);
              return (
                <Card
                  key={s.schemeCode}
                  className="glass-card"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'rgba(26, 26, 26, 0.6)',
                    backdropFilter: 'blur(10px)',
                    color: '#fff',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 10px 30px rgba(255, 179, 71, 0.15)',
                      borderColor: '#ffb347'
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box sx={{ overflow: 'hidden', mr: 1 }}>
                        <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 900, mb: 1, lineHeight: 1.3, height: '2.6em', overflow: 'hidden' }}>
                          {s.schemeName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontWeight: 700, letterSpacing: 0.5 }}>
                          CODE: {s.schemeCode}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => toggleWatchlist(s)} size="small" sx={{ mt: -0.5, color: '#ff7a00' }}>
                        <StarIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontWeight: 700 }}>LATEST NAV</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 900, color: '#fff' }}>₹{details.nav}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontWeight: 700 }}>1Y RETURN</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 900, color: parseFloat(details.oneYearReturn) >= 0 ? '#4caf50' : '#f44336' }}>
                          {parseFloat(details.oneYearReturn) >= 0 ? '+' : ''}{details.oneYearReturn}%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontWeight: 700 }}>RISK RATING</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#ffb347' }}>{details.riskRating}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontWeight: 700 }}>EXP. RATIO</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff' }}>{details.expenseRatio}%</Typography>
                      </Box>
                    </Box>

                    <Button component={Link} href={`/scheme/${s.schemeCode}`} variant="contained" fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #ff7a00, #ffb347)',
                        color: '#000',
                        fontWeight: 900,
                        borderRadius: 3,
                        py: 1.2,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #ffb347, #ff7a00)',
                          boxShadow: '0 8px 25px rgba(255, 122, 0, 0.4)'
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
