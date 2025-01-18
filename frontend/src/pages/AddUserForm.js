import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import axios from 'axios';

const AddUserForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // Role can be 'student', 'teacher', or 'admin'
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                email,
                password,
                role,
            });

            setSuccess(response.data.message || 'User added successfully!');
            setError(''); // Clear any previous error

            // Clear the form
            setEmail('');
            setPassword('');
            setRole('');

            // Close the modal after a short delay (optional)
            setTimeout(() => {
                onClose();
                setSuccess(''); // Clear success message
            }, 2000);
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.detail || 'Failed to add user. Please try again.');
            setSuccess(''); // Clear success message
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Add New User</Typography>
            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}
            {success && (
                <Typography color="primary" variant="body2">
                    {success}
                </Typography>
            )}
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                select
                label="Role"
                variant="outlined"
                fullWidth
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add User
            </Button>
        </Box>
    );
};

export default AddUserForm;
