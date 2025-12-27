'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

export default function RollingReturnChart({ data, title }) {
  if (!data || data.length === 0) return null;

  return (
    <Box
      sx={{
        background: '#111',
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        color: '#fff'
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, textAlign: 'center', color: '#ffb347', fontWeight: 'bold' }}
      >
        {title || 'NAV Chart'}
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 40, left: 10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#ccc', fontSize: 11 }}
            angle={-35}
            textAnchor="end"
            interval="preserveStartEnd"
            height={80}
          />
          <YAxis
            tick={{ fill: '#ccc', fontSize: 12 }}
            domain={['auto', 'auto']}
            tickFormatter={(val) => `₹${val.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }}
            formatter={(value) => [`₹${value.toFixed(2)}`, 'NAV']}
            labelStyle={{ color: '#ffb347' }}
          />
          <Line
            type="monotone"
            dataKey="nav"
            stroke="#ffb347"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
