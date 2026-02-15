'use client';

import { Box, Typography, Container, Grid, Card, CardContent, Button, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useWatchlist from '@/hooks/useWatchlist';

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useWatchlist();

  return (
    <Box sx={{ background: '#0d0d0d', minHeight: '100vh', color: '#fff' }}>
      <Header />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ color: '#ffb347', fontWeight: 'bold', mb: 1 }}
        >
          My Watchlist
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: '#ccc', mb: 5 }}>
          {watchlist.length} {watchlist.length === 1 ? 'fund' : 'funds'} saved
        </Typography>

        {watchlist.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" sx={{ color: '#888' }}>
              No funds in your watchlist yet.
            </Typography>
            <Button
              component={Link}
              href="/funds"
              variant="outlined"
              sx={{ mt: 3, color: '#ffb347', borderColor: '#ffb347', '&:hover': { borderColor: '#ffaa47', background: 'rgba(255, 179, 71, 0.1)' } }}
            >
              Browse Funds
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {watchlist.map((s) => (
              <Grid item xs={6} md={6} key={s.schemeCode}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#1a1a1a',
                  color: '#fff',
                  borderRadius: 3,
                  border: '1px solid #2a2a2a',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 6px 18px rgba(255, 179, 71, 0.25)', borderColor: '#ffb347' },
                }}>
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ overflow: 'hidden', mr: 1 }}>
                      <Typography variant="subtitle1" noWrap title={s.schemeName} sx={{ color: '#ffb347', fontWeight: 600, mb: 0.5 }}>
                        {s.schemeName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#aaa' }}>
                        Scheme Code: {s.schemeCode}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => toggleWatchlist(s)} size="small">
                      <StarIcon color="warning" />
                    </IconButton>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button component={Link} href={`/scheme/${s.schemeCode}`} variant="contained" fullWidth
                      sx={{ background: '#ffb347', color: '#0b0b0b', fontWeight: 'bold', borderRadius: 2, '&:hover': { background: '#ffaa47' } }}>
                      VIEW DETAILS
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
