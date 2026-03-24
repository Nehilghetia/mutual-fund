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
import useWatchlist from '@/hooks/useWatchlist';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function FundsPage() {
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('name_asc');
  const [error, setError] = useState('');
  const { watchlist, toggleWatchlist, isInWatchlist } = useWatchlist();

  const fundsPerPage = 12;

  // Fetch funds
  useEffect(() => {
    async function fetchFunds() {
      try {
        setLoading(true);
        const res = await fetch('/api/mf', { cache: 'no-store' });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to fetch funds. The external service might be down.');
        }
        const data = await res.json();
        const allFunds = Array.isArray(data) ? data : (data.data || []);
        setFunds(allFunds);
        setFilteredFunds(allFunds);
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

  if (loading) return (
    <Container sx={{ py: 10, textAlign: 'center' }}>
      <CircularProgress color="warning" />
      <Typography variant="h6" sx={{ mt: 2, color: '#ffb347' }}>
        Loading Mutual Funds...
      </Typography>
    </Container>
  );

  if (error) return (
    <Container sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h5" color="error" sx={{ mb: 2 }}>
        ⚠️ Connection Error
      </Typography>
      <Typography variant="h6" sx={{ color: '#ccc', mb: 4 }}>
        {error}
      </Typography>
      <Button
        variant="contained"
        onClick={() => window.location.reload()}
        sx={{ background: '#ffb347', color: '#000', fontWeight: 'bold' }}
      >
        Retry Again
      </Button>
    </Container>
  );

  return (
    <Box sx={{ background: '#0d0d0d', minHeight: '100vh' }}>
      <Header />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ color: '#ffb347', fontWeight: 'bold', mb: 1 }}
        >
          Mutual Funds Explorer
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: '#ccc', mb: 5 }}>
          Found {filteredFunds.length} schemes
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 5, borderRadius: 3, background: '#1a1a1a', color: '#fff', border: '1px solid #333' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Search by Scheme Name"
                variant="outlined"
                value={search}
                onChange={e => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: '#ffb347' }} />,
                }}
                InputLabelProps={{ style: { color: '#ffb347' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: '#ffb347' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#ffb347' }}>Sort By</InputLabel>
                <Select
                  value={sortOrder}
                  label="Sort By"
                  onChange={e => setSortOrder(e.target.value)}
                  sx={{
                    color: '#fff',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ffb347' },
                  }}
                >
                  <MenuItem value="name_asc">Scheme Name (A-Z)</MenuItem>
                  <MenuItem value="name_desc">Scheme Name (Z-A)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {currentFunds.map(s => (
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
                    {watchlist.find(w => w.schemeCode === s.schemeCode) ? (
                      <StarIcon color="warning" />
                    ) : (
                      <StarBorderIcon sx={{ color: '#ffb347' }} />
                    )}
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
