import apiClient from "./axios";

const STATS_BASE = "/api/v1/stats";

export const statsAPI = {
  // Get all university and program names
  getStats: async () => {
    const response = await apiClient.get(`${STATS_BASE}/stats`);
    return response.data;
  },
};

export default statsAPI;
