// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import BridgePayLogin from '../page/auth/LoginScreen';
// import BridgeAdminDashboard from '../components/DashboardLayout';
// import ForgotPassword from '../page/auth/ForgetPassword';
// import MerchantDashboard from '../page/view/MerchantDashboard';
// import PayoutHistory from '../page/view/PayOutHistory';
// import MerchantProfile from '../page/view/MerchantProfile';
// import MerchantSettings from '../page/view/MerchantSettings';
// import ApiIntegrationGuide from '../page/view/ApiIntegrationGuide';
// import ErrorCodeReference from '../page/view/ErrorCodesDocument';

// export const AppRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<BridgePayLogin />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />

//             {/* Dashboard wrapper with nested routes */}
//             <Route path="/dashboard" element={<BridgeAdminDashboard />}>
//                 <Route index element={<MerchantDashboard />} />
//                 <Route path="payout-history" element={<PayoutHistory />} />
//                 <Route path="settings" element={<MerchantSettings />} />
//                 <Route path="profile" element={<MerchantProfile />} />
//                 <Route path="api-integration" element={<ApiIntegrationGuide />} />
//                 <Route path="error-codes" element={<ErrorCodeReference />} />
//             </Route>

//             <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//     );
// };
// src/routes/index.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BridgePayLogin from '../page/auth/LoginScreen';
import BridgeAdminDashboard from '../components/DashboardLayout';
import ForgotPassword from '../page/auth/ForgetPassword';
import MerchantDashboard from '../page/view/MerchantDashboard';
import PayoutHistory from '../page/view/PayOutHistory';
import MerchantProfile from '../page/view/MerchantProfile';
import MerchantSettings from '../page/view/MerchantSettings';
import ApiIntegrationGuide from '../page/view/ApiIntegrationGuide';
import ErrorCodeReference from '../page/view/ErrorCodesDocument';
import authService from '../services/AuthServices';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!token || !isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
};

// Public Route Component (redirects if logged in)
const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (token && isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoute><BridgePayLogin /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><BridgePayLogin /></PublicRoute>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes with Dashboard Layout */}
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <BridgeAdminDashboard />
                    </ProtectedRoute>
                }
            >
                <Route index element={<MerchantDashboard />} />
                <Route path="payout-history" element={<PayoutHistory />} />
                <Route path="settings" element={<MerchantSettings />} />
                <Route path="profile" element={<MerchantProfile />} />
                <Route path="api-integration" element={<ApiIntegrationGuide />} />
                <Route path="error-codes" element={<ErrorCodeReference />} />
            </Route>

            {/* Catch all - redirect to login */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};