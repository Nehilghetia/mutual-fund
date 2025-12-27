'use client';

import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box sx={{ mt: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#1a1a1a',
          color: '#fff',
          p: 6,
          borderRadius: 2,
          textAlign: 'center',
          mb: 6
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Mutual Fund Explorer
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Explore top mutual funds, calculate SIP returns, and plan your investments wisely.
        </Typography>
        <Link href="/funds" passHref>
          <Button variant="contained" color="primary" size="large">
            Explore Funds
          </Button>
        </Link>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#121212', color: '#fff' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Browse Funds
              </Typography>
              <Typography variant="body2">
                Search, filter, and explore thousands of mutual fund schemes with live NAV data.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#121212', color: '#fff' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                SIP Calculator
              </Typography>
              <Typography variant="body2">
                Plan your investments by calculating expected SIP returns based on historical NAV.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#121212', color: '#fff' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                NAV Charts
              </Typography>
              <Typography variant="body2">
                Visualize fund performance with interactive NAV charts and historical data analysis.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer CTA */}
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Start Planning Your Investments Today!
        </Typography>
        <Link href="/funds" passHref>
          <Button variant="contained" color="primary" size="large">
            Explore Funds
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
