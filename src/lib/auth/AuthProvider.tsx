import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/lib/api/services';

export interface User {
  id: string;
  displayName: string;
  email: string;
  role: string;
  permissions: string[];
  organizationScope?: string;
  brandScope?: string;
  departmentScope?: string;
  teamScope?: string;
}

interface AuthContextType {
  user: User | null;
  status: 'loading' | 'authenticated' | 'unauthenticated' | 'connection_error';
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated' | 'connection_error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await authService.getCurrentSession();
      if (session?.user) {
        setUser(session.user);
        setStatus('authenticated');
      } else {
        setStatus('unauthenticated');
      }
    } catch (err: any) {
      if (err.status === 0 || err.status >= 500) {
        setStatus('connection_error');
      } else {
        setStatus('unauthenticated');
      }
      setUser(null);
    }
  };

  const login = async (credentials: any) => {
    try {
      setError(null);
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('abos_auth_token', token);
      setUser(user);
      setStatus('authenticated');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      localStorage.removeItem('abos_auth_token');
      setUser(null);
      setStatus('unauthenticated');
    }
  };

  return (
    <AuthContext.Provider value={{ user, status, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
