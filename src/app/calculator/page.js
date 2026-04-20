'use client';

import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Container, Grid, TextField, Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ✅ Chart Imports
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CalculatorPage() {
  const [tab, setTab] = useState(0);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setResult(null);
    setChartData(null);
  };

  // ---- SIP CALCULATOR ----
  const calculateSIP = (amount, rate, years) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    const maturity = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = amount * months;

    setResult(maturity.toFixed(2));
    setChartData(makeChartData(invested, maturity));
  };

  // ---- SWP CALCULATOR ----
  const calculateSWP = (corpus, rate, years, withdrawal) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    let balance = corpus;
    let totalWithdrawal = 0;

    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyRate) - withdrawal;
      totalWithdrawal += withdrawal;
    }

    const totalValue = totalWithdrawal + balance; // total received by investor

    setResult(balance.toFixed(2));
    setChartData(makeChartData(corpus, totalValue));
  };

  // ---- STEP-UP SIP CALCULATOR ----
  const calculateStepUpSIP = (amount, rate, years, stepUpPercent) => {
    const monthlyRate = rate / 12 / 100;
    let totalInvested = 0;
    let totalValue = 0;

    for (let y = 0; y < years; y++) {
      const stepAmount = amount * Math.pow(1 + stepUpPercent / 100, y);
      totalValue += stepAmount * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) * (1 + monthlyRate);
      totalInvested += stepAmount * 12;
    }

    setResult(totalValue.toFixed(2));
    setChartData(makeChartData(totalInvested, totalValue));
  };

  // ---- STEP-UP SWP CALCULATOR ----
  const calculateStepUpSWP = (corpus, rate, years, withdrawal, stepUpPercent) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    let balance = corpus;
    let totalWithdrawal = 0;

    for (let y = 0; y < months; y++) {
      const yearFactor = Math.floor(y / 12);
      const stepWithdrawal = withdrawal * Math.pow(1 + stepUpPercent / 100, yearFactor);
      balance = balance * (1 + monthlyRate) - stepWithdrawal;
      totalWithdrawal += stepWithdrawal;
    }

    const totalValue = totalWithdrawal + balance;

    setResult(balance.toFixed(2));
    setChartData(makeChartData(corpus, totalValue));
  };

  // ---- LUMPSUM CALCULATOR ----
  const calculateLumpsum = (amount, rate, years) => {
    const maturity = amount * Math.pow(1 + rate / 100, years);
    setResult(maturity.toFixed(2));
    setChartData(makeChartData(amount, maturity));
  };

  // ---- Helper Chart Data Function ----
  const makeChartData = (invested, totalValue) => {
    const availableReturn = totalValue - invested;
    return {
      labels: ['Invested Amount', 'Available Return'],
      datasets: [
        {
          data: [invested, availableReturn],
          backgroundColor: ['#ff7a00', '#4caf50'],
          hoverBackgroundColor: ['#ff9800', '#66bb6a'],
        },
      ],
    };
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
      <Header />
      <Container maxWidth={false} sx={{ py: 8, px: { xs: 2, md: 8 } }}>
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
            Financial <span style={{ color: '#ff7a00' }}>Calculators</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
            Plan your future with precision. Predict growth, withdrawals, and wealth accumulation.
          </Typography>
        </Box>

        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: '#ff7a00' } }}
          sx={{
            mb: 8,
            '& .MuiTab-root': { fontWeight: 800, fontSize: '1rem', color: 'rgba(255,255,255,0.5)' },
            '& .Mui-selected': { color: '#ff7a00 !important' }
          }}
        >
          <Tab label="SIP" />
          <Tab label="SWP" />
          <Tab label="Step-Up SIP" />
          <Tab label="Step-Up SWP" />
          <Tab label="Lumpsum" />
        </Tabs>

        <Grid container>
          <Grid item xs={12}>
            <Box
              className="glass-card"
              sx={{
                p: { xs: 3, md: 5 },
                background: 'rgba(26, 26, 26, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                width: '100%'
              }}
            >
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={5}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 4, opacity: 0.9 }}>
                      Input <span style={{ color: '#ff7a00' }}>Parameters</span>
                    </Typography>
                    {tab === 0 && <SIPForm onCalculate={calculateSIP} />}
                    {tab === 1 && <SWPForm onCalculate={calculateSWP} />}
                    {tab === 2 && <StepUpSIPForm onCalculate={calculateStepUpSIP} />}
                    {tab === 3 && <StepUpSWPForm onCalculate={calculateStepUpSWP} />}
                    {tab === 4 && <LumpsumForm onCalculate={calculateLumpsum} />}
                  </Box>
                </Grid>

                <Grid item xs={12} md={7}>
                  {!result ? (
                    <Box sx={{
                      textAlign: 'center',
                      opacity: 0.3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      border: '2px dashed rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      p: 4
                    }}>
                      <Typography variant="h4" sx={{ fontWeight: 800 }}>Simulation Results</Typography>
                      <Typography sx={{ mt: 2 }}>Enter your investment details to see the growth projection.</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Top Aligned Results Header */}
                      <Box sx={{ textAlign: 'right', mb: 4 }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, color: '#ff7a00', mb: 0.5, letterSpacing: '-0.05em', lineHeight: 1.1 }}>
                          ₹{Math.round(result).toLocaleString('en-IN')}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem' }}>
                          Estimated Final Value
                        </Typography>
                      </Box>

                      {/* Compact Summary Cards */}
                      <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={6}>
                          <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#4facfe' }}>
                              ₹{Math.round(chartData.datasets[0].data[0]).toLocaleString('en-IN')}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>Total Invested</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#00f2fe' }}>
                              ₹{Math.round(chartData.datasets[0].data[1]).toLocaleString('en-IN')}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>Estimated Returns</Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Fixed Height Chart Container */}
                      <Box sx={{ width: '100%', mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ width: '100%', height: { xs: 220, md: 280 }, position: 'relative' }}>
                          <Doughnut
                            data={chartData}
                            options={{
                              maintainAspectRatio: false,
                              cutout: '75%',
                              plugins: {
                                legend: {
                                  display: true,
                                  position: 'bottom',
                                  labels: {
                                    color: 'rgba(255,255,255,0.7)',
                                    padding: 15,
                                    font: { weight: 'bold', size: 11 },
                                    boxWidth: 10
                                  }
                                }
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

const inputStyle = {
  mb: 3,
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    borderRadius: 3,
    background: 'rgba(0,0,0,0.2)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: '#ff7a00' },
    '&.Mui-focused fieldset': { borderColor: '#ff7a00' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' }
};

const buttonStyle = {
  py: 2,
  borderRadius: 3,
  background: 'linear-gradient(135deg, #ff7a00, #ffb347)',
  color: '#000',
  fontWeight: 900,
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 25px rgba(255, 122, 0, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #ffb347, #ff7a00)',
    boxShadow: '0 12px 35px rgba(255, 122, 0, 0.5)',
    filter: 'brightness(1.1)'
  }
};

function SIPForm({ onCalculate }) {
  const [amount, setAmount] = useState('5000');
  const [rate, setRate] = useState('12');
  const [years, setYears] = useState('10');
  return (
    <Box>
      <TextField fullWidth label="Monthly SIP (₹)" sx={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <TextField fullWidth label="Annual Return (%)" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Duration (Years)" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+amount, +rate, +years)}>Simulate SIP</Button>
    </Box>
  );
}

function SWPForm({ onCalculate }) {
  const [corpus, setCorpus] = useState('1000000');
  const [rate, setRate] = useState('8');
  const [years, setYears] = useState('10');
  const [withdrawal, setWithdrawal] = useState('5000');
  return (
    <Box>
      <TextField fullWidth label="Initial Corpus (₹)" sx={inputStyle} value={corpus} onChange={(e) => setCorpus(e.target.value)} />
      <TextField fullWidth label="Annual Return (%)" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Monthly Withdrawal (₹)" sx={inputStyle} value={withdrawal} onChange={(e) => setWithdrawal(e.target.value)} />
      <TextField fullWidth label="Duration (Years)" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+corpus, +rate, +years, +withdrawal)}>Simulate SWP</Button>
    </Box>
  );
}

function StepUpSIPForm({ onCalculate }) {
  const [amount, setAmount] = useState('5000');
  const [rate, setRate] = useState('12');
  const [years, setYears] = useState('10');
  const [stepUp, setStepUp] = useState('10');
  return (
    <Box>
      <TextField fullWidth label="Monthly SIP (₹)" sx={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <TextField fullWidth label="Expected Return (%)" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Duration (Years)" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <TextField fullWidth label="Step-Up % per Year" sx={inputStyle} value={stepUp} onChange={(e) => setStepUp(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+amount, +rate, +years, +stepUp)}>Simulate Step-Up</Button>
    </Box>
  );
}

function StepUpSWPForm({ onCalculate }) {
  const [corpus, setCorpus] = useState('1000000');
  const [rate, setRate] = useState('8');
  const [years, setYears] = useState('10');
  const [withdrawal, setWithdrawal] = useState('5000');
  const [stepUp, setStepUp] = useState('5');
  return (
    <Box>
      <TextField fullWidth label="Initial Corpus (₹)" sx={inputStyle} value={corpus} onChange={(e) => setCorpus(e.target.value)} />
      <TextField fullWidth label="Expected Return (%)" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Withdrawal (₹)" sx={inputStyle} value={withdrawal} onChange={(e) => setWithdrawal(e.target.value)} />
      <TextField fullWidth label="Duration (Years)" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <TextField fullWidth label="Step-Up % per Year" sx={inputStyle} value={stepUp} onChange={(e) => setStepUp(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+corpus, +rate, +years, +withdrawal, +stepUp)}>Simulate SWP Step-Up</Button>
    </Box>
  );
}

function LumpsumForm({ onCalculate }) {
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState('12');
  const [years, setYears] = useState('10');
  return (
    <Box>
      <TextField fullWidth label="Investment Amount (₹)" sx={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <TextField fullWidth label="Expected Return (%)" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Duration (Years)" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+amount, +rate, +years)}>Simulate Lumpsum</Button>
    </Box>
  );
}
