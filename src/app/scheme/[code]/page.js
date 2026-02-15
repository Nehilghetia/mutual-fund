'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Box, Tabs, Tab, Button, ButtonGroup, Container } from '@mui/material';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import SIPCalculator from '@/app/components/SIPCalculator';
import SWPCalculator from '@/app/components/SWPCalculator';
import StepUpSIPCalculator from '@/app/components/StepUpSIPCalculator';
import StepUpSWPCalculator from '@/app/components/StepUpSWPCalculator';
import LumpSumCalculator from '@/app/components/LumpSumCalculator';
import RollingReturnChart from '@/app/components/RollingReturnChart';

export default function SchemeDetailPage() {
  const { code } = useParams();
  const [scheme, setScheme] = useState(null);
  const [calculatorTab, setCalculatorTab] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [chartData, setChartData] = useState([]);

  const periods = ['1D', '1M', '3M', '1Y', '5Y'];

  useEffect(() => {
    if (!code) return;
    async function fetchScheme() {
      try {
        const res = await fetch(`https://api.mfapi.in/mf/${code}`);
        const data = await res.json();
        if (!data || !data.meta) return;
        setScheme(data);
      } catch (err) {
        console.error('Error fetching scheme:', err);
      }
    }
    fetchScheme();
  }, [code]);

  useEffect(() => {
    if (!scheme) return;
    const navs = scheme.data.map(item => ({ date: item.date, nav: parseFloat(item.nav) })).reverse();
    let dataForPeriod = [];
    switch (selectedPeriod) {
      case '1D': dataForPeriod = navs.slice(-2); break;
      case '1M': dataForPeriod = navs.slice(-22); break;
      case '3M': dataForPeriod = navs.slice(-66); break;
      case '1Y': dataForPeriod = navs.slice(-252); break;
      case '5Y': dataForPeriod = navs.slice(-252 * 5); break;
      default: dataForPeriod = navs.slice(-252);
    }
    setChartData(dataForPeriod);
    if (scheme && scheme.meta) {
      document.title = scheme.meta.scheme_name;
    }
  }, [scheme, selectedPeriod]);

  if (!scheme) return (
    <Box sx={{ background: '#0b0b0b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h6" sx={{ color: '#ffb347' }}>Loading Scheme Details...</Typography>
    </Box>
  );

  return (
    <Box sx={{ background: '#0b0b0b', color: '#fff', minHeight: '100vh' }}>
      <Header />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Scheme Info */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 1, color: '#ffb347', fontWeight: 'bold' }}>
            {scheme.meta.scheme_name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, color: '#ddd' }}>
            {scheme.meta.fund_house}
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 }}>
            {scheme.meta.scheme_type} {scheme.meta.scheme_category}
          </Typography>
        </Box>

        {/* 1️⃣ Chart NAV Values (Latest and Historical) */}
        <Box sx={{ mb: 6, p: 3, background: '#1a1a1a', borderRadius: 3, border: '1px solid #2a2a2a' }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#ffb347', textAlign: 'center', fontWeight: 600 }}>
            Chart NAV Values (Latest and Historical)
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <ButtonGroup variant="outlined" sx={{ '& .MuiButton-root': { borderColor: '#ffb347', color: '#ffb347', '&:hover': { borderColor: '#ffaa47', background: 'rgba(255, 179, 71, 0.1)' } } }}>
              {periods.map(p => (
                <Button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  variant={selectedPeriod === p ? 'contained' : 'outlined'}
                  sx={selectedPeriod === p ? {
                    backgroundColor: '#ffb347 !important',
                    color: '#000 !important',
                    fontWeight: 'bold'
                  } : {}}
                >
                  {p}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <RollingReturnChart
            data={chartData}
            title={`${selectedPeriod} NAV History`}
          />
        </Box>

        {/* 2️⃣ Mutual Fund Calculators */}
        <Box sx={{ mb: 6, p: 3, background: '#1a1a1a', borderRadius: 3, border: '1px solid #2a2a2a' }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#ffb347', textAlign: 'center', fontWeight: 600 }}>
            Mutual Fund Calculators
          </Typography>

          <Tabs
            value={calculatorTab}
            onChange={(e, newValue) => setCalculatorTab(newValue)}
            centered
            sx={{
              '& .MuiTab-root': { color: '#888', textTransform: 'none', fontSize: '1rem' },
              '& .Mui-selected': { color: '#ffb347 !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#ffb347' },
              mb: 3
            }}
          >
            <Tab label="SIP Calculator" />
            <Tab label="SWP Calculator" />
            <Tab label="Step-Up SIP" />
            <Tab label="Step-Up SWP" />
            <Tab label="Lump Sum" />
          </Tabs>

          <Box sx={{ mt: 3, color: '#fff' }}>
            {calculatorTab === 0 && <SIPCalculator navs={scheme.data} />}
            {calculatorTab === 1 && <SWPCalculator navs={scheme.data} />}
            {calculatorTab === 2 && <StepUpSIPCalculator navs={scheme.data} />}
            {calculatorTab === 3 && <StepUpSWPCalculator navs={scheme.data} />}
            {calculatorTab === 4 && <LumpSumCalculator navs={scheme.data} />}
          </Box>
        </Box>
      </Container >

      <Footer />
    </Box >
  );
}
