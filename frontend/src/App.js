import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                    path="/student-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['student']}>
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/teacher-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['teacher']}>
                            <TeacherDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;