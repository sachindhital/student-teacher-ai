import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to login if no token exists
        return <Navigate to="/" />;
    }

    try {
        // Decode the token to extract payload
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now(); // Check if the token is expired

        if (isExpired) {
            localStorage.removeItem("token"); // Clear the expired token
            return <Navigate to="/" />;
        }

        // Check if the user's role matches any of the allowed roles
        if (!allowedRoles.includes(payload.role)) {
            return <Navigate to="/" />;
        }
    } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        return <Navigate to="/" />;
    }

    // Render the protected component if all checks pass
    return children;
};

export default ProtectedRoute;
