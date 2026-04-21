import apiClient from "./axios";

const STATS_BASE = "/api/v1/stats/stats";

export const statsAPI = {
  // Get all university and program names
  getStats: async () => {
    const response = await apiClient.get(STATS_BASE);
    return response.data;
  },
};

export default statsAPI;
