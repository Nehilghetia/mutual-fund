'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Slider, Grid, Paper } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LumpSumCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const [stats, setStats] = useState({
    invested: 0,
    returns: 0,
    total: 0
  });

  useEffect(() => {
    const fv = amount * Math.pow(1 + rate / 100, years);
    setStats({
      invested: amount,
      returns: fv - amount,
      total: fv
    });
  }, [amount, rate, years]);

  const chartData = {
    labels: ['Invested', 'Returns'],
    datasets: [{
      data: [stats.invested, stats.returns],
      backgroundColor: ['#ff9800', '#4caf50'],
      borderWidth: 0,
      hoverOffset: 12
    }]
  };

  const sliderStyle = {
    color: '#ff9800',
    height: 6,
    '& .MuiSlider-thumb': {
      width: 20, height: 20, backgroundColor: '#fff', border: '3px solid #ff9800'
    }
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, background: 'rgba(20,20,20,0.6)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={7}>
          <Box sx={{ mb: 4 }}><Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}><Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Investment Amount</Typography><Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem' }}>₹{amount.toLocaleString('en-IN')}</Typography></Box><Slider value={amount} min={10000} max={10000000} step={10000} onChange={(e, val) => setAmount(val)} sx={sliderStyle} /></Box>
          <Box sx={{ mb: 4 }}><Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}><Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Expected Return Rate</Typography><Typography sx={{ color: '#4caf50', fontWeight: 900, fontSize: '1.2rem' }}>{rate}% p.a.</Typography></Box><Slider value={rate} min={1} max={30} step={0.5} onChange={(e, val) => setRate(val)} sx={sliderStyle} /></Box>
          <Box><Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}><Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Investment Period</Typography><Typography sx={{ color: '#4facfe', fontWeight: 900, fontSize: '1.2rem' }}>{years} Years</Typography></Box><Slider value={years} min={1} max={40} step={1} onChange={(e, val) => setYears(val)} sx={sliderStyle} /></Box>
        </Grid>

        <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: 2, mb: 1 }}>ESTIMATED TOTAL WEALTH</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>₹{Math.round(stats.total).toLocaleString('en-IN')}</Typography>
          </Box>
          <Box sx={{ position: 'relative', width: 220, height: 220, mx: 'auto' }}>
            < Doughnut data={chartData} options={{ cutout: '80%', plugins: { legend: { display: false } } }} />
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#4caf50', lineHeight: 1 }}>₹{Math.round(stats.returns / 100000)}L</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>RETURNS</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
