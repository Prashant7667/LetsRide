import React, { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/authApi';
import { setToken, getToken, removeToken } from '../services/storage';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const bootstrap = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      const profile = await authApi.getProfile();
      setUser(profile.data);
      setRole(profile.data?.role || null);
    } catch (e) {
      await removeToken();
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bootstrap();
  }, []);

  const login = async ({ email, password, as }) => {
    const fn = authApi.login;
    const res = await fn({ email, password });
    const token = res.data?.token;
    if (!token) throw new Error('Invalid login response');
    await setToken(token);
    const profile = await authApi.getProfile();
    setUser(profile.data);
    setRole(as);
    return profile.data;
  };

  const register = async ({ payload, as }) => {
    const fn = as === 'driver' ? authApi.registerDriver : authApi.registerPassenger;
    const res = await fn(payload);
    const token = res.data?.token;
    if (token) await setToken(token);
    if (token) {
      const profile = await authApi.getProfile();
      setUser(profile.data);
      setRole(as);
      return profile.data;
    }
    return res.data;
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      loading,
      setUser,
      setRole,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
