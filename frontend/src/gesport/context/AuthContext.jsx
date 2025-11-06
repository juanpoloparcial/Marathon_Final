"use client";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(undefined);

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const t = typeof window !== 'undefined' ? window.localStorage.getItem('auth_token') : null;
      const u = typeof window !== 'undefined' ? window.localStorage.getItem('auth_user') : null;
      if (t) setToken(t);
      if (u) setUser(JSON.parse(u));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (token) window.localStorage.setItem('auth_token', token); else window.localStorage.removeItem('auth_token');
        if (user) window.localStorage.setItem('auth_user', JSON.stringify(user)); else window.localStorage.removeItem('auth_user');
      }
    } catch {}
  }, [token, user]);

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Login failed');
    setToken(json.token);
    setUser(json.user);
    return json.user;
  };

  const register = async (payload) => {
    const res = await fetch(`${API}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Register failed');
    return json;
  };

  const logout = () => { setToken(null); setUser(null); };

  const value = useMemo(() => ({ token, user, role: user?.role || 'visitor', isAuthenticated: !!token, login, register, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
