const API_BASE_URL = 'https://root.payoutpanel.com/api/';

const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: 'merchant/login'
  },
   dashboard: {
    stats: 'merchant/dashboard',
  },
  profile:'/merchant/profile',
};

// Helper function to get full URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function to get endpoint with params
export const getApiUrlWithParams = (endpoint, params = {}) => {
  const url = getApiUrl(endpoint);
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `${url}?${queryString}` : url;
};

export default API_ENDPOINTS;