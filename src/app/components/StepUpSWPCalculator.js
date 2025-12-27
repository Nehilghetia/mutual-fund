'use client';
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function StepUpSWPCalculator() {
  const [amount, setAmount] = useState(100000); // invested amount
  const [annualReturn, setAnnualReturn] = useState(12); // expected annual return
  const [withdrawal, setWithdrawal] = useState(5000); // initial monthly withdrawal
  const [years, setYears] = useState(5); // duration in years
  const [stepUp, setStepUp] = useState(10); // step-up % per year
  const [remainingFund, setRemainingFund] = useState(null);

  const calculateStepUpSWP = () => {
    const r = annualReturn / 100 / 12; // monthly rate
    let fund = parseFloat(amount);
    let currentWithdrawal = parseFloat(withdrawal);

    for (let year = 0; year < years; year++) {
      for (let month = 0; month < 12; month++) {
        fund = fund * (1 + r) - currentWithdrawal;
        if (fund < 0) {
          fund = 0;
          break;
        }
      }
      currentWithdrawal = currentWithdrawal * (1 + stepUp / 100); // increase withdrawal annually
    }

    setRemainingFund(fund);
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: 2, background: '#111', color: '#fff' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#ffb347' }}>
        Step-Up SWP Calculator
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
        sx={{ mr: 2, mb: 2, input: { color: '#fff' }, label: { color: '#ffb347' } }}
      />
      <TextField
        label="Step-Up % per Year"
        type="number"
        value={stepUp}
        onChange={e => setStepUp(e.target.value)}
        sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#ffb347' } }}
      />

      <Button
        variant="contained"
        sx={{ mt: 1, background: '#ffb347', color: '#0b0b0b', '&:hover': { background: '#ffaa47' } }}
        onClick={calculateStepUpSWP}
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
