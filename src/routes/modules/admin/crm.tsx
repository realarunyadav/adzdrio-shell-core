import { createFileRoute } from "@tanstack/react-router";
import { CRMBuilder } from "@/components/admin-studio/CRMBuilder";
import { PageHeader } from "@/components/shared/PageHeader";

export const Route = createFileRoute("/modules/admin/crm")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="CRM Configuration"
        description="Architect customer data structures, lead lifecycles, and custom field logic."
      />
      <CRMBuilder />
    </div>
  ),
});