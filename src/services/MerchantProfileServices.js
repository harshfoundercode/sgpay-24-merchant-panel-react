// src/services/MerchantProfileServices.js
import api, { API_ENDPOINTS } from './api';

const merchantProfileService = {
  /**
   * Get merchant profile
   * @returns {Promise} - API response
   */
  async getProfile() {
    try {
      console.log('📡 Fetching merchant profile...');
      const response = await api.get(API_ENDPOINTS.profile);
      console.log('✅ Profile fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching profile:', error);
      throw error;
    }
  }
 
};

export default merchantProfileService;