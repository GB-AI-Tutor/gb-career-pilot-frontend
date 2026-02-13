// src/services/api.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Define the shape of a University object
export interface University {
  id: string;
  name: string;
  city: string;
  fee_per_semester: number;
  min_marks: number;
  field: string;
  admission_deadline?: string;
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

export const api = {
  health: () => fetchApi<{ status: string }>("/health"),

  // FIX: Use the University interface instead of 'any'
  getUniversities: () => fetchApi<University[]>("/api/universities"),

  getUniversityById: (id: string) => fetchApi<University>(`/api/universities/${id}`),

  searchUniversities: (params: {
    field?: string;
    city?: string;
    budget?: number;
  }) => {
    // FIX: Removed the unused '_' and just used the value 'v'
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined) // Empty first slot skips the key
        .map(([k, v]) => [k, String(v)]),
    ).toString();

    return fetchApi<University[]>(`/api/universities/search?${queryString}`);
  },
};

export { ApiError };