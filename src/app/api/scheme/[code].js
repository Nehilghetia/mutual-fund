import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { notFound } from 'next/navigation';

async function getScheme(code) {
  const res = await fetch(`http://localhost:3000/api/scheme/${code}`);
  if (!res.ok) throw new Error('Failed to fetch scheme');
  return res.json();
}

export default async function SchemePage({ params }) {
  const { code } = params;
  let scheme;

  try {
    scheme = await getScheme(code);
  } catch (err) {
    notFound(); // 404 page if fund not found
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>{scheme.schemeName}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>Fund Code: {scheme.schemeCode}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>Fund House: {scheme.fundHouse}</Typography>
      <Typography variant="body1">Category: {scheme.category}</Typography>
      {/* Add more scheme details here, charts, NAV history, etc. */}
    </Container>
  );
}
