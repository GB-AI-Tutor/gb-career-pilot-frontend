// src/services/api.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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

  return response.json();
}

// Example API functions
export const api = {
  // Health check
  health: () => fetchApi<{ status: string }>("/health"),

  // Universities
  getUniversities: () => fetchApi<any[]>("/api/universities"),

  getUniversityById: (id: string) => fetchApi<any>(`/api/universities/${id}`),

  searchUniversities: (params: {
    field?: string;
    city?: string;
    budget?: number;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    ).toString();

    return fetchApi<any[]>(`/api/universities/search?${queryString}`);
  },

  // Add more API functions as you build features
};

export { ApiError };
