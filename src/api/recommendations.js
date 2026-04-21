import apiClient from "./axios";

/**
 * Recommendations API Module
 * Handles all API calls for university recommendations and user preferences
 */

const recommendationAPI = {
  /**
   * Get user preferences
   * @returns {Promise<Object>} User preferences
   */
  getUserPreferences: async () => {
    const response = await apiClient.get("/api/v1/user-preferences");
    return response.data;
  },

  /**
   * Create or update user preferences
   * @param {Object} preferences - User preference data
   * @returns {Promise<Object>} Updated preferences
   */
  createOrUpdatePreferences: async (preferences) => {
    const response = await apiClient.post(
      "/api/v1/user-preferences",
      preferences,
    );
    return response.data;
  },

  /**
   * Get user recommendations
   * @param {Object} params - Query parameters
   * @param {number} params.limit - Number of recommendations to fetch (default: 10)
   * @param {number} params.offset - Pagination offset (default: 0)
   * @param {string} params.tier - Filter by tier ('Safety', 'Target', 'Reach', 'Dream')
   * @param {string} params.sort_by - Sort field ('score', 'match_percentage', 'name')
   * @param {string} params.order - Sort order ('asc', 'desc')
   * @returns {Promise<Object>} Recommendations with metadata
   */
  getUserRecommendations: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.offset) queryParams.append("offset", params.offset);
    if (params.tier) queryParams.append("tier", params.tier);
    if (params.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params.order) queryParams.append("order", params.order);

    const response = await apiClient.get(
      `/api/v1/user-recommendations?${queryParams.toString()}`,
    );
    return response.data;
  },

  /**
   * Get recommendations by tier
   * @param {string} tier - Recommendation tier ('Safety', 'Target', 'Reach', 'Dream')
   * @param {Object} params - Additional query parameters
   * @returns {Promise<Object>} Recommendations for the specified tier
   */
  getRecommendationsByTier: async (tier, params = {}) => {
    return recommendationAPI.getUserRecommendations({
      ...params,
      tier,
    });
  },

  /**
   * Get recommendations for a specific university
   * @param {number} universityId - University ID
   * @returns {Promise<Object>} Recommendation details for the university
   */
  getUniversityRecommendation: async (universityId) => {
    const response = await apiClient.get(
      `/api/v1/user-recommendations/${universityId}`,
    );
    return response.data;
  },

  /**
   * Calculate/recalculate recommendations for user
   * @returns {Promise<Object>} Calculation result with timestamp
   */
  calculateRecommendations: async () => {
    const response = await apiClient.post("/api/v1/recommendations/calculate");
    return response.data;
  },

  /**
   * Log user interaction with a recommendation
   * @param {Object} interaction - Interaction data
   * @param {number} interaction.university_id - University ID
   * @param {string} interaction.interaction_type - Type ('view', 'click', 'save', 'shortlist', 'unsave')
   * @param {Object} interaction.metadata - Additional context (optional)
   * @returns {Promise<Object>} Interaction logged confirmation
   */
  logInteraction: async (interaction) => {
    const response = await apiClient.post(
      "/api/v1/recommendations/interactions",
      interaction,
    );
    return response.data;
  },

  /**
   * View/track university recommendation
   * @param {number} universityId - University ID
   * @returns {Promise<Object>} View logged confirmation
   */
  viewRecommendation: async (universityId) => {
    return recommendationAPI.logInteraction({
      university_id: universityId,
      interaction_type: "view",
      metadata: {
        source: "recommendations_page",
        timestamp: new Date().toISOString(),
      },
    });
  },

  /**
   * Save/bookmark a university recommendation
   * @param {number} universityId - University ID
   * @returns {Promise<Object>} Save confirmed
   */
  saveRecommendation: async (universityId) => {
    return recommendationAPI.logInteraction({
      university_id: universityId,
      interaction_type: "save",
      metadata: {
        source: "recommendations_page",
        timestamp: new Date().toISOString(),
      },
    });
  },

  /**
   * Unsave a university recommendation
   * @param {number} universityId - University ID
   * @returns {Promise<Object>} Unsave confirmed
   */
  unsaveRecommendation: async (universityId) => {
    return recommendationAPI.logInteraction({
      university_id: universityId,
      interaction_type: "unsave",
      metadata: {
        source: "recommendations_page",
        timestamp: new Date().toISOString(),
      },
    });
  },

  /**
   * Add university to shortlist
   * @param {number} universityId - University ID
   * @returns {Promise<Object>} Shortlist action confirmed
   */
  shortlistUniversity: async (universityId) => {
    return recommendationAPI.logInteraction({
      university_id: universityId,
      interaction_type: "shortlist",
      metadata: {
        source: "recommendations_page",
        timestamp: new Date().toISOString(),
      },
    });
  },

  /**
   * Get recommendation summary statistics
   * @returns {Promise<Object>} Summary with tier distribution
   */
  getRecommendationSummary: async () => {
    const response = await apiClient.get("/api/v1/recommendations/summary");
    return response.data;
  },

  /**
   * Get recommendation factors (weights)
   * @returns {Promise<Object>} Current recommendation factors
   */
  getRecommendationFactors: async () => {
    const response = await apiClient.get("/api/v1/recommendations/factors");
    return response.data;
  },

  /**
   * Get recommendation tier thresholds
   * @returns {Promise<Object>} Tier configuration
   */
  getRecommendationTiers: async () => {
    const response = await apiClient.get("/api/v1/recommendations/tiers");
    return response.data;
  },
};

export default recommendationAPI;
