import apiClient from "./axios";

const GROQ_BASE = "/api/v1/groq";

export const chatAPI = {
  // List user conversations
  listConversations: async () => {
    const response = await apiClient.get(`${GROQ_BASE}/conversations`);
    return response.data;
  },

  // Send chat message (streaming)
  sendMessage: async (messages, conversationId = null) => {
    const payload = {
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    };

    if (conversationId) {
      payload.conversation_id = conversationId;
    }

    // For streaming responses, we need to handle this differently
    // This returns the response object, not the data
    return apiClient.post(`${GROQ_BASE}/chat`, payload, {
      responseType: "stream",
      adapter: "fetch", // Use fetch adapter for SSE
    });
  },

  // Test Groq connection
  testConnection: async (prompt) => {
    const response = await apiClient.post(`${GROQ_BASE}/test-api`, null, {
      params: { prompt },
    });
    return response.data;
  },
};

export default chatAPI;
