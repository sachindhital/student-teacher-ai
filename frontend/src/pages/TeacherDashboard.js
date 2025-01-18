import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';

const TeacherDashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (option) => {
        console.log(`Selected option: ${option}`);
        // Add functionality for each option here
        handleMenuClose();
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Welcome, Teacher!
            </Typography>

            {/* Dropdown Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleMenuOpen}
                sx={{ marginBottom: '20px' }}
            >
                Teacher Options
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleOptionClick('View Performance')}>
                    View Performance
                </MenuItem>
                <MenuItem onClick={() => handleOptionClick('Manage Activities')}>
                    Manage Activities
                </MenuItem>
                <MenuItem onClick={() => handleOptionClick('Assign Subjects')}>
                    Assign Subjects
                </MenuItem>
                <MenuItem onClick={() => handleOptionClick('Schedule Lessons')}>
                    Schedule Lessons
                </MenuItem>
            </Menu>

            {/* Existing Dashboard Content */}
            <Box sx={{ display: 'flex', gap: 4, marginTop: '20px' }}>
                <Box sx={{ flex: 1, border: '1px solid #ddd', padding: '10px' }}>
                    <Typography variant="h6">Class Performance</Typography>
                    <Typography>Alice Johnson</Typography>
                    <Typography>Performance: A</Typography>
                    <Typography>Bob Smith</Typography>
                    <Typography>Performance: B+</Typography>
                </Box>
                <Box sx={{ flex: 1, border: '1px solid #ddd', padding: '10px' }}>
                    <Typography variant="h6">Lesson Plans</Typography>
                    <Typography>Math Class</Typography>
                    <Typography>Date: 2023-10-12</Typography>
                    <Typography>Science Lab</Typography>
                    <Typography>Date: 2023-10-14</Typography>
                </Box>
            </Box>

            <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h6">Upcoming Activities</Typography>
                <Button variant="contained" color="primary">
                    Schedule Activity
                </Button>
            </Box>
        </Box>
    );
};

export default TeacherDashboard;
