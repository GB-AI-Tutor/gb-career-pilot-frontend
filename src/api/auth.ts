// src/api/auth.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  fsc_percentage?: number;
  city?: string;
  field_of_interest?: string;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  fsc_percentage?: number;
  city?: string;
  field_of_interest?: string;
}

class AuthApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public detail?: string,
  ) {
    super(message);
    this.name = "AuthApiError";
  }
}

async function fetchAuth<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new AuthApiError(
        response.status,
        data.detail || "Authentication failed",
        data.detail,
      );
    }

    return data;
  } catch (error) {
    if (error instanceof AuthApiError) {
      throw error;
    }
    throw new AuthApiError(500, "Network error occurred");
  }
}

export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    return fetchAuth<LoginResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Login user
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    return fetchAuth<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Get current user profile
   */
  getProfile: async (token: string): Promise<User> => {
    return fetchAuth<User>("/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Update user profile
   */
  updateProfile: async (
    token: string,
    data: Partial<Omit<User, "id" | "email" | "created_at">>,
  ): Promise<User> => {
    return fetchAuth<User>("/api/auth/me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },

  /**
   * Logout user
   */
  logout: async (token: string): Promise<void> => {
    return fetchAuth<void>("/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export { AuthApiError };
