import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Mutual Fund Explorer</Link>
          </Typography>
          <Link href="/funds">Funds</Link>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
}