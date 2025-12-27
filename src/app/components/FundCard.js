'use client';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function FundCard({ fund }) {
  return (
    <Card
      sx={{
        bgcolor: '#1b1e2b',
        color: '#fff',
        borderRadius: 3,
        transition: '0.3s',
        '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {fund.schemeName}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Code: {fund.schemeCode}
        </Typography>

        <Link href={`/scheme/${fund.schemeCode}`} passHref>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
            }}
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
