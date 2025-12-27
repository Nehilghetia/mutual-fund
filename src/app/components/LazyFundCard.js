'use client';

import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import FundCard from './FundCard';

export default function LazyFundCard({ fund }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box ref={ref}>
      {inView ? (
        <FundCard
          fund={fund}
          sx={{
            bgcolor: '#1e1e1e',
            borderRadius: 3,
            p: 3,
            transition: '0.3s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0px 8px 25px rgba(255, 122, 0, 0.2)',
            },
          }}
        />
      ) : (
        <Box sx={{ height: '250px', bgcolor: '#1e1e1e', borderRadius: 3 }} />
      )}
    </Box>
  );
}
