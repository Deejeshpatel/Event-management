import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from './api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password });
      setMessage(response.data.message);
      setUsername('');
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <Container className='bg-blue' maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Box
        sx={{
          backgroundColor: '#FFFFFF', // White background for the form
          padding: 4,
          borderRadius: 3, // Rounded corners for the form
          boxShadow: 6, // Slight shadow for depth
          border: '1px solid #D1D5DB', // Soft gray border
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginBottom: 3, color: '#004d40' }}>
          Sign Up
        </Typography>

        {message && <Alert severity="success" sx={{ marginBottom: 2, backgroundColor: '#A7F3D0' }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ marginBottom: 2, backgroundColor: '#FECACA' }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              marginBottom: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px', // Rounded edges for input
              },
              '& .MuiInputLabel-root': {
                color: '#004d40', // Deep teal color for labels
              },
            }}
          />

          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              marginBottom: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px', // Rounded edges for input
              },
              '& .MuiInputLabel-root': {
                color: '#004d40', // Deep teal color for labels
              },
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px', // Rounded edges for input
              },
              '& .MuiInputLabel-root': {
                color: '#004d40', // Deep teal color for labels
              },
            }}
          />

          <Button
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            sx={{
              padding: 1.5,
              fontSize: '1rem',
              backgroundColor: '#004d40', // Deep teal color for the button
              '&:hover': { backgroundColor: '#00796b' }, // Darker teal on hover
              borderRadius: '8px', // Rounded corners for the button
            }}
          >
            Sign Up
          </Button>
        </form>

        <Typography align="center" sx={{ marginTop: 3 }}>
          Already have an account?{' '}
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ textTransform: 'none', color: '#004d40' }}
          >
            Log in
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
