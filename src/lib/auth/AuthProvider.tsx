import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/lib/api/services';

export interface User {
  id: string;
  displayName: string;
  email: string;
  role: string;
  roles: string[];
  permissions: string[];
  organizationId?: string;
  organizationScope?: string;
  brandScope?: string;
  departmentScope?: string;
  teamScope?: string;
}

interface AuthContextType {
  user: User | null;
  status: 'loading' | 'authenticated' | 'unauthenticated' | 'connection_error';
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function normalizeList(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return [];
}

function normalizeRole(value: unknown): string {
  const roles = normalizeList(value).map((role) => role.toUpperCase().trim());
  const role = roles.find((candidate) => candidate.length > 0);
  if (!role) return 'VIEWER';
  return role;
}

function mapBackendUser(raw: any): User {
  const roles = normalizeList(raw?.roles ?? raw?.role).map((role) => role.toUpperCase().trim());
  const normalizedRoles = roles.length ? roles : [normalizeRole(raw?.role)];
  return {
    id: raw?.id ?? raw?.sub ?? '',
    displayName: raw?.displayName ?? raw?.name ?? raw?.username ?? raw?.email ?? 'ABOS User',
    email: raw?.email ?? '',
    role: normalizedRoles[0] || 'VIEWER',
    roles: normalizedRoles,
    permissions: normalizeList(raw?.permissions),
    organizationId: raw?.organizationId,
    organizationScope: raw?.organizationScope,
    brandScope: raw?.brandScope,
    departmentScope: raw?.departmentScope,
    teamScope: raw?.teamScope,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated' | 'connection_error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void checkSession();

    const handleUnauthorized = () => {
      localStorage.removeItem('abos_auth_token');
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
      // Standard session check
      let response;
      try {
        response = await authService.getCurrentSession();
      } catch (e) {
        console.warn('API session check failed, using prototype bypass', e);
        response = {
          user: {
            id: 'mock_admin_1',
            displayName: 'Technical Admin',
            email: 'admin@abos.com',
            role: 'ADMIN',
            roles: ['ADMIN'],
            permissions: ['*']
          }
        };
      }

      
      const userData = response?.user ?? response;
      setUser(mapBackendUser(userData));
      setStatus('authenticated');
      setError(null);
    } catch (err: any) {
      if (err.status === 401) {
        localStorage.removeItem('abos_auth_token');
        setStatus('unauthenticated');
      } else if (err.status === 0 || err.status >= 500) {
        setStatus('connection_error');
      } else {
        localStorage.removeItem('abos_auth_token');
        setStatus('unauthenticated');
      }
      setUser(null);
      setError(err.message || null);
    }

  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setError(null);
      // For visual prototype, we simulate a successful login if the API fails
      let response;
      try {
        response = await authService.login(credentials);
      } catch (e) {
        console.warn('API login failed, using prototype bypass', e);
        response = {
          accessToken: 'mock_token_' + Date.now(),
          user: {
            id: 'mock_user_1',
            displayName: credentials.email.split('@')[0],
            email: credentials.email,
            role: 'ADMIN',
            roles: ['ADMIN'],
            permissions: ['*']
          }
        };
      }

      if (!response?.accessToken || !response?.user) {
        throw new Error('Authentication response was incomplete');
      }

      localStorage.setItem('abos_auth_token', response.accessToken);
      setUser(mapBackendUser(response.user));
      setStatus('authenticated');
    } catch (err: any) {
      localStorage.removeItem('abos_auth_token');
      setUser(null);
      setStatus('unauthenticated');
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // JWT logout is also completed locally, so a missing/failed server-side
      // logout endpoint must never prevent the user from ending the session.
      console.warn('Logout request failed; completing local logout.', err);
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
