'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Button,
  Stack,
  TextField,
  IconButton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LazyFundCard from '../components/LazyFundCard';

export default function FundsPage() {
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  const fundsPerPage = 10;

  // Load watchlist from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch all funds
  useEffect(() => {
    async function fetchFunds() {
      try {
        setLoading(true);
        const res = await fetch('/api/mf', { cache: 'no-store' }); // Replace with your API
        if (!res.ok) throw new Error('Failed to fetch funds');
        const data = await res.json();
        setFunds(data);
        setFilteredFunds(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFunds();
  }, []);

  // Filter funds by search query
  useEffect(() => {
    const filtered = funds.filter((fund) =>
      fund.schemeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFunds(filtered);
    setCurrentPage(1);
  }, [searchQuery, funds]);

  // Watchlist toggle
  const toggleWatchlist = (fund) => {
    if (watchlist.find((w) => w.schemeCode === fund.schemeCode)) {
      setWatchlist(watchlist.filter((w) => w.schemeCode !== fund.schemeCode));
    } else {
      setWatchlist([...watchlist, fund]);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress sx={{ color: '#ff7a00' }} />
        <Typography mt={2} sx={{ color: '#fff' }}>
          Loading mutual funds...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredFunds.length / fundsPerPage);
  const indexOfLastFund = currentPage * fundsPerPage;
  const indexOfFirstFund = indexOfLastFund - fundsPerPage;
  const currentFunds = filteredFunds.slice(indexOfFirstFund, indexOfLastFund);

  // Generate page numbers
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);
  if (endPage - startPage < maxPageNumbersToShow - 1) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
  if (!pageNumbers.includes(totalPages)) pageNumbers.push(totalPages);

  return (
    <Box sx={{ bgcolor: '#0b0b0b', minHeight: '100vh', color: '#fff' }}>
      <Header />

      <Container sx={{ py: 10 }}>
        <Typography
          variant="h4"
          sx={{ color: '#ffb347', fontWeight: 700, textAlign: 'center', mb: 3 }}
        >
          Mutual Funds Explorer
        </Typography>

        {/* Search */}
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <TextField
            label="Search Mutual Funds"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              input: { color: '#fff' },
              '& .MuiInputLabel-root': { color: '#bdbdbd' },
              '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } },
              width: '100%',
              maxWidth: '400px',
            }}
          />
        </Box>

        {/* Fund Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 3,
          }}
        >
          {currentFunds.length > 0 ? (
            currentFunds.map((fund, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                <LazyFundCard fund={fund} />
                <IconButton
                  onClick={() => toggleWatchlist(fund)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: watchlist.find((w) => w.schemeCode === fund.schemeCode)
                      ? '#ffb347'
                      : '#fff',
                  }}
                >
                  {watchlist.find((w) => w.schemeCode === fund.schemeCode) ? (
                    <StarIcon />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography sx={{ color: '#fff', textAlign: 'center', gridColumn: '1/-1' }}>
              No mutual funds found.
            </Typography>
          )}
        </Box>

        {/* Pagination */}
        {currentFunds.length > 0 && (
          <Stack direction="row" spacing={1} justifyContent="center" mt={6} flexWrap="wrap">
            <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
              First
            </Button>
            <Button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {pageNumbers.map((page, idx) => {
              if (idx > 0 && page - pageNumbers[idx - 1] > 1) {
                return (
                  <React.Fragment key={page}>
                    <Typography sx={{ px: 1, color: '#fff', mt: '8px' }}>...</Typography>
                    <Button
                      variant={page === currentPage ? 'contained' : 'outlined'}
                      sx={{
                        color: page === currentPage ? '#000' : '#fff',
                        background:
                          page === currentPage
                            ? 'linear-gradient(90deg, #ff7a00, #ffb347)'
                            : 'transparent',
                        borderColor: '#ff7a00',
                        minWidth: '40px',
                        fontWeight: 'bold',
                      }}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  </React.Fragment>
                );
              }
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? 'contained' : 'outlined'}
                  sx={{
                    color: page === currentPage ? '#000' : '#fff',
                    background:
                      page === currentPage
                        ? 'linear-gradient(90deg, #ff7a00, #ffb347)'
                        : 'transparent',
                    borderColor: '#ff7a00',
                    minWidth: '40px',
                    fontWeight: 'bold',
                  }}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}

            <Button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </Stack>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
