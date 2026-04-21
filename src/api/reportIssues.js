import apiClient from "./axios";

const REPORT_ISSUES_BASE = "/api/v1/report-issues";

export const reportIssuesAPI = {
  createIssue: async (payload) => {
    const response = await apiClient.post(REPORT_ISSUES_BASE, payload);
    return response.data;
  },
};

export default reportIssuesAPI;
