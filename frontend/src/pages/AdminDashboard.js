import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import AddUserForm from './AddUserForm';
import axios from 'axios';

const AdminDashboard = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteEmail, setDeleteEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setDeleteEmail('');
        setError('');
        setSuccess('');
    };

    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/delete-user`, {
                data: { email: deleteEmail }, // Send email in the request body
            });
            setSuccess(response.data.message || 'User deleted successfully!');
            setError('');
            setDeleteEmail('');
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.detail || 'Failed to delete user. Please try again.');
            setSuccess('');
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
                    Add User
                </Button>
                <Button variant="contained" color="secondary" onClick={handleOpenDeleteModal}>
                    Delete User
                </Button>
            </Box>

            {/* Add User Modal */}
            <Modal open={openAddModal} onClose={handleCloseAddModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <AddUserForm onClose={handleCloseAddModal} />
                </Box>
            </Modal>

            {/* Delete User Modal */}
            <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6">Delete User</Typography>
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
                        label="User Email"
                        variant="outlined"
                        fullWidth
                        value={deleteEmail}
                        onChange={(e) => setDeleteEmail(e.target.value)}
                        sx={{ marginTop: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteUser}
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Delete User
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default AdminDashboard;
