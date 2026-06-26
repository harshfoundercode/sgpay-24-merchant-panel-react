// src/services/MerchantSettingsServices.js
import api from './api';

const merchantSettingsService = {
  /**
   * Change merchant password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} - API response
   */
  async changePassword(currentPassword, newPassword) {
    try {
      console.log('📡 Changing password...');
      const response = await api.post('/merchant/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      });
      console.log('✅ Password changed:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error changing password:', error);
      throw error;
    }
  },

  /**
   * Get webhook URL
   * @returns {Promise} - API response
   */
  async getWebhookUrl() {
    try {
      console.log('📡 Fetching webhook URL...');
      const response = await api.get('/merchant/profile');
      console.log('✅ Webhook URL fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching webhook URL:', error);
      throw error;
    }
  },

  /**
   * Update webhook URL
   * @param {string} webhookUrl - New webhook URL
   * @returns {Promise} - API response
   */
  async updateWebhookUrl(webhookUrl) {
    try {
      console.log('📡 Updating webhook URL...');
      const response = await api.put('/merchant/webhook-url', {
        webhook_url: webhookUrl
      });
      console.log('✅ Webhook URL updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating webhook URL:', error);
      throw error;
    }
  },

  /**
   * Toggle webhook status
   * @param {number} enabled - 1 for enabled, 0 for disabled
   * @returns {Promise} - API response
   */
  async toggleWebhook(enabled) {
    try {
      console.log('📡 Toggling webhook...');
      const response = await api.patch('/merchant/webhook-toggle', {
        webhook_enabled: enabled
      });
      console.log('✅ Webhook toggled:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error toggling webhook:', error);
      throw error;
    }
  }
};

export default merchantSettingsService;