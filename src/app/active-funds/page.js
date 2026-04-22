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

import { getEnhancedFundDetails } from '@/app/utils/fundDetails';

export default function ActiveFunds() {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('name_asc');
  const [watchlist, setWatchlist] = useState([]);
  const [mounted, setMounted] = useState(false);

  const schemesPerPage = 12; // 3 rows * 4 per row

  // Load watchlist from localStorage
  useEffect(() => {
    setMounted(true);
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

        // Fix for duplicate key error: Deduplicate by schemeCode
        const uniqueSchemes = [];
        const seen = new Set();
        for (const scheme of activeSchemes) {
          if (scheme.schemeCode && !seen.has(scheme.schemeCode)) {
            seen.add(scheme.schemeCode);
            uniqueSchemes.push(scheme);
          }
        }

        setSchemes(uniqueSchemes);
        setFilteredSchemes(uniqueSchemes);
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
    if (sortOrder === 'risk_low_high')
      processed.sort((a, b) => getEnhancedFundDetails(a.schemeCode).riskScore - getEnhancedFundDetails(b.schemeCode).riskScore);
    if (sortOrder === 'risk_high_low')
      processed.sort((a, b) => getEnhancedFundDetails(b.schemeCode).riskScore - getEnhancedFundDetails(a.schemeCode).riskScore);

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

  if (!mounted || loading) return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <CircularProgress color="warning" />
      <Typography variant="h6" sx={{ mt: 2, color: '#ffb347' }}>
        Loading Fund Explorer...
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 6 }}>
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
            Active <span style={{ color: '#ff7a00' }}>Mutual Funds</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
            Real-time tracking of {filteredSchemes.length} active market schemes.
          </Typography>
        </Box>

        {schemes.length > 0 && schemes.length <= 30 && (
          <Box className="glass-card" sx={{ mb: 6, p: 2, border: '1px solid #ff7a0033', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#ffb347', fontWeight: 800 }}>
              ⚠️ External API (mfapi.in) is currently down. Showing {schemes.length} popular fallback funds for preview.
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
                placeholder="Search Active Schemes..."
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
                  <MenuItem value="risk_low_high">Risk: Low to High</MenuItem>
                  <MenuItem value="risk_high_low">Risk: High to Low</MenuItem>
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
          {currentSchemes.map(s => {
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
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ overflow: 'hidden', mr: 1 }}>
                      <Typography variant="subtitle1" sx={{ color: '#ffb347', fontWeight: 800, mb: 1, lineHeight: 1.3, minHeight: '3.4em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
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
                  </Box>

                  <Box sx={{ mt: 'auto' }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                          Latest NAV
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#fff' }}>
                          ₹{details.nav}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                          1Y Return
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 800, color: parseFloat(details.oneYearReturn) >= 0 ? '#4caf50' : '#f44336' }}>
                          {parseFloat(details.oneYearReturn) >= 0 ? '+' : ''}{details.oneYearReturn}%
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                          Risk Rating
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#ffb347' }}>
                          {details.riskRating}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                          Exp. Ratio
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>
                          {details.expenseRatio}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
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
            );
          })}
        </Box>

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
