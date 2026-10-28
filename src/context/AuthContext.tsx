import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../lib/types';

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = 'nft_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    if (!email.includes('@')) return false;
    const u: User = { id: 'u1', name: email.split('@')[0], username: email.split('@')[0], email };
    setUser(u);
    return true;
  };

  const register = async (username: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    if (!email.includes('@') || username.length < 3) return false;
    const u: User = { id: 'u2', name: username, username, email };
    setUser(u);
    return true;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}