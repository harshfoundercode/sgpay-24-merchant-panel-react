import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BridgePayLogin from '../page/auth/LoginScreen';
import BridgeAdminDashboard from '../components/DashboardLayout';
import ForgotPassword from '../page/auth/ForgetPassword';
import ApiIntegrationGuide from '../page/view/ApiIntegrationGuide';
import ErrorCodeReference from '../page/view/ErrorCodesDocument';

// Temporarily disabled - will be used when API is ready
// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     
//     if (!token && !isLoggedIn) {
//         return <Navigate to="/" replace />;
//     }
//     
//     return children;
// };

// Temporarily disabled - will be used when API is ready
// const PublicRoute = ({ children }) => {
//     const token = localStorage.getItem('token');
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     
//     if (token || isLoggedIn) {
//         return <Navigate to="/dashboard" replace />;
//     }
//     
//     return children;
// };

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Login Route */}
            <Route path="/" element={<BridgePayLogin />} />
            <Route path="/dashboard" element={<BridgeAdminDashboard />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/apiIntegrate" element={<ApiIntegrationGuide />} />
            <Route path="/errorCode" element={<ErrorCodeReference />} />
            
            {/* Catch all - redirect to login */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};