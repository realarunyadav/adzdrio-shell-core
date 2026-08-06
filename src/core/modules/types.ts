import type { LucideIcon } from "lucide-react";

import type { Permission } from "@/core/rbac/types";

export type ModuleStatus = "available" | "planned" | "beta" | "disabled";

export type ModuleGroupId = "operations" | "people" | "finance" | "intelligence" | "platform";

export interface ModuleGroup {
  id: ModuleGroupId;
  label: string;
  order: number;
}

export interface ModuleNavItem {
  id: string;
  label: string;
  /** Route path. Modules without routes yet resolve to the module placeholder. */
  path: string;
  icon?: LucideIcon;
  permission?: Permission;
  badge?: string;
}

export interface ModuleDefinition {
  /** Stable identifier, also used as the permission namespace. */
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  group: ModuleGroupId;
  order: number;
  status: ModuleStatus;
  /** Base route path for the module. */
  basePath: string;
  /** Permission required to see the module at all. */
  permission?: Permission;
  navigation?: ModuleNavItem[];
}