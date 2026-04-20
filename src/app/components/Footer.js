import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, GitHub } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box sx={{
      bgcolor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(10px)',
      pt: 10,
      pb: 5,
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <Container>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(90deg, #fff, #ff7a00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              FundExplorer
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, maxWidth: 300, lineHeight: 1.8 }}>
              Empowering investors with real-time data and advanced simulation tools. Your journey to wealth starts here.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[Facebook, Twitter, LinkedIn, Instagram, GitHub].map((Icon, i) => (
                <IconButton key={i} sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#ff7a00' } }}>
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: '#fff' }}>Platform</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { name: 'Explore Funds', path: '/funds' },
                { name: 'SIP Calculator', path: '/calculator' },
                { name: 'Rankings', path: '/ranking' },
                { name: 'Active Funds', path: '/active-funds' }
              ].map((item) => (
                <Link key={item.name} href={item.path} sx={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', '&:hover': { color: '#ff7a00' } }}>
                  {item.name}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: '#fff' }}>Company</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link key={item.name} href={item.path} sx={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', '&:hover': { color: '#ff7a00' } }}>
                  {item.name}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: '#fff' }}>Subscribe to Insights</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3 }}>
              Get the latest market updates and fund analysis delivered to your inbox.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <input
                placeholder="Email address"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  color: '#fff',
                  flexGrow: 1
                }}
              />
              <button style={{
                background: '#ff7a00',
                color: '#fff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}>
                Join
              </button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ pt: 5, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)', mb: 1 }}>
            © 2026 FundExplorer. Built for the modern investor.
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)', display: 'block' }}>
            Data source: <Link href="https://www.mfapi.in/" target="_blank" sx={{ color: 'inherit', textDecoration: 'underline' }}>mfapi.in</Link> & <Link href="https://www.amfiindia.com/" target="_blank" sx={{ color: 'inherit', textDecoration: 'underline' }}>AMFI India</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
