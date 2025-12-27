'use client';
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function LumpSumCalculator() {
  const [amount, setAmount] = useState(100000); // invested amount
  const [annualReturn, setAnnualReturn] = useState(12); // expected annual return %
  const [years, setYears] = useState(5); // duration in years
  const [futureValue, setFutureValue] = useState(null);

  const calculateLumpSum = () => {
    const r = annualReturn / 100; // annual rate
    const fv = amount * Math.pow(1 + r, years); // annual compounding
    setFutureValue(fv);
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: 2, background: '#111', color: '#fff' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#ffb347' }}>
        Lump Sum Calculator
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
        label="Investment Duration (Years)"
        type="number"
        value={years}
        onChange={e => setYears(e.target.value)}
        sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#ffb347' } }}
      />

      <Button
        variant="contained"
        sx={{ mt: 1, background: '#ffb347', color: '#0b0b0b', '&:hover': { background: '#ffaa47' } }}
        onClick={calculateLumpSum}
      >
        Calculate
      </Button>

      {futureValue !== null && (
        <Typography sx={{ mt: 2, color: '#ffb347', fontWeight: 'bold' }}>
          Estimated Future Value: ₹{futureValue.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
}
