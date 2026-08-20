import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { authService } from '@/lib/api/services';

export interface User {
  id: string;
  displayName: string;
  email: string;
  role: string;
  roles: string[];
  permissions: string[];
  organizationId?: string | null;
  organizationScope?: string | null;
  brandScope?: string | null;
  departmentScope?: string | null;
  teamScope?: string | null;
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
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

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
    
    const timeoutId = setTimeout(() => {
      if (status === 'loading') {
        console.warn('Authentication initialization timed out, falling back to unauthenticated');
        setStatus('unauthenticated');
      }
    }, 5000);

    if (!token) {
      clearTimeout(timeoutId);
      setStatus('unauthenticated');
      return;
    }

    try {
      let resolvedUser: User | null = null;
      
      // 1. Supabase Session Check
      const { data: { session }, error: sbError } = await supabase.auth.getSession();
      
      if (sbError) throw sbError;
      
      if (session?.user) {
        const userId = session.user.id;
        
        // 2. Fetch User Roles from public.user_roles
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);
          
        if (rolesError) {
          console.error('Error fetching user roles:', rolesError);
        }

        const roles = userRoles?.map(r => r.role.toUpperCase()) || [];
        
        // 3. Fetch Profile and Employee Context
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        const { data: employee } = await supabase
          .from('employees')
          .select('*')
          .eq('profile_id', userId)
          .single();
          
        if (profile) {
          resolvedUser = {
            id: userId,
            displayName: profile.display_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || profile.email || '',
            role: roles[0] || 'VIEWER',
            roles: roles.length > 0 ? roles : ['VIEWER'],
            permissions: [],
            organizationId: employee?.organization_id || null,
            organizationScope: employee?.organization_id || null,
          };
        } else {
          console.error('No profile found for Supabase user:', userId);
          throw new Error('User profile not found');
        }
      } else {
        // Fallback to legacy API if no Supabase session and base URL exists
        const baseUrl = (import.meta as any).env['VITE_API_BASE_URL'];
        if (baseUrl && token.length < 500) {
          const response = await authService.getCurrentSession();
          const userData = response?.user ?? response;
          resolvedUser = mapBackendUser(userData);
        } else {
          throw new Error('No active session found');
        }
      }
      
      if (resolvedUser) {
        setUser(resolvedUser);
        setStatus('authenticated');
        setError(null);
      } else {
        throw new Error('Failed to resolve user');
      }
    } catch (err: any) {
      console.error('Session validation failed:', err);
      localStorage.removeItem('abos_auth_token');
      setUser(null);
      setStatus('unauthenticated');
      setError(err.message || null);
    } finally {
      clearTimeout(timeoutId);
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

        const { data: userRoles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.session.user.id);

        const roles = userRoles?.map(r => r.role.toUpperCase()) || [];

        response = {
          accessToken: data.session.access_token,
          user: {
            id: data.session.user.id,
            displayName: profile?.display_name || data.session.user.email?.split('@')[0] || 'User',
            email: data.session.user.email || profile?.email || '',
            role: roles[0] || 'VIEWER',
            roles: roles.length > 0 ? roles : ['VIEWER'],
            permissions: [],
            organizationId: employee?.organization_id || null,
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
