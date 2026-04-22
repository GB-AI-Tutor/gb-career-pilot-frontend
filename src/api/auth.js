import apiClient from "./axios";
import { supabase } from "../lib/supabaseClient";

const AUTH_BASE = "/api/v1/auth";

export const authAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await apiClient.post(
      `${"/api/v1/users"}/Registeration`,
      userData,
    );
    return response.data;
  },

  // Verify email with token
  verifyEmail: async (token) => {
    const response = await apiClient.post(`${AUTH_BASE}/verify`, null, {
      params: { token },
    });
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await apiClient.post(`${AUTH_BASE}/login`, credentials);
    return response.data;
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post(`${AUTH_BASE}/refresh`, {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post(`${AUTH_BASE}/logout`);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const redirectTo = `${window.location.origin}/update-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      throw error;
    }

    return { message: "Reset link sent" };
  },

  // Update password using backend endpoint and refresh_token cookie
  resetPassword: async ({ new_password }) => {
    const response = await apiClient.post(
      `${AUTH_BASE}/update-password`,
      null,
      {
        params: { new_password },
      },
    );
    return response.data;
  },
};

export default authAPI;
