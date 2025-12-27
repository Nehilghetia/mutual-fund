'use client';
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function SIPCalculator({ navs }) {
  const [monthly, setMonthly] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(5);
  const [futureValue, setFutureValue] = useState(null);

  const calculateSIP = () => {
    const r = annualReturn / 100 / 12; // monthly rate
    const n = years * 12; // total months
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setFutureValue(fv);
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: 2, background: '#111', color: '#fff' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#ffb347' }}>
        SIP Calculator
      </Typography>

      <TextField
        label="Monthly SIP (₹)"
        type="number"
        value={monthly}
        onChange={e => setMonthly(e.target.value)}
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
        onClick={calculateSIP}
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
