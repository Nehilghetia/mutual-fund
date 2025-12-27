'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';

export default function WatchlistPage() {
  const [funds, setFunds] = useState([]); // All funds from API
  const [watchlist, setWatchlist] = useState([]); // User watchlist
  const [loading, setLoading] = useState(true);

  // Load watchlist from local storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(stored);
  }, []);

  // Fetch funds from API
  useEffect(() => {
    async function fetchFunds() {
      try {
        const res = await fetch('/api/funds'); // Replace with your API endpoint
        const data = await res.json();
        setFunds(data);
      } catch (err) {
        console.error('Error fetching funds:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFunds();
  }, []);

  // Save watchlist to local storage
  const saveWatchlist = (list) => {
    setWatchlist(list);
    localStorage.setItem('watchlist', JSON.stringify(list));
  };

  const addToWatchlist = (fund) => {
    if (!watchlist.find((f) => f.id === fund.id)) {
      saveWatchlist([...watchlist, fund]);
    }
  };

  const removeFromWatchlist = (fundId) => {
    saveWatchlist(watchlist.filter((f) => f.id !== fundId));
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        My Watchlist
      </Typography>

      {/* Empty state */}
      {watchlist.length === 0 && (
        <Box>
          <Typography mb={2}>No funds in your watchlist yet.</Typography>
          <Typography mb={2}>Browse funds to add:</Typography>
        </Box>
      )}

      {/* Watchlist items */}
      {watchlist.length > 0 && (
        <Grid container spacing={2} mb={4}>
          {watchlist.map((fund) => (
            <Grid item key={fund.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{fund.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {fund.category}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 1 }}
                    onClick={() => removeFromWatchlist(fund.id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Browse funds from API */}
      <Typography variant="h5" mb={2}>All Funds</Typography>
      <Grid container spacing={2}>
        {funds.map((fund) => (
          <Grid item key={fund.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{fund.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {fund.category}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                  onClick={() => addToWatchlist(fund)}
                  disabled={watchlist.find((f) => f.id === fund.id)}
                >
                  {watchlist.find((f) => f.id === fund.id) ? 'Added' : 'Add to Watchlist'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
