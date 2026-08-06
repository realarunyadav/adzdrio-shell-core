import { roleMap } from "./roles.config";
import type { Permission, RoleId } from "./types";

/** Resolve the full permission set for a role list, following inheritance. */
export function resolvePermissions(roles: RoleId[]): Permission[] {
  const seenRoles = new Set<RoleId>();
  const permissions = new Set<Permission>();

  const walk = (roleId: RoleId) => {
    if (seenRoles.has(roleId)) return;
    seenRoles.add(roleId);
    const role = roleMap[roleId];
    if (!role) return;
    role.permissions.forEach((permission) => permissions.add(permission));
    role.inherits?.forEach(walk);
  };

  roles.forEach(walk);
  return Array.from(permissions);
}

/** Match a required permission against a wildcard-capable grant. */
export function grantMatches(grant: Permission, required: Permission): boolean {
  if (grant === "*" || grant === required) return true;
  const grantParts = grant.split(".");
  const requiredParts = required.split(".");

  for (let index = 0; index < grantParts.length; index += 1) {
    const part = grantParts[index];
    if (part === "*") return index === grantParts.length - 1 || requiredParts.length > index;
    if (part !== requiredParts[index]) return false;
  }

  return grantParts.length === requiredParts.length;
}

export function checkPermission(grants: Permission[], required: Permission): boolean {
  return grants.some((grant) => grantMatches(grant, required));
}