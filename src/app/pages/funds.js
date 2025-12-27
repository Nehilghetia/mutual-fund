'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress, Button, Stack, TextField } from '@mui/material';
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

  const fundsPerPage = 10;

  // Fetch all funds from internal API
  useEffect(() => {
    async function fetchFunds() {
      try {
        setLoading(true);
        const res = await fetch('/api/funds'); // ✅ use Next.js API route
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

  // Filter funds based on search query
  useEffect(() => {
    const filtered = funds.filter(fund =>
      fund.schemeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFunds(filtered);
    setCurrentPage(1);
  }, [searchQuery, funds]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredFunds.length / fundsPerPage);
  const indexOfLastFund = currentPage * fundsPerPage;
  const indexOfFirstFund = indexOfLastFund - fundsPerPage;
  const currentFunds = filteredFunds.slice(indexOfFirstFund, indexOfLastFund);

  // Pagination page range
  const visiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);
  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  if (loading) return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <CircularProgress sx={{ color: '#ff7a00' }} />
      <Typography mt={2} sx={{ color: '#fff' }}>Loading mutual funds...</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h6" color="error">{error}</Typography>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#0b0b0b', minHeight: '100vh', color: '#fff' }}>
      <Header />

      <Container sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ color: '#ffb347', fontWeight: 700, textAlign: 'center', mb: 5 }}>
          Mutual Funds Explorer
        </Typography>

        {/* Search Bar */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
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

        {/* Fund Cards Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
          {currentFunds.map((fund, index) => (
            <LazyFundCard key={index} fund={fund} />
          ))}
        </Box>

        {/* Pagination Buttons */}
        <Stack direction="row" spacing={1} justifyContent="center" mt={6} flexWrap="wrap">
          <Button variant="outlined" sx={buttonStyle} onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</Button>
          <Button variant="outlined" sx={buttonStyle} onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>Previous</Button>

          {startPage > 1 && <>
            <Button variant="outlined" sx={buttonStyle} onClick={() => setCurrentPage(1)}>1</Button>
            <Typography sx={{ px: 1, mt: '10px' }}>...</Typography>
          </>}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'contained' : 'outlined'}
              sx={{ color: page === currentPage ? '#000' : '#fff', background: page === currentPage ? 'linear-gradient(90deg, #ff7a00, #ffb347)' : 'transparent', borderColor: '#ff7a00', minWidth: '40px', fontWeight: 'bold' }}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          {endPage < totalPages && <>
            <Typography sx={{ px: 1, mt: '10px' }}>...</Typography>
            <Button variant="outlined" sx={buttonStyle} onClick={() => setCurrentPage(totalPages)}>{totalPages}</Button>
          </>}

          <Button variant="outlined" sx={buttonStyle} onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
          <Button variant="outlined" sx={buttonStyle} onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</Button>
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
}

const buttonStyle = { borderColor: '#ff7a00', color: '#fff', fontWeight: 'bold' };
