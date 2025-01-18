import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // For success or error messages
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                email: email,
                password: password,
            });

            // Handle success
            const { message, role, token } = response.data;
            setMessage(message); // Set success message
            setError(''); // Clear any previous error
            if (token) {
                localStorage.setItem("token", token); // Save the token
            }

            // Redirect based on role
            if (role === "student") {
                navigate("/student-dashboard");
            } else if (role === "teacher") {
                navigate("/teacher-dashboard");
            }
            else if (role === "admin"){
                navigate("/admin-dashboard")
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            setError(error.response?.data?.detail || "Something went wrong. Please try again."); // Display error message
            setMessage(''); // Clear success message
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '20px',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            {message && (
                <Typography color="primary" gutterBottom>
                    {message}
                </Typography>
            )}
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '20px' }}
                >
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginPage;
