import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedLogin");
    if (!hasVisited) {
      localStorage.setItem("hasVisitedLogin", "true");
      window.location.reload(); // Refresh the page on first visit
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        {
          withCredentials: true, // Include credentials like cookies
        }
      );
      setMessage(response.data.message);

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E0E7FF", // Soft pastel blue background
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF", // White background for the form
              padding: 4,
              borderRadius: 3,
              boxShadow: 6, // Subtle shadow for depth
              width: "100%",
              maxWidth: 400,
              border: "1px solid #D1D5DB", // Soft gray border for the form
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                marginBottom: 3,
                color: "#3B82F6", // Primary blue color
                fontWeight: "bold",
                fontSize: 26,
              }}
            >
              Log In
            </Typography>

            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                sx={{
                  marginBottom: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px", // Rounded edges for the input
                  },
                  "& .MuiInputLabel-root": {
                    color: "#4B5563", // Soft gray color for labels
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                sx={{
                  marginBottom: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px", // Rounded edges for the input
                  },
                }}
              />

              <Button
                sx={{
                  marginTop: 3,
                  width: "100%",
                  padding: 1.5,
                  backgroundColor: "#3B82F6", // Blue button color
                  "&:hover": {
                    backgroundColor: "#2563EB", // Darker blue on hover
                  },
                  borderRadius: "8px", // Rounded corners for the button
                }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Log In
              </Button>
            </form>

            <Typography
              sx={{
                textAlign: "center",
                marginTop: 2,
                fontSize: "14px",
                color: "#3B82F6", // Primary blue color
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Don’t have an account? <a href="/signup">Sign up</a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
