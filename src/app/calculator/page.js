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
    <Box sx={{ bgcolor: '#0b0b0b', color: '#fff', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 5, fontWeight: 700 }}>
          Mutual Fund <span style={{ color: '#ff7a00' }}>Investment Calculators</span>
        </Typography>

        {/* Tabs for different calculators */}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: '#ff7a00' } }}
          sx={{ mb: 5 }}
        >
          <Tab label="SIP" />
          <Tab label="SWP" />
          <Tab label="Step-Up SIP" />
          <Tab label="Step-Up SWP" />
          <Tab label="Lumpsum" />
        </Tabs>

        {/* Content area */}
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Box
              sx={{
                bgcolor: '#1e1e1e',
                borderRadius: 4,
                p: 4,
                boxShadow: '0 0 10px rgba(255,122,0,0.2)',
              }}
            >
              {tab === 0 && <SIPForm onCalculate={calculateSIP} />}
              {tab === 1 && <SWPForm onCalculate={calculateSWP} />}
              {tab === 2 && <StepUpSIPForm onCalculate={calculateStepUpSIP} />}
              {tab === 3 && <StepUpSWPForm onCalculate={calculateStepUpSWP} />}
              {tab === 4 && <LumpsumForm onCalculate={calculateLumpsum} />}

              {/* Result + Charts */}
              {result && chartData && (
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#ffb347' }}>
                    💰 Final Value: ₹{result}
                  </Typography>
                  <Typography sx={{ color: '#fff', mt: 1 }}>
                    Invested: ₹{chartData.datasets[0].data[0].toFixed(2)} | Available Return: ₹{chartData.datasets[0].data[1].toFixed(2)}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, flexWrap: 'wrap', gap: 3 }}>
                    <Box sx={{ width: 200 }}>
                      <Typography sx={{ color: '#fff', mb: 1 }}>Doughnut Chart</Typography>
                      <Doughnut data={chartData} />
                    </Box>
                    <Box sx={{ width: 200 }}>
                      <Typography sx={{ color: '#fff', mb: 1 }}>Pie Chart</Typography>
                      <Pie data={chartData} />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

// -------------------- FORMS --------------------

function SIPForm({ onCalculate }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  return (
    <Box>
      <TextField fullWidth label="Monthly SIP Amount (₹)" variant="outlined" sx={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <TextField fullWidth label="Expected Annual Return (%)" variant="outlined" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Investment Duration (Years)" variant="outlined" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+amount, +rate, +years)}>Calculate</Button>
    </Box>
  );
}

function SWPForm({ onCalculate }) {
  const [corpus, setCorpus] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [withdrawal, setWithdrawal] = useState('');

  return (
    <Box>
      <TextField fullWidth label="Initial Corpus (₹)" variant="outlined" sx={inputStyle} value={corpus} onChange={(e) => setCorpus(e.target.value)} />
      <TextField fullWidth label="Expected Annual Return (%)" variant="outlined" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Withdrawal per Month (₹)" variant="outlined" sx={inputStyle} value={withdrawal} onChange={(e) => setWithdrawal(e.target.value)} />
      <TextField fullWidth label="Duration (Years)" variant="outlined" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+corpus, +rate, +years, +withdrawal)}>Calculate</Button>
    </Box>
  );
}

function StepUpSIPForm({ onCalculate }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [stepUp, setStepUp] = useState('');

  return (
    <Box>
      <TextField fullWidth label="Monthly SIP (₹)" variant="outlined" sx={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <TextField fullWidth label="Expected Return (%)" variant="outlined" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Duration (Years)" variant="outlined" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <TextField fullWidth label="Step-Up % per Year" variant="outlined" sx={inputStyle} value={stepUp} onChange={(e) => setStepUp(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+amount, +rate, +years, +stepUp)}>Calculate</Button>
    </Box>
  );
}

function StepUpSWPForm({ onCalculate }) {
  const [corpus, setCorpus] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [withdrawal, setWithdrawal] = useState('');
  const [stepUp, setStepUp] = useState('');

  return (
    <Box>
      <TextField fullWidth label="Initial Corpus (₹)" variant="outlined" sx={inputStyle} value={corpus} onChange={(e) => setCorpus(e.target.value)} />
      <TextField fullWidth label="Expected Return (%)" variant="outlined" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Withdrawal (₹)" variant="outlined" sx={inputStyle} value={withdrawal} onChange={(e) => setWithdrawal(e.target.value)} />
      <TextField fullWidth label="Duration (Years)" variant="outlined" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <TextField fullWidth label="Step-Up % per Year" variant="outlined" sx={inputStyle} value={stepUp} onChange={(e) => setStepUp(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+corpus, +rate, +years, +withdrawal, +stepUp)}>Calculate</Button>
    </Box>
  );
}

function LumpsumForm({ onCalculate }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  return (
    <Box>
      <TextField fullWidth label="Investment Amount (₹)" variant="outlined" sx={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <TextField fullWidth label="Expected Return (%)" variant="outlined" sx={inputStyle} value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField fullWidth label="Duration (Years)" variant="outlined" sx={inputStyle} value={years} onChange={(e) => setYears(e.target.value)} />
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={() => onCalculate(+amount, +rate, +years)}>Calculate</Button>
    </Box>
  );
}

const inputStyle = { mb: 2, input: { color: '#fff' }, '& .MuiInputLabel-root': { color: '#bdbdbd' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } };
const buttonStyle = { mt: 2, bgcolor: '#ff7a00', '&:hover': { bgcolor: '#ff9800' } };
