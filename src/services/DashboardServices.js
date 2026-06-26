// src/services/DashboardServices.js
import api, { API_ENDPOINTS } from './api';

const dashboardService = {
  /**
   * Get merchant dashboard data
   * @param {Object} params - Query parameters
   * @param {string} params.start_date - Start date
   * @param {string} params.end_date - End date
   * @returns {Promise} - API response
   */
  async getDashboardData(params = {}) {
    try {
      console.log('📡 Fetching dashboard data with params:', params);
      
      const cleanParams = {};
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          cleanParams[key] = params[key];
        }
      });
      
      const response = await api.get(API_ENDPOINTS.dashboard.stats, { 
        params: cleanParams 
      });
      
      console.log('✅ Dashboard data fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      throw error;
    }
  },
};

export default dashboardService;