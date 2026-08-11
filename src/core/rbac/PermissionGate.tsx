import type { ReactNode } from "react";

import { useRbac } from "./RbacProvider";

export interface PermissionGateProps {
  permission?: string | string[];
  role?: string | string[];
  /** How multiple permissions are evaluated. */
  mode?: "all" | "any";
  fallback?: ReactNode;
  children: ReactNode;
}

/** Renders children only when the current principal is authorised. */
export function PermissionGate({
  permission,
  role,
  mode = "all",
  fallback = null,
  children,
}: PermissionGateProps) {
  const { can, hasRole } = useRbac();

  const permitted = (!permission || can(permission as any, mode)) && (!role || hasRole(role));

  return <>{permitted ? children : fallback}</>;
}