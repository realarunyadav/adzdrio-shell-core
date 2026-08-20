import type { RoleDefinition } from "./types";

/**
 * Role catalogue. Pure configuration — feature code never hardcodes roles.
 * Aligned with Production Backend Role Model.
 */
export const roleDefinitions: RoleDefinition[] = [
  {
    id: "OWNER",
    name: "OWNER",
    description: "Highest authority. Full platform and organization ownership.",
    permissions: ["*"],
    rank: 110,
  },
  {
    id: "ADMIN",
    name: "ADMIN",
    description: "Full enterprise administrative control.",
    permissions: ["*"],
    rank: 100,
  },
  {
    id: "MANAGER",
    name: "MANAGER",
    description: "Departmental leadership and resource management.",
    permissions: ["platform.dashboard.view", "platform.reports.view", "*.view", "*.approve"],
    rank: 80,
  },
  {
    id: "SALES",
    name: "SALES",
    description: "Revenue generation and customer acquisition focus.",
    permissions: ["platform.dashboard.view", "operations.crm.*", "operations.renewals.*"],
    rank: 60,
  },
  {
    id: "SUPPORT",
    name: "SUPPORT",
    description: "Customer service and service level compliance.",
    permissions: ["platform.dashboard.view", "operations.support.*", "operations.activation.view"],
    rank: 40,
  },
  {
    id: "VIEWER",
    name: "VIEWER",
    description: "Read-only enterprise visibility.",
    permissions: ["platform.dashboard.view", "*.view"],
    rank: 20,
  },
];

export const roleMap: Record<string, RoleDefinition> = Object.fromEntries(
  roleDefinitions.map((role) => [role.id, role]),
);