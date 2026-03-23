import apiClient from './axios';

const UNI_BASE = '/api/v1/universities';

export const universitiesAPI = {
  // Get universities with pagination and sorting
  getUniversities: async ({
    limit = 10,
    offset = 0,
    sort_by = 'ranking_national',
    order = 'asc',
  } = {}) => {
    const response = await apiClient.get(`${UNI_BASE}/get_university`, {
      params: { limit, offset, sort_by, order },
    });
    return response.data;
  },

  // Get university by name
  getUniversityByName: async (name) => {
    const response = await apiClient.get(`${UNI_BASE}/get_university_by_name`, {
      params: { name },
    });
    return response.data;
  },

  // Get programs by university ID
  getProgramsByUniversity: async (id, field) => {
    const response = await apiClient.get(`${UNI_BASE}/university/${id}/programs`, {
      params: { field },
    });
    return response.data;
  },

  // Search programs with filters
  searchPrograms: async ({
    field = null,
    city = null,
    min_fee = null,
    max_fee = null,
    sector = 'Private',
    limit = 10,
    offset = 0,
    sort_by = 'estimated_total_fee',
    order = 'asc',
  } = {}) => {
    const params = { limit, offset, sort_by, order, sector };
    if (field) params.field = field;
    if (city) params.city = city;
    if (min_fee !== null) params.min_fee = min_fee;
    if (max_fee !== null) params.max_fee = max_fee;

    const response = await apiClient.get(`${UNI_BASE}/programs/search`, { params });
    return response.data;
  },

  // Add university to favorites
  addFavorite: async (universityId) => {
    const response = await apiClient.post(`${UNI_BASE}/favorites/${universityId}`);
    return response.data;
  },

  // Remove university from favorites
  removeFavorite: async (universityId) => {
    const response = await apiClient.delete(`${UNI_BASE}/favorites/${universityId}`);
    return response.data;
  },

  // Get user's favorite universities
  getFavorites: async () => {
    const response = await apiClient.get(`${UNI_BASE}/favorites`);
    return response.data;
  },
};

export default universitiesAPI;
