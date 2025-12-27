'use client';
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function StepUpSIPCalculator({ navs }) {
  const [monthly, setMonthly] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(5);
  const [stepUp, setStepUp] = useState(10); // step-up percentage per year
  const [futureValue, setFutureValue] = useState(null);

  const calculateStepUpSIP = () => {
    const r = annualReturn / 100 / 12; // monthly rate
    let fv = 0;
    let currentSIP = parseFloat(monthly);

    for (let year = 0; year < years; year++) {
      for (let month = 0; month < 12; month++) {
        fv = fv * (1 + r) + currentSIP;
      }
      currentSIP = currentSIP * (1 + stepUp / 100); // increase SIP annually
    }

    setFutureValue(fv);
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: 2, background: '#111', color: '#fff' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#ffb347' }}>
        Step-Up SIP Calculator
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
        onClick={calculateStepUpSIP}
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
