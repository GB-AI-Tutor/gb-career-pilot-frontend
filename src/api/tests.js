import apiClient from "./axios";

/**
 * Test Prep API Service
 * Handles all test preparation related API calls
 */

// Get all tests with optional filters
export const getTests = async (examType = null) => {
  const params = examType ? { exam_type: examType } : {};
  const response = await apiClient.get("/api/v1/tests", { params });
  return response.data;
};

// Get specific test details
export const getTestDetails = async (testId) => {
  const response = await apiClient.get(`/api/v1/tests/${testId}`);
  return response.data;
};

// Start a test (creates attempt and returns questions)
export const startTest = async (testId) => {
  const response = await apiClient.post(`/api/v1/tests/${testId}/start`);
  return response.data;
};

// Autosave answers during test
export const saveAnswers = async (attemptId, answers) => {
  const response = await apiClient.patch(
    `/api/v1/tests/attempts/${attemptId}`,
    {
      answers,
    },
  );
  return response.data;
};

// Submit test for grading
export const submitTest = async (attemptId, answers, timeTakenSeconds = 0) => {
  const response = await apiClient.post(
    `/api/v1/tests/attempts/${attemptId}/submit`,
    {
      answers,
      time_taken_seconds: timeTakenSeconds,
    },
  );
  return response.data;
};

// Get test results
export const getTestResults = async (attemptId) => {
  const response = await apiClient.get(
    `/api/v1/tests/attempts/${attemptId}/results`,
  );
  return response.data;
};

// Get user statistics
export const getUserStats = async () => {
  const response = await apiClient.get("/api/v1/users/me/stats");
  return response.data;
};

// Get user's test attempt history
export const getUserAttempts = async (limit = 10, offset = 0) => {
  const response = await apiClient.get("/api/v1/users/me/attempts", {
    params: { limit, offset },
  });
  return response.data;
};

// Report a question
export const reportQuestion = async (questionId, reason) => {
  const response = await apiClient.post(
    `/api/v1/questions/${questionId}/report`,
    {
      reason,
    },
  );
  return response.data;
};
