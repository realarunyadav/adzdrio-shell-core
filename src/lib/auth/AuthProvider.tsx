import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      } catch (e: any) {
        // Fall back to Supabase session check if legacy API fails or is not configured
        console.warn('Legacy API session check failed, attempting Supabase verification', e);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          const { data: employee } = await supabase
            .from('employees')
            .select('*')
            .eq('profile_id', session.user.id)
            .single();
            
          if (profile) {
            response = {
              user: {
                id: session.user.id,
                displayName: profile.display_name || session.user.email?.split('@')[0] || 'User',
                email: session.user.email || profile.email || '',
                role: (profile.metadata as any)?.role || 'VIEWER',
                roles: [(profile.metadata as any)?.role || 'VIEWER'],
                permissions: [],
                organizationId: employee?.organization_id,
                organizationScope: employee?.organization_id,
              }
            };
          } else {
            throw e; // Rethrow if no profile found either
          }
        } else {
          throw e; // Rethrow original error if no Supabase session
        }
      }
      
      const userData = response?.user ?? response;
      setUser(mapBackendUser(userData));
      setStatus('authenticated');
      setError(null);
    } catch (err: any) {
      console.error('Session validation failed:', err);
      localStorage.removeItem('abos_auth_token');
      setUser(null);
      setStatus('unauthenticated');
      setError(err.message || null);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setError(null);
      let response;
      try {
        response = await authService.login(credentials);
      } catch (e: any) {
        console.warn('Legacy API login failed, attempting Supabase Auth', e);
        const { data, error: sbError } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (sbError) throw sbError;
        if (!data.session) throw new Error('Authentication failed');

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();

        const { data: employee } = await supabase
          .from('employees')
          .select('*')
          .eq('profile_id', data.session.user.id)
          .single();

        response = {
          accessToken: data.session.access_token,
          user: {
            id: data.session.user.id,
            displayName: profile?.display_name || data.session.user.email?.split('@')[0] || 'User',
            email: data.session.user.email || profile?.email || '',
            role: (profile?.metadata as any)?.role || 'VIEWER',
            roles: [(profile?.metadata as any)?.role || 'VIEWER'],
            permissions: [],
            organizationId: employee?.organization_id,
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
