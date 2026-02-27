"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  errors?: { field: string; message: string }[];
}

interface UserContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const UserContext = createContext<UserContextValue | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TOKEN_KEY = "freedom_token";
const USER_KEY = "freedom_user";

// ─── Provider ─────────────────────────────────────────────────────────────────
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // ── login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: AuthResponse = await res.json();

      if (data.success && data.token && data.user) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        router.push("/courses");
      }

      return data;
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  }, [router]);

  // ── register ───────────────────────────────────────────────────────────────
  const register = useCallback(async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data: AuthResponse = await res.json();

      if (data.success && data.token && data.user) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        router.push("/courses");
      }

      return data;
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  }, [router]);

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setToken(null);
    router.push("/login");
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}
