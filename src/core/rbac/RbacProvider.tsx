import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { checkPermission, resolvePermissions } from "./permissions";
import { defaultPrincipal } from "./roles.config";
import type { Permission, PrincipalIdentity, RbacContextValue, RoleId } from "./types";

const RbacContext = createContext<RbacContextValue | null>(null);

export function RbacProvider({
  children,
  principal: initialPrincipal = defaultPrincipal,
}: {
  children: ReactNode;
  principal?: PrincipalIdentity | null;
}) {
  const [principal, setPrincipal] = useState<PrincipalIdentity | null>(initialPrincipal);

  const roles = useMemo(() => principal?.roles ?? [], [principal]);
  const permissions = useMemo(() => resolvePermissions(roles), [roles]);

  const can = useCallback(
    (required: Permission | Permission[], mode: "all" | "any" = "all") => {
      const list = Array.isArray(required) ? required : [required];
      if (list.length === 0) return true;
      return mode === "all"
        ? list.every((item) => checkPermission(permissions, item))
        : list.some((item) => checkPermission(permissions, item));
    },
    [permissions],
  );

  const hasRole = useCallback(
    (role: RoleId | RoleId[]) => {
      const list = Array.isArray(role) ? role : [role];
      return list.some((item) => roles.includes(item));
    },
    [roles],
  );

  const setRoles = useCallback((next: RoleId[]) => {
    setPrincipal((current) => (current ? { ...current, roles: next } : current));
  }, []);

  const value = useMemo<RbacContextValue>(
    () => ({ principal, roles, permissions, can, hasRole, setRoles }),
    [principal, roles, permissions, can, hasRole, setRoles],
  );

  return <RbacContext.Provider value={value}>{children}</RbacContext.Provider>;
}

export function useRbac(): RbacContextValue {
  const context = useContext(RbacContext);
  if (!context) throw new Error("useRbac must be used within <RbacProvider>.");
  return context;
}