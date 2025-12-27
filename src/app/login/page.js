'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage() {
  const router = useRouter(); // Router for redirection

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('Please enter email and password.');
      return;
    }

    // Replace this with your login API or authentication logic
    if (formData.email === 'test@example.com' && formData.password === '123456') {
      setSuccess('Login successful!');
      // Redirect to home page after 1 second delay
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <Box sx={{ bgcolor: '#0b0b0b', minHeight: '100vh', color: '#fff' }}>
      <Header />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: '#1e1e1e',
            p: 4,
            borderRadius: 3,
            boxShadow: '0 0 20px rgba(255, 122, 0, 0.3)',
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, textAlign: 'center', color: '#ffb347' }}
          >
            Login
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="filled"
            sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#bdbdbd' } }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="filled"
            sx={{ mb: 3, input: { color: '#fff' }, label: { color: '#bdbdbd' } }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#ff7a00',
              color: '#000',
              fontWeight: 'bold',
              py: 1.5,
              '&:hover': { bgcolor: '#ffb347' },
            }}
          >
            Login
          </Button>

          <Typography sx={{ mt: 2, textAlign: 'center', color: '#bdbdbd' }}>
            Don’t have an account?{' '}
            <Link href="/signup" style={{ color: '#ffb347', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
