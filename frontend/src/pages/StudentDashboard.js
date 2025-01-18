import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, LinearProgress, List, ListItem, ListItemText } from '@mui/material';

const StudentDashboard = () => {
    const [assignments] = useState([
        { title: "Math Homework", dueDate: "2023-10-10" },
        { title: "Science Project", dueDate: "2023-10-15" },
    ]);

    const attendance = 85; // Placeholder value for attendance percentage

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Welcome, Student!
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Performance Overview</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Grades Distribution (Coming Soon)
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Upcoming Assignments</Typography>
                            <List>
                                {assignments.map((assignment, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={assignment.title}
                                            secondary={`Due: ${assignment.dueDate}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Attendance</Typography>
                            <Typography variant="body2" color="text.secondary">
                                You have attended {attendance}% of your classes.
                            </Typography>
                            <LinearProgress variant="determinate" value={attendance} sx={{ marginTop: '10px' }} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentDashboard;
