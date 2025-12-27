'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Box, Typography } from '@mui/material';

export default function FundChart({ navs }) {
  if (!navs || navs.length === 0) return null;

  // Convert NAV data
  const formattedData = navs.map(item => ({
    date: item.date,
    nav: parseFloat(item.nav),
  }));

  // Filter yearly NAV points based on your given example pattern (approx every 1–2 months or key dates)
  const yearlyDates = [
    '13-12-2006', '19-01-2007', '05-03-2007', '17-04-2007',
    '28-05-2007', '04-07-2007', '10-08-2007', '19-09-2007',
    '29-10-2007', '05-12-2007', '14-01-2008', '19-02-2008',
    '31-03-2008', '29-05-2008'
  ];

  const yearlyData = formattedData.filter(d => yearlyDates.includes(d.date));

  return (
    <Box sx={{ background: '#111', p: 4, borderRadius: 3, boxShadow: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, color: '#ffb347', textAlign: 'center' }}
      >
        NAV Growth Chart
      </Typography>

      <Box sx={{ height: 400, display: 'flex', justifyContent: 'center' }}>
        <ResponsiveContainer width="80%" height="100%">
          <LineChart data={yearlyData} margin={{ top: 20, right: 40, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#ccc', fontSize: 12 }}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fill: '#ccc', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }}
              formatter={(value) => [`₹${value.toFixed(2)}`, 'NAV']}
            />
            <Line type="monotone" dataKey="nav" stroke="#ffb347" strokeWidth={2.5} dot />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
