// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import {
  getToken,
  getUser,
  setToken,
  setUser,
  clearAuth,
} from "../utils/storage";
import authApi from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  // Khi reload page → lấy user từ backend
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const res = await authApi.me();
          setUser(res);
          setUserState(res);
        } catch (err) {
          clearAuth();
          setUserState(null);
          setTokenState(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (data) => {
    const res = await authApi.login(data);
    setToken(res.token);
    setTokenState(res.token);
    setUser(res.user);
    setUserState(res.user);
    return res;
  };

  const logout = async () => {
    await authApi.logout();
    clearAuth();
    setUserState(null);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
