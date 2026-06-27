// src/services/ApiIntegrationServices.js
import api from './api';

const apiIntegrationService = {
  /**
   * Get API documentation
   * @returns {Promise} - API response with documentation
   */
  async getApiDocumentation() {
    try {
      console.log('📡 Fetching API documentation...');
      const response = await api.get('/payout/doc');
      console.log('✅ API documentation fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching API documentation:', error);
      throw error;
    }
  }
};

export default apiIntegrationService;