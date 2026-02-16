// src/contexts/AuthContextInstance.ts
import { createContext } from "react";

interface AuthContextType {
  user?: { id: string; email: string } | null;
  isAuthenticated: boolean;
  login?: (email: string, password: string) => Promise<void>;
  logout?: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
