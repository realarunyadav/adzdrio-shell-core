import {
  Building,
  Calendar,
  Globe,
  Grid,
  Hash,
  Layout,
  MapPin,
  Palette,
  ShieldCheck,
  Users,
} from "lucide-react";

import { moduleRegistry } from "./registry";
import type { ModuleDefinition, ModuleGroup } from "./types";

export const moduleGroups: ModuleGroup[] = [
  { id: "platform", label: "Platform", order: 10 },
  { id: "operations", label: "Operations", order: 20 },
  { id: "people", label: "People", order: 30 },
  { id: "finance", label: "Finance", order: 40 },
  { id: "intelligence", label: "Intelligence", order: 50 },
];

export const modules: ModuleDefinition[] = [
  {
    id: "overview",
    name: "Overview",
    description: "Workspace entry point for the operating system.",
    icon: Layout,
    group: "platform",
    order: 10,
    status: "available",
    basePath: "/",
    permission: "platform.dashboard.view",
  },
  {
    id: "organization",
    name: "Organization",
    description: "Configure business foundation, hierarchy and branding.",
    icon: Building,
    group: "platform",
    order: 15,
    status: "available",
    basePath: "/modules/organization",
    permission: "platform.organization.view",
  },
  {
    id: "crm",
    name: "CRM",
    description: "Customer relationships, pipeline and revenue operations.",
    icon: Building,
    group: "operations",
    order: 20,
    status: "planned",
    basePath: "/modules/crm",
  },
  {
    id: "projects",
    name: "Projects",
    description: "Delivery planning, execution and resource allocation.",
    icon: Grid,
    group: "operations",
    order: 30,
    status: "planned",
    basePath: "/modules/projects",
  },
  {
    id: "inventory",
    name: "Inventory",
    description: "Stock, procurement and asset tracking.",
    icon: Grid,
    group: "operations",
    order: 40,
    status: "planned",
    basePath: "/modules/inventory",
  },
  {
    id: "hrms",
    name: "HRMS",
    description: "Employee lifecycle, attendance and performance.",
    icon: Users,
    group: "people",
    order: 50,
    status: "planned",
    basePath: "/modules/hrms",
  },
  {
    id: "finance",
    name: "Finance",
    description: "Accounting, invoicing and financial controls.",
    icon: ShieldCheck,
    group: "finance",
    order: 60,
    status: "planned",
    basePath: "/modules/finance",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Campaign planning, channels and attribution.",
    icon: Globe,
    group: "operations",
    order: 70,
    status: "planned",
    basePath: "/modules/marketing",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Cross-module reporting and business intelligence.",
    icon: Hash,
    group: "intelligence",
    order: 80,
    status: "planned",
    basePath: "/modules/analytics",
  },
  {
    id: "automation",
    name: "Automation",
    description: "Workflow orchestration and business rules.",
    icon: Calendar,
    group: "intelligence",
    order: 90,
    status: "planned",
    basePath: "/modules/automation",
  },
  {
    id: "ai",
    name: "AI Studio",
    description: "Assistants, agents and AI-native operations.",
    icon: Palette,
    group: "intelligence",
    order: 100,
    status: "planned",
    basePath: "/modules/ai",
  },
  {
    id: "settings",
    name: "Settings",
    description: "Organisation configuration, roles and module control.",
    icon: Palette,
    group: "platform",
    order: 110,
    status: "available",
    basePath: "/settings",
    permission: "platform.settings.view",
  },
];

let bootstrapped = false;

export function bootstrapModules(): void {
  if (bootstrapped) return;
  bootstrapped = true;
  moduleRegistry.registerGroups(moduleGroups);
  moduleRegistry.registerAll(modules);
}
