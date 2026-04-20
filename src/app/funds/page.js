'use client';

import { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, TextField,
  Pagination, Button, Box, CircularProgress, FormControl,
  InputLabel, Select, MenuItem, Paper, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FundsPage() {
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('name_asc');
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  const fundsPerPage = 12; // Match active-funds (3 rows * 4 per row)

  // Load watchlist
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('watchlist');
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  // Save watchlist
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch funds
  useEffect(() => {
    async function fetchFunds() {
      try {
        setLoading(true);
        const res = await fetch('/api/mf', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch funds');
        const data = await res.json();
        const allFunds = Array.isArray(data) ? data : (data.data || []);

        // Fix for duplicate key error: Deduplicate by schemeCode
        const uniqueFunds = [];
        const seen = new Set();
        for (const fund of allFunds) {
          if (fund.schemeCode && !seen.has(fund.schemeCode)) {
            seen.add(fund.schemeCode);
            uniqueFunds.push(fund);
          }
        }

        setFunds(uniqueFunds);
        setFilteredFunds(uniqueFunds);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFunds();
  }, []);

  // Filter and sort
  useEffect(() => {
    let processed = [...funds];
    if (search) processed = processed.filter(s =>
      s.schemeName.toLowerCase().includes(search.toLowerCase())
    );
    if (sortOrder === 'name_asc')
      processed.sort((a, b) => a.schemeName.localeCompare(b.schemeName));
    if (sortOrder === 'name_desc')
      processed.sort((a, b) => b.schemeName.localeCompare(a.schemeName));

    setFilteredFunds(processed);
    setCurrentPage(1);
  }, [search, funds, sortOrder]);

  const totalPages = Math.ceil(filteredFunds.length / fundsPerPage);
  const startIndex = (currentPage - 1) * fundsPerPage;
  const currentFunds = filteredFunds.slice(startIndex, startIndex + fundsPerPage);

  const toggleWatchlist = (fund) => {
    if (watchlist.find(w => w.schemeCode === fund.schemeCode)) {
      setWatchlist(watchlist.filter(w => w.schemeCode !== fund.schemeCode));
    } else {
      setWatchlist([...watchlist, fund]);
    }
  };

  if (!mounted || loading) return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <CircularProgress color="warning" />
      <Typography variant="h6" sx={{ mt: 2, color: '#ffb347' }}>
        Loading Mutual Funds...
      </Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    </Box>
  );

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
            Mutual Funds <span style={{ color: '#ff7a00' }}>Explorer</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
            Discover and analyze {filteredFunds.length} schemes with real-time insights and professional data.
          </Typography>
        </Box>

        {funds.length > 0 && funds.length <= 30 && (
          <Box className="glass-card" sx={{ mb: 6, p: 2, border: '1px solid #ff7a0033', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#ffb347', fontWeight: 800 }}>
              ⚠️ External API (mfapi.in) is currently down. Showing {funds.length} popular fallback funds for preview.
            </Typography>
          </Box>
        )}

        <Box
          className="glass-card"
          sx={{
            p: 4,
            mb: 8,
            borderRadius: 6,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search by Scheme Name..."
                variant="outlined"
                value={search}
                onChange={e => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 2, color: '#ff7a00' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    borderRadius: 4,
                    background: 'rgba(0,0,0,0.2)',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    '&:hover fieldset': { borderColor: '#ff7a00' },
                    '&.Mui-focused fieldset': { borderColor: '#ff7a00' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'rgba(255,255,255,0.5)' }}>Sort By</InputLabel>
                <Select
                  value={sortOrder}
                  label="Sort By"
                  onChange={e => setSortOrder(e.target.value)}
                  sx={{
                    color: '#fff',
                    borderRadius: 4,
                    background: 'rgba(0,0,0,0.2)',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ff7a00' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff7a00' },
                  }}
                >
                  <MenuItem value="name_asc">Scheme Name (A-Z)</MenuItem>
                  <MenuItem value="name_desc">Scheme Name (Z-A)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

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
          {currentFunds.map(s => (
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
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', p: 3 }}>
                <Box sx={{ overflow: 'hidden', mr: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: '#ffb347', fontWeight: 800, mb: 1, lineHeight: 1.3 }}>
                    {s.schemeName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>
                    CODE: {s.schemeCode}
                  </Typography>
                </Box>
                <IconButton onClick={() => toggleWatchlist(s)} size="small" sx={{ mt: -0.5 }}>
                  {watchlist.find(w => w.schemeCode === s.schemeCode) ? (
                    <StarIcon sx={{ color: '#ff7a00' }} />
                  ) : (
                    <StarBorderIcon sx={{ color: 'rgba(255, 255, 255, 0.3)' }} />
                  )}
                </IconButton>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
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
                      filter: 'brightness(1.1)',
                      boxShadow: '0 8px 25px rgba(255, 122, 0, 0.4)'
                    }
                  }}>
                  View Details
                </Button>
              </Box>
            </Card>
          ))}
        </Box>

        {filteredFunds.length === 0 && (
          <Box textAlign="center" py={10}>
            <Typography sx={{ color: '#888' }}>No schemes found.</Typography>
          </Box>
        )}

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={5}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="warning"
              sx={{ '& .MuiPaginationItem-root': { color: '#fff', '&.Mui-selected': { backgroundColor: '#ffb347', color: '#000' } } }}
            />
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
