import { createFileRoute } from "@tanstack/react-router";
import { PolicyManager } from "@/components/admin-studio/PolicyManager";
import { PageHeader } from "@/components/shared/PageHeader";

export const Route = createFileRoute("/modules/admin/policies")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="Policy Governance"
        description="Enterprise legal framework, terms of service, and compliance versioning."
      />
      <PolicyManager />
    </div>
  ),
});
