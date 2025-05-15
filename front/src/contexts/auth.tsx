import { logoutCall, type UserRole } from "@/api/auth";
import { createContext, useCallback, useContext, useState } from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  setAuth: (user: UserRole) => void;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
  user: UserRole | null;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = useCallback(async () => {
    await logoutCall();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const setAuth = useCallback((user: UserRole) => {
    setUser(user);
  }, []);

  const setAuthenticated = useCallback((authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setAuth, setAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
