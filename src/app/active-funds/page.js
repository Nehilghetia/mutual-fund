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
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function ActiveFunds() {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('name_asc');
  const [watchlist, setWatchlist] = useState([]);

  const schemesPerPage = 12; // 3 rows * 4 per row

  // Load watchlist from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch active schemes
  useEffect(() => {
    setLoading(true);
    fetch('/api/mf/active')
      .then(res => res.json())
      .then(data => {
        const activeSchemes = data.data || [];
        setSchemes(activeSchemes);
        setFilteredSchemes(activeSchemes);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching schemes:', err);
        setLoading(false);
      });
  }, []);

  // Filter and sort schemes
  useEffect(() => {
    let processed = [...schemes];
    if (search) processed = processed.filter(s =>
      s.schemeName.toLowerCase().includes(search.toLowerCase())
    );
    if (sortOrder === 'name_asc')
      processed.sort((a, b) => a.schemeName.localeCompare(b.schemeName));
    if (sortOrder === 'name_desc')
      processed.sort((a, b) => b.schemeName.localeCompare(a.schemeName));
    setFilteredSchemes(processed);
    setCurrentPage(1);
  }, [search, schemes, sortOrder]);

  const totalPages = Math.ceil(filteredSchemes.length / schemesPerPage);
  const startIndex = (currentPage - 1) * schemesPerPage;
  const currentSchemes = filteredSchemes.slice(startIndex, startIndex + schemesPerPage);

  // Watchlist toggle
  const toggleWatchlist = (scheme) => {
    if (watchlist.find(w => w.schemeCode === scheme.schemeCode)) {
      setWatchlist(watchlist.filter(w => w.schemeCode !== scheme.schemeCode));
    } else {
      setWatchlist([...watchlist, scheme]);
    }
  };

  if (loading) return (
    <Container sx={{ py: 10, textAlign: 'center' }}>
      <CircularProgress color="warning" />
      <Typography variant="h6" sx={{ mt: 2, color: '#ffb347' }}>
        Loading Active Schemes...
      </Typography>
    </Container>
  );

  return (
    <Box sx={{ background: '#0d0d0d', minHeight: '100vh' }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ color: '#ffb347', fontWeight: 'bold', mb: 1 }}
        >
          Active Mutual Funds
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: '#ccc', mb: 5 }}>
          Found {filteredSchemes.length} schemes
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
          {currentSchemes.map(s => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={s.schemeCode}>
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
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: '#ffb347', fontWeight: 600, mb: 0.5 }}>
                      {s.schemeName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#aaa' }}>
                      Scheme Code: {s.schemeCode}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => toggleWatchlist(s)}>
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
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredSchemes.length === 0 && (
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
