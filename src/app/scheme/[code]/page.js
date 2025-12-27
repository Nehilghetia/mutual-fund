'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Box, Button, ButtonGroup, Tabs, Tab } from '@mui/material';
import FundChart from '@/app/components/FundChart';
import SIPCalculator from '@/app/components/SIPCalculator';
import SWPCalculator from '@/app/components/SWPCalculator';
import StepUpSIPCalculator from '@/app/components/StepUpSIPCalculator';
import StepUpSWPCalculator from '@/app/components/StepUpSWPCalculator';
import LumpSumCalculator from '@/app/components/LumpSumCalculator';
import RollingReturnChart from '@/app/components/RollingReturnChart';

export default function SchemeDetailPage() {
  const { code } = useParams();
  const [scheme, setScheme] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [chartData, setChartData] = useState([]);
  const [calculatorTab, setCalculatorTab] = useState(0);

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
      case '5Y': dataForPeriod = navs.slice(-252*5); break;
      default: dataForPeriod = navs.slice(-252);
    }
    setChartData(dataForPeriod);
  }, [scheme, selectedPeriod]);

  if (!scheme) return (
    <Box sx={{ color: '#fff', textAlign: 'center', mt: 10 }}>Loading Scheme Details...</Box>
  );

  return (
    <Box sx={{ background: '#0b0b0b', color: '#fff', minHeight: '100vh', p: 4 }}>
      {/* Scheme Info */}
      <Typography variant="h4" sx={{ mb: 1, color: '#ffb347' }}>
        {scheme.meta.schemeName}
      </Typography>
      <Typography variant="body1" sx={{ mb: 0.5 }}>
        {scheme.meta.fundHouse}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {scheme.meta.schemeType} | {scheme.meta.schemeCategory}
      </Typography>

      {/* 1️⃣ NAV Growth Chart */}
      <Box sx={{ mb: 6 }}>
        <FundChart navs={scheme.data} />
      </Box>

      {/* 2️⃣ Mutual Fund Calculators */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h5"
          sx={{ mb: 2, color: '#ffb347', textAlign: 'center' }}
        >
          Mutual Fund Calculators
        </Typography>

        <Tabs
          value={calculatorTab}
          onChange={(e, newValue) => setCalculatorTab(newValue)}
          centered
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="SIP" />
          <Tab label="SWP" />
          <Tab label="Step-Up SIP" />
          <Tab label="Step-Up SWP" />
          <Tab label="Lump Sum" />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {calculatorTab === 0 && <SIPCalculator navs={scheme.data} />}
          {calculatorTab === 1 && <SWPCalculator navs={scheme.data} />}
          {calculatorTab === 2 && <StepUpSIPCalculator navs={scheme.data} />}
          {calculatorTab === 3 && <StepUpSWPCalculator navs={scheme.data} />}
          {calculatorTab === 4 && <LumpSumCalculator navs={scheme.data} />}
        </Box>
      </Box>

      {/* 3️⃣ Chart NAV Values (Latest and Historical) */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#ffb347', textAlign: 'center' }}>
          Chart NAV Values (Latest and Historical)
        </Typography>

        {/* Buttons for period selection */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <ButtonGroup variant="outlined" color="secondary">
            {periods.map(p => (
              <Button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                variant={selectedPeriod === p ? 'contained' : 'outlined'}
                sx={{ color: '#ffb347', borderColor: '#ffb347' }}
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
    </Box>
  );
}
