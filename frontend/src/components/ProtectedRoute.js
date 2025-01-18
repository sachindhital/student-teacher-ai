import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const location = useLocation(); // Get current route for redirect reference

    if (!token) {
        // Redirect to login if token is missing
        return <Navigate to="/" state={{ from: location }} />;
    }

    try {
        // Decode the token to check validity and role
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now(); // Check if token is expired

        if (isExpired) {
            localStorage.removeItem('token'); // Clear expired token
            return <Navigate to="/" state={{ from: location }} />;
        }

        // Check if the user's role matches allowedRoles
        if (!allowedRoles.includes(payload.role)) {
            return <Navigate to="/" />;
        }
    } catch (err) {
        console.error('Invalid token:', err);
        return <Navigate to="/" state={{ from: location }} />;
    }

    // Render the protected component if all checks pass
    return children;
};

export default ProtectedRoute;
