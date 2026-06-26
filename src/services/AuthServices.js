// src/services/authService.js
import api, { API_ENDPOINTS } from './api';

const authService = {
  async login(email, password) {
    console.log('🔐 Login attempt started');
    console.log('📧 Email:', email);
    
    try {
      const response = await api.post(API_ENDPOINTS.auth.login, { 
        email, 
        password 
      });
      
      console.log('📥 Login response:', response.data);
      
      if (response.data.token) {
        console.log('🔑 Token received');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('merchant', JSON.stringify(response.data.merchant));
        localStorage.setItem('isLoggedIn', 'true');
        console.log('💾 Data saved to localStorage');
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  },

  logout() {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('merchant');
    localStorage.removeItem('isLoggedIn');
  },

  isAuthenticated() {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return token !== null && isLoggedIn;
  },

  getMerchant() {
    const merchant = localStorage.getItem('merchant');
    return merchant ? JSON.parse(merchant) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

};

export default authService;