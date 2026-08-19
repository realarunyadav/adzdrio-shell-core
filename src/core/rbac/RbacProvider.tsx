import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/lib/auth/AuthProvider';

interface RbacContextType {
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string | string[]) => boolean;
  isAdmin: boolean;
  // Compatibility with existing components
  can: (permission: string, mode?: "all" | "any") => boolean;
  principal: any;
  roles: string[];
}

const RbacContext = createContext<RbacContextType | undefined>(undefined);

export function RbacProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.roles.includes('ADMIN')) return true;
    return user.permissions.includes(permission);
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    const upperRoles = roles.map(r => r.toUpperCase());
    return user.roles.some(userRole => upperRoles.includes(userRole.toUpperCase()));
  };

  const can = (permission: string, mode: "all" | "any" = "all"): boolean => {
    const permissions = Array.isArray(permission) ? permission : [permission];
    if (mode === "any") return permissions.some(hasPermission);
    return permissions.every(hasPermission);
  };

  const isAdmin = hasRole(['OWNER', 'ADMIN']);
  const isOwner = hasRole('OWNER');

  return (
    <RbacContext.Provider 
      value={{ 
        hasPermission, 
        hasRole, 
        isAdmin, 
        can, 
        principal: user,
        roles: user?.roles ?? []
      }}
    >
      {children}
    </RbacContext.Provider>
  );
}

export function useRbac() {
  const context = useContext(RbacContext);
  if (context === undefined) {
    throw new Error('useRbac must be used within an RbacProvider');
  }
  return context;
}

// Permission Constants aligned with Backend
export const PERMISSIONS = {
  LEADS_READ: 'leads:read',
  LEADS_WRITE: 'leads:write',
  LEADS_DELETE: 'leads:delete',
  LEADS_ASSIGN: 'leads:assign',
  LEADS_IMPORT: 'leads:import',
  CRM_READ: 'crm:read',
  CRM_WRITE: 'crm:write',
  USERS_WRITE: 'users:write',
};