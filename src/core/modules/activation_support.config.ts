import { Rocket, LifeBuoy } from "lucide-react";
import { moduleRegistry } from "./registry";
import type { ModuleDefinition, ModuleGroup } from "./types";

// Update groups to include Operations group if needed, but 'operations' already exists.
// We'll add Activation and Support to 'operations'.

export const additionalModules: ModuleDefinition[] = [
  {
    id: "activation",
    name: "Activation",
    description: "Enterprise activation queue, SLA management and service onboarding.",
    icon: Rocket,
    group: "operations",
    order: 21,
    status: "available",
    basePath: "/modules/activation",
    permission: "operations.activation.view",
  },
  {
    id: "support",
    name: "Support",
    description: "Ticket management, internal notes and service level agreements.",
    icon: LifeBuoy,
    group: "operations",
    order: 22,
    status: "available",
    basePath: "/modules/support",
    permission: "operations.support.view",
  },
];

export function bootstrapNewModules(): void {
  moduleRegistry.registerAll(additionalModules);
}
