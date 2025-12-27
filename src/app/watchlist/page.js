'use client';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useWatchlist from '@/hooks/useWatchlist';

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useWatchlist();

  return (
    <>
      <Header />

      <Box sx={{ p: 4, minHeight: '80vh' }}>
        <Typography variant="h4" mb={3}>
          My Watchlist
        </Typography>

        {watchlist.length === 0 ? (
          <Typography>No funds in your watchlist yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {watchlist.map((fund) => (
              <Grid item xs={12} sm={6} md={4} key={fund.schemeCode}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{fund.schemeName}</Typography>
                    <Typography variant="body2">Code: {fund.schemeCode}</Typography>
                    <Button
                      color="error"
                      onClick={() => toggleWatchlist(fund)}
                      sx={{ mt: 1 }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Footer />
    </>
  );
}
