// Token storage utilities

const TOKEN_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
};

export const tokenStorage = {
  // Store tokens after login
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
  },

  // Get access token
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  // Get refresh token
  getRefreshToken: () => {
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  },

  // Clear all tokens
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.USER);
  },

  // Store user data
  setUser: (user) => {
    localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
  },

  // Get user data
  getUser: () => {
    const userStr = localStorage.getItem(TOKEN_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },
};

export default tokenStorage;
