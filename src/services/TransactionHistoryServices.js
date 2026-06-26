// src/services/TransactionServices.js
import api, { API_ENDPOINTS } from './api';

const transactionService = {
  /**
   * Get transactions list with pagination and filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.status - Filter by status
   * @param {string} params.search - Search term
   * @param {string} params.from_date - Start date
   * @param {string} params.to_date - End date
   * @param {string} params.merchant_id - Filter by merchant
   * @param {string} params.api_used - Filter by API
   * @returns {Promise} - API response
   */
  async getTransactions(params = {}) {
    try {
      console.log('📡 Fetching merchant transactions with params:', params);
      
      const cleanParams = {};
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          cleanParams[key] = params[key];
        }
      });
      
      // Use the merchant transactions endpoint
      const response = await api.get('/merchant/transactions', { 
        params: cleanParams 
      });
      
      console.log('✅ Merchant transactions fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching merchant transactions:', error);
      throw error;
    }
  },

  /**
   * Get transaction details by ID
   * @param {string|number} id - Transaction ID
   * @returns {Promise} - API response
   */
  async getTransactionDetails(id) {
    try {
      console.log('📡 Fetching transaction details for ID:', id);
      const response = await api.get(`/merchant/transactions/${id}`);
      console.log('✅ Transaction details fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching transaction details:', error);
      throw error;
    }
  },

  /**
   * Export transactions
   * @param {Object} params - Filter parameters
   * @returns {Promise} - API response with blob
   */
  async exportTransactions(params = {}) {
    try {
      console.log('📡 Exporting merchant transactions with params:', params);
      const response = await api.get('/merchant/transactions/export', { 
        params,
        responseType: 'blob'
      });
      console.log('✅ Transactions exported');
      return response.data;
    } catch (error) {
      console.error('❌ Error exporting transactions:', error);
      throw error;
    }
  },

  /**
   * Retry a failed transaction
   * @param {string|number} id - Transaction ID
   * @returns {Promise} - API response
   */
  async retryTransaction(id) {
    try {
      console.log('📡 Retrying merchant transaction:', id);
      const response = await api.post(`/merchant/transactions/${id}/retry`);
      console.log('✅ Transaction retried:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error retrying transaction:', error);
      throw error;
    }
  },

  /**
   * Return transaction to SGPay
   * @param {string|number} id - Transaction ID
   * @returns {Promise} - API response
   */
  async returnTransaction(id) {
    try {
      console.log('📡 Returning merchant transaction:', id);
      const response = await api.post(`/merchant/transactions/${id}/return`);
      console.log('✅ Transaction returned:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error returning transaction:', error);
      throw error;
    }
  }
};

export default transactionService;