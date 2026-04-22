'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Slider, Grid, Paper } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SWPCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(8);
  const [withdrawal, setWithdrawal] = useState(10000);
  const [years, setYears] = useState(10);

  const [stats, setStats] = useState({
    withdrawn: 0,
    remaining: 0,
    totalValue: 0
  });

  useEffect(() => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    let balance = amount;
    let totalWithdrawn = 0;

    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyRate) - withdrawal;
      totalWithdrawn += withdrawal;
      if (balance < 0) { balance = 0; break; }
    }

    setStats({
      withdrawn: totalWithdrawn,
      remaining: balance,
      totalValue: totalWithdrawn + balance
    });
  }, [amount, rate, withdrawal, years]);

  const chartData = {
    labels: ['Total Withdrawn', 'Remaining Fund'],
    datasets: [{
      data: [stats.withdrawn, stats.remaining],
      backgroundColor: ['#ff7a00', '#4caf50'],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  const sliderStyle = {
    color: '#ff7a00',
    height: 6,
    '& .MuiSlider-thumb': {
      width: 20,
      height: 20,
      backgroundColor: '#fff',
      border: '3px solid #ff7a00',
      '&:hover': { boxShadow: '0 0 15px rgba(255, 122, 0, 0.4)' }
    }
  };

  return (
    <Paper sx={{
      p: { xs: 3, md: 5 },
      background: 'rgba(20,20,20,0.6)',
      borderRadius: 6,
      border: '1px solid rgba(255,255,255,0.05)',
      backdropFilter: 'blur(20px)'
    }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={7}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Total Investment</Typography>
              <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem' }}>₹{amount.toLocaleString('en-IN')}</Typography>
            </Box>
            <Slider value={amount} min={100000} max={10000000} step={50000} onChange={(e, val) => setAmount(val)} sx={sliderStyle} />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Monthly Withdrawal</Typography>
              <Typography sx={{ color: '#ff7a00', fontWeight: 900, fontSize: '1.2rem' }}>₹{withdrawal.toLocaleString('en-IN')}</Typography>
            </Box>
            <Slider value={withdrawal} min={1000} max={200000} step={1000} onChange={(e, val) => setWithdrawal(val)} sx={sliderStyle} />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Expected Return Rate</Typography>
              <Typography sx={{ color: '#4caf50', fontWeight: 900, fontSize: '1.2rem' }}>{rate}% p.a.</Typography>
            </Box>
            <Slider value={rate} min={1} max={20} step={0.5} onChange={(e, val) => setRate(val)} sx={sliderStyle} />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Duration</Typography>
              <Typography sx={{ color: '#4facfe', fontWeight: 900, fontSize: '1.2rem' }}>{years} Years</Typography>
            </Box>
            <Slider value={years} min={1} max={30} step={1} onChange={(e, val) => setYears(val)} sx={sliderStyle} />
          </Box>
        </Grid>

        <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: 2, mb: 1 }}>REMAINING BALALNCE</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
              ₹{Math.round(stats.remaining).toLocaleString('en-IN')}
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', width: 220, height: 220, mx: 'auto' }}>
            <Doughnut data={chartData} options={{ cutout: '80%', plugins: { legend: { display: false } } }} />
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#ff7a00', lineHeight: 1 }}>
                ₹{Math.round(stats.withdrawn / 100000)}L
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>WITHDRAWN</Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800 }}>Total Value Generated: <span style={{ color: '#4caf50' }}>₹{Math.round(stats.totalValue).toLocaleString('en-IN')}</span></Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
