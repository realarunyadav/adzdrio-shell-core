import type { ReactNode } from "react";

import { useRbac } from "./RbacProvider";
import type { Permission, RoleId } from "./types";

export interface PermissionGateProps {
  permission?: Permission | Permission[];
  role?: RoleId | RoleId[];
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

  const permitted = (!permission || can(permission, mode)) && (!role || hasRole(role));

  return <>{permitted ? children : fallback}</>;
}