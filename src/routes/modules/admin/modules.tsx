import { createFileRoute } from "@tanstack/react-router";
import { ModuleManagement } from "@/components/admin-studio/ModuleManagement";
import { PageHeader } from "@/components/shared/PageHeader";

export const Route = createFileRoute("/modules/admin/modules")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="Module Management"
        description="Enable, disable, and configure visibility for enterprise-wide business modules."
      />
      <ModuleManagement />
    </div>
  ),
});
