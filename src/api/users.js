import apiClient from './axios';

const USERS_BASE = '/api/v1/users';

export const usersAPI = {
  // Get current user info
  getCurrentUser: async () => {
    const response = await apiClient.get(`${USERS_BASE}/me`);
    return response.data;
  },

  // Update user profile
  updateUser: async (userData) => {
    const response = await apiClient.put(`${USERS_BASE}/update_user_info`, userData);
    return response.data;
  },
};

export default usersAPI;
