import React, { createContext, useState } from 'react';
import * as authApi from '../api/authApi';
import { setToken, removeToken } from '../services/storage';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      const bearerToken=res.data;
      const token =bearerToken.split(' ')[1];
      const decoded = jwtDecode(token);
      console.log('Decoded JWT:', decoded);

      await setToken(token);
      setUserId(decoded.sub);
      setRole(decoded.role); // DRIVER or PASSENGER
    } finally {
      console.log({userId,role})
      setLoading(false);
    }
  };

  const register = async ({ payload, as }) => {
    const fn = as === 'driver'
      ? authApi.registerDriver
      : authApi.registerPassenger;

    await fn(payload);
    await login({ email: payload.email, password: payload.password });
    console.log('Registered and logged in as', as);
  };

  const logout = async () => {
    await removeToken();
    setUserId(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{
      userId,
      role,
      loading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
