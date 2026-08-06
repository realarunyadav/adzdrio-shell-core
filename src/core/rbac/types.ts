/**
 * RBAC foundation — frontend only.
 * No authentication, no backend. This layer defines the contracts the future
 * auth/session provider will satisfy.
 */

/** Roles are configuration, never hardcoded inside features. */
export type RoleId = string;

/**
 * Permission key format: `<module>.<resource>.<action>`
 * Wildcards are allowed in grants only: `crm.*`, `*`, `hrms.employee.*`
 */
export type Permission = string;

export interface RoleDefinition {
  id: RoleId;
  name: string;
  description: string;
  /** Permission grants, wildcards allowed. */
  permissions: Permission[];
  /** Roles whose grants are inherited. */
  inherits?: RoleId[];
  /** Higher rank = more authority. Used for UI ordering only. */
  rank: number;
}

export interface PrincipalIdentity {
  id: string;
  displayName: string;
  email: string;
  roles: RoleId[];
  tenantId: string;
}

export interface RbacContextValue {
  principal: PrincipalIdentity | null;
  roles: RoleId[];
  permissions: Permission[];
  can: (permission: Permission | Permission[], mode?: "all" | "any") => boolean;
  hasRole: (role: RoleId | RoleId[]) => boolean;
  /** Development affordance: swap the active principal's roles. */
  setRoles: (roles: RoleId[]) => void;
}