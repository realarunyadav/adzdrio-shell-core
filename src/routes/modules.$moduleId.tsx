import { createFileRoute, notFound } from "@tanstack/react-router";
import { PackageOpen } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { bootstrapModules } from "@/core/modules/modules.config";
import { moduleRegistry } from "@/core/modules/registry";

export const Route = createFileRoute("/modules/$moduleId")({
  head: () => ({
    meta: [
      { title: "Module workspace — ABOS" },
      {
        name: "description",
        content: "Registered ABOS module workspace awaiting its implementation.",
      },
      { property: "og:title", content: "Module workspace — ABOS" },
      {
        property: "og:description",
        content: "Registered ABOS module workspace awaiting its implementation.",
      },
    ],
  }),
  loader: ({ params }) => {
    bootstrapModules();
    if (!moduleRegistry.get(params.moduleId)) throw notFound();
  },
  component: ModuleWorkspace,
});

function ModuleWorkspace() {
  const { moduleId } = Route.useParams();
  bootstrapModules();
  const module = moduleRegistry.get(moduleId);

  if (!module) return null;

  return (
    <>
      <PageHeader
        eyebrow="Module"
        title={module.name}
        description={module.description}
        actions={<StatusBadge tone="warning">{module.status}</StatusBadge>}
      />
      <EmptyState
        icon={PackageOpen}
        title={`${module.name} is registered but not implemented`}
        description="The application shell resolves this module from the registry. Functionality will be added once architecture instructions are provided."
      />
    </>
  );
}