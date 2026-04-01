export const USE_MOCK_API = true; // flip to false in production

export const API_BASE_URL = USE_MOCK_API
  ? null
  : "https://your-production-domain.com/api/v1";
