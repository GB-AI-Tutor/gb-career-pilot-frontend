// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

console.log("🔗 API URL:", API_URL);

export interface University {
  id: number;
  name: string;
  city: string;
  country: string;
  top_field: string;
  tuition_fee: number;
}

// ✅ FIX: Define response wrapper
interface ApiResponse<T> {
  data: T;
  count: number;
  limit?: number;
  offset?: number;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  console.log("📡 Fetching:", url);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("✅ Response:", data);
  return data;
}

export const api = {
  health: () => fetchApi<{ status: string }>("/health"),

  // ✅ FIX: Correct endpoint + unwrap response
  getUniversities: async () => {
    const response = await fetchApi<ApiResponse<University[]>>(
      "/api/universities", // ✅ Added /api prefix
    );
    return response.data; // ✅ Return just the array
  },

  getUniversityById: (id: string) =>
    fetchApi<University>(`/api/universities/${id}`),

  // ✅ FIX: Correct endpoint + unwrap response
  searchUniversities: async (params: {
    name?: string;
    city?: string;
    country?: string;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== "")
        .map(([k, v]) => [k, String(v)]),
    ).toString();

    const response = await fetchApi<ApiResponse<University[]>>(
      `/api/universities/search${queryString ? `?${queryString}` : ""}`,
    );

    return response.data; // ✅ Return just the array
  },

  pingSupabase: () =>
    fetchApi<{ status: string; message: string }>("/api/supabase-ping"),
};

export { ApiError };
