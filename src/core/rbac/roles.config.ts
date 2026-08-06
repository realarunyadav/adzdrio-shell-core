import type { PrincipalIdentity, RoleDefinition } from "./types";

/**
 * Role catalogue. Purely configuration — add roles here, never in features.
 */
export const roleDefinitions: RoleDefinition[] = [
  {
    id: "super_admin",
    name: "Super Administrator",
    description: "Unrestricted access to every module and configuration surface.",
    permissions: ["*"],
    rank: 100,
  },
  {
    id: "admin",
    name: "Administrator",
    description: "Manages organisation-wide settings and all operational modules.",
    permissions: ["platform.settings.*", "platform.modules.view"],
    inherits: ["manager"],
    rank: 80,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Oversees teams and approves operational work.",
    permissions: ["platform.dashboard.view", "platform.reports.view"],
    inherits: ["member"],
    rank: 60,
  },
  {
    id: "member",
    name: "Member",
    description: "Standard employee access to assigned modules.",
    permissions: ["platform.dashboard.view"],
    rank: 40,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only visibility with no write capability.",
    permissions: ["platform.dashboard.view"],
    rank: 20,
  },
];

export const roleMap: Record<string, RoleDefinition> = Object.fromEntries(
  roleDefinitions.map((role) => [role.id, role]),
);

/**
 * Placeholder principal used until an authentication provider is wired in.
 * Replace the source of this value, not its shape.
 */
export const defaultPrincipal: PrincipalIdentity = {
  id: "local-principal",
  displayName: "Adzdrio User",
  email: "user@adzdrio.com",
  roles: ["super_admin"],
  tenantId: "adzdrio",
};