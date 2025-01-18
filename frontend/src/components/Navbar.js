import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/'); // Redirect to login page
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Student-Teacher.AI
                </Typography>
                {localStorage.getItem('token') && (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
