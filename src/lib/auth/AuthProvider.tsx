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

    // Listen for global unauthorized events from ApiClient
    const handleUnauthorized = () => {
      setUser(null);
      setStatus('unauthenticated');
    };

    window.addEventListener('abos:auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('abos:auth:unauthorized', handleUnauthorized);
  }, []);

  const checkSession = async () => {
    const token = localStorage.getItem('abos_auth_token');
    if (!token) {
      setStatus('unauthenticated');
      return;
    }

    try {
      const userData = await authService.getCurrentSession();
      // Map backend user to frontend User type
      const mappedUser: User = {
        id: userData.id || userData.sub,
        displayName: userData.displayName || userData.name || userData.username,
        email: userData.email,
        role: userData.role,
        permissions: userData.permissions || [],
      };
      setUser(mappedUser);
      setStatus('authenticated');
    } catch (err: any) {
      if (err.status === 401) {
        localStorage.removeItem('abos_auth_token');
        setStatus('unauthenticated');
      } else if (err.status === 0 || err.status >= 500) {
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
      const response = await authService.login(credentials);
      // Response expected: { accessToken, user, ... } or per requirement 5
      const token = response.accessToken;
      const userData = response.user;

      localStorage.setItem('abos_auth_token', token);
      
      const mappedUser: User = {
        id: userData.id || userData.sub,
        displayName: userData.displayName || userData.name || userData.username,
        email: userData.email,
        role: userData.role,
        permissions: userData.permissions || [],
      };

      setUser(mappedUser);
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
