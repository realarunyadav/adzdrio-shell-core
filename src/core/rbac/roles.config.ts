import type { RoleDefinition } from "./types";

/**
 * Role catalogue. Pure configuration — feature code never hardcodes roles.
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
    permissions: ["platform.settings.*", "platform.modules.*", "platform.security.view", "platform.audit.view", "platform.users.manage", "platform.roles.manage"],
    inherits: ["manager"],
    rank: 80,
  },
  {
    id: "security_officer",
    name: "Security Officer",
    description: "Specialized role for monitoring security events and identity management.",
    permissions: ["platform.security.*", "platform.audit.*", "platform.users.view", "platform.roles.view"],
    rank: 75,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Oversees teams and approves operational work.",
    permissions: ["platform.dashboard.view", "platform.reports.view", "*.view", "*.approve"],
    inherits: ["member"],
    rank: 60,
  },
  {
    id: "member",
    name: "Member",
    description: "Standard employee access to assigned modules.",
    permissions: ["platform.dashboard.view", "*.view", "*.create", "*.edit"],
    rank: 40,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only visibility with no write capability.",
    permissions: ["platform.dashboard.view", "*.view"],
    rank: 20,
  },
];

export const roleMap: Record<string, RoleDefinition> = Object.fromEntries(
  roleDefinitions.map((role) => [role.id, role]),
);
