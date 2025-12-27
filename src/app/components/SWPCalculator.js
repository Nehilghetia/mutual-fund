'use client';
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function SWPCalculator() {
  const [amount, setAmount] = useState(100000); // initial investment
  const [annualReturn, setAnnualReturn] = useState(12); // expected annual return %
  const [withdrawal, setWithdrawal] = useState(5000); // monthly withdrawal
  const [years, setYears] = useState(5); // duration
  const [remainingFund, setRemainingFund] = useState(null);

  const calculateSWP = () => {
    const r = annualReturn / 100 / 12; // monthly rate
    const totalMonths = years * 12;
    let fund = parseFloat(amount);

    for (let i = 0; i < totalMonths; i++) {
      fund = fund * (1 + r) - parseFloat(withdrawal);
      if (fund < 0) {
        fund = 0;
        break;
      }
    }

    setRemainingFund(fund);
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: 2, background: '#111', color: '#fff' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#ffb347' }}>
        SWP Calculator
      </Typography>

      <TextField
        label="Invested Amount (₹)"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        sx={{ mr: 2, mb: 2, input: { color: '#fff' }, label: { color: '#ffb347' } }}
      />
      <TextField
        label="Expected Annual Return (%)"
        type="number"
        value={annualReturn}
        onChange={e => setAnnualReturn(e.target.value)}
        sx={{ mr: 2, mb: 2, input: { color: '#fff' }, label: { color: '#ffb347' } }}
      />
      <TextField
        label="Monthly Withdrawal (₹)"
        type="number"
        value={withdrawal}
        onChange={e => setWithdrawal(e.target.value)}
        sx={{ mr: 2, mb: 2, input: { color: '#fff' }, label: { color: '#ffb347' } }}
      />
      <TextField
        label="Duration (Years)"
        type="number"
        value={years}
        onChange={e => setYears(e.target.value)}
        sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#ffb347' } }}
      />

      <Button
        variant="contained"
        sx={{ mt: 1, background: '#ffb347', color: '#0b0b0b', '&:hover': { background: '#ffaa47' } }}
        onClick={calculateSWP}
      >
        Calculate
      </Button>

      {remainingFund !== null && (
        <Typography sx={{ mt: 2, color: '#ffb347', fontWeight: 'bold' }}>
          Remaining Fund after {years} years: ₹{remainingFund.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
}
