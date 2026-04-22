'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function MarketTicker() {
    const indices = [
        { name: 'NIFTY 50', value: '22,453.30', change: '+1.2%', up: true },
        { name: 'SENSEX', value: '74,012.15', change: '+0.8%', up: true },
        { name: 'NIFTY BANK', value: '48,125.40', change: '-0.3%', up: false },
        { name: 'GOLD', value: '72,400.00', change: '+2.1%', up: true },
        { name: 'USD/INR', value: '83.45', change: '-0.1%', up: false },
        { name: 'NASDAQ', value: '16,215.10', change: '+1.5%', up: true },
    ];

    return (
        <Box sx={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.02)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            overflow: 'hidden',
            py: 1,
            position: 'relative',
            mt: '80px' // Offset for fixed header
        }}>
            <Box sx={{
                display: 'flex',
                whiteSpace: 'nowrap',
                animation: 'ticker 40s linear infinite',
                '&:hover': { animationPlayState: 'paused' }
            }}>
                {[...indices, ...indices].map((idx, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mx: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: 'rgba(255,255,255,0.4)', mr: 1, fontSize: '0.75rem' }}>
                            {idx.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 900, color: '#fff', mr: 1, fontSize: '0.75rem' }}>
                            {idx.value}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 900, color: idx.up ? '#4caf50' : '#f44336', fontSize: '0.75rem' }}>
                            {idx.change}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <style jsx global>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </Box>
    );
}
