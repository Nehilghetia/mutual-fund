'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // You can integrate API here to register the user
    setSuccess('Signup successful! You can now login.');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0b0b0b',
        color: '#fff',
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
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#ffb347' }}>
          Sign Up
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="filled"
          sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#bdbdbd' } }}
        />
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
          sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#bdbdbd' } }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
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
          Sign Up
        </Button>

        <Typography sx={{ mt: 2, textAlign: 'center', color: '#bdbdbd' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#ffb347', textDecoration: 'none' }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
