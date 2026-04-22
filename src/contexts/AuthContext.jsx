import { createContext, useState, useEffect } from "react";
import { authAPI } from "../api/auth";
import { usersAPI } from "../api/users";
import { tokenStorage } from "../utils/tokenStorage";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.getAccessToken();
      const savedUser = tokenStorage.getUser();

      if (token && savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);

        // Optionally fetch fresh user data
        try {
          const freshUser = await usersAPI.getCurrentUser();
          setUser(freshUser);
          tokenStorage.setUser(freshUser);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      toast.success(
        "Registration successful! Please check your email to verify your account.",
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.detail || "Registration failed";
      toast.error(message);
      throw error;
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { access_token, refresh_token } = response;

      // Store tokens
      tokenStorage.setTokens(access_token, refresh_token);

      // Fetch user data
      const userData = await usersAPI.getCurrentUser();
      setUser(userData);
      tokenStorage.setUser(userData);
      setIsAuthenticated(true);

      toast.success("Login successful!");
      return userData;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Wrong email or password. Please check your credentials and try again.";
      toast.error(message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state regardless of API call success
      tokenStorage.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await usersAPI.updateUser(userData);
      const updatedProfile = response?.data ?? response;

      // Update local user data
      const updatedUser = { ...user, ...updatedProfile };
      setUser(updatedUser);
      tokenStorage.setUser(updatedUser);

      toast.success("Profile updated successfully!");
      return updatedUser;
    } catch (error) {
      const message = error.response?.data?.detail || "Profile update failed";
      toast.error(message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
