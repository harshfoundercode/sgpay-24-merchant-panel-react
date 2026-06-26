// src/services/api.js
import axios from 'axios';
import API_ENDPOINTS, { getApiUrl } from '../config/ApiEndPoints';

const API_BASE_URL = 'https://root.payoutpanel.com/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      fullUrl: config.baseURL + config.url,
      data: config.data,
      params: config.params,
    });

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token attached:', {
        fullToken: token, // Full token for debugging
      });
    } else {
      console.log('🔑 No token found in localStorage');
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data,
      timestamp: new Date().toISOString()
    });
    
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
        timestamp: new Date().toISOString()
      });

      const isLoginPage = window.location.pathname === '/login' || window.location.pathname === '/';
      const isForgotPasswordPage = window.location.pathname === '/forgot-password';
      
      // Don't redirect on login or forgot password pages
      if (error.response.status === 401 && !isLoginPage && !isForgotPasswordPage) {
        console.warn('⚠️ Token expired or invalid. Logging out...');
        localStorage.removeItem('token');
        localStorage.removeItem('merchant');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('❌ No Response from Server:', {
        request: error.request,
        url: error.config?.url,
        method: error.config?.method,
        timestamp: new Date().toISOString()
      });
    } else {
      console.error('❌ Request Setup Error:', {
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }

    return Promise.reject(error);
  }
);

// Helper function to check authentication status
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return !!(token && isLoggedIn);
};

// Helper function to get token with logging
export const getTokenWithLog = () => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('🔑 Current Token:', {
      fullToken: token,
      preview: token.substring(0, 20) + '...' + token.substring(token.length - 10),
      length: token.length
    });
    return token;
  }
  console.log('🔑 No token found');
  return null;
};

// Helper function to clear all auth data
export const clearAuthData = () => {
  console.log('🧹 Clearing all auth data...');
  localStorage.removeItem('token');
  localStorage.removeItem('merchant');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('loginTime');
  console.log('✅ Auth data cleared');
};

// Export API endpoints helper
export { API_ENDPOINTS, getApiUrl };

export default api;