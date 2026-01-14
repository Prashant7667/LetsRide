import React, { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/authApi';
import { setToken, removeToken, getToken } from '../services/storage';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserId(decoded.sub);
          setRole(decoded.role);
        } catch (e) {
          // Invalid token, remove it
          await removeToken();
        }
      }
    } catch (e) {
      console.error('Auth check failed:', e);
    } finally {
      setInitializing(false);
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      let token;
      
      // Handle both "Bearer token" and just "token" formats
      if (typeof res.data === 'string') {
        token = res.data.startsWith('Bearer ') ? res.data.split(' ')[1] : res.data;
      } else {
        token = res.data.token || res.data.accessToken;
      }
      
      if (!token) {
        throw new Error('No token received');
      }

      const decoded = jwtDecode(token);
      await setToken(token);
      setUserId(decoded.sub || decoded.userId || decoded.id);
      setRole(decoded.role);
      return { success: true };
    } catch (e) {
      console.error('Login error:', e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ payload, as }) => {
    setLoading(true);
    try {
      const fn = as === 'driver'
        ? authApi.registerDriver
        : authApi.registerPassenger;

      await fn(payload);
      console.log({payload});
      await login({ email: payload.email, password: payload.password });
      return { success: true };
    } catch (e) {
      console.error('Registration error:', e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await removeToken();
      setUserId(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      userId,
      role,
      loading: loading || initializing,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
