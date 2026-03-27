export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/v1/users/Registeration", // Registration is in users router, not auth
    LOGIN: "/api/v1/auth/login",
    LOGOUT: "/api/v1/auth/logout",
    VERIFY: "/api/v1/auth/verify",
    REFRESH: "/api/v1/auth/refresh",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
  },
  USERS: {
    ME: "/api/v1/users/me",
    UPDATE: "/api/v1/users/update_user_info",
  },
  UNIVERSITIES: {
    LIST: "/api/v1/universities/get_university",
    BY_NAME: "/api/v1/universities/get_university_by_name",
    PROGRAMS: "/api/v1/universities/university",
    FAVORITES: "/api/v1/universities/favorites",
  },
  PROGRAMS: {
    SEARCH: "/api/v1/universities/programs/search",
  },
  CHAT: {
    SEND: "/api/v1/groq/chat",
    TEST: "/api/v1/groq/test-api",
  },
  STATS: {
    GET: "/api/v1/stats/stats",
  },
};

export const FIELDS_OF_INTEREST = {
  COMPUTER_SCIENCE: "Computer Science",
  MEDICAL: "Medical",
  ENGINEERING: "Engineering",
};

export const FIELD_TYPES = [
  "Computer Science",
  "Medical",
  "Engineering",
  "Business",
  "Arts",
  "Social Sciences",
  "Law",
  "Agriculture",
];

export const UNIVERSITY_SECTORS = {
  PRIVATE: "Private",
  PUBLIC: "Public",
  SEMI_GOVERNMENT: "Semi-Government",
};

export const ELIGIBILITY_TIERS = {
  SAFETY: "Safety",
  TARGET: "Target",
  REACH: "Reach",
  NOT_ELIGIBLE: "Not Eligible",
  UNKNOWN: "Unknown",
};

export const TIER_COLORS = {
  Safety: "green",
  Target: "yellow",
  Reach: "orange",
  "Not Eligible": "red",
  Unknown: "gray",
};

export default {
  API_ENDPOINTS,
  FIELDS_OF_INTEREST,
  FIELD_TYPES,
  UNIVERSITY_SECTORS,
  ELIGIBILITY_TIERS,
  TIER_COLORS,
};
