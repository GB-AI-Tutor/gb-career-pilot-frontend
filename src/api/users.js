import apiClient from "./axios";

const USERS_BASE = "/api/v1/users";

export const usersAPI = {
  // Get current user info
  getCurrentUser: async () => {
    const response = await apiClient.get(`${USERS_BASE}/me`);
    return response.data;
  },

  // Update user profile
  updateUser: async (userData) => {
    const response = await apiClient.put(
      `${USERS_BASE}/update_user_info`,
      userData,
    );
    return response.data;
  },

  // Change user password (requires current password)
  changePassword: async ({ old_password, new_password }) => {
    const candidates = [
      { method: "post", url: `${USERS_BASE}/change_password` },
      { method: "post", url: `${USERS_BASE}/change-password` },
      { method: "patch", url: `${USERS_BASE}/change_password` },
      { method: "patch", url: `${USERS_BASE}/change-password` },
      { method: "post", url: "/api/v1/auth/change_password" },
      { method: "post", url: "/api/v1/auth/change-password" },
    ];

    let lastError;
    for (const candidate of candidates) {
      try {
        const response = await apiClient[candidate.method](candidate.url, {
          old_password,
          new_password,
        });
        return response.data;
      } catch (error) {
        lastError = error;
        if (error?.response?.status !== 404) {
          throw error;
        }
      }
    }

    throw lastError || new Error("Password change endpoint not found");
  },
};

export default usersAPI;
