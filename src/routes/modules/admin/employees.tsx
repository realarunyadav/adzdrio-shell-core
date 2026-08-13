import { createFileRoute } from "@tanstack/react-router";
import { EmployeeDirectory } from "@/components/admin-studio/EmployeeDirectory";
import { PageHeader } from "@/components/shared/PageHeader";

export const Route = createFileRoute("/modules/admin/employees")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="People & Directory"
        description="Manage employee profiles, access levels, and organizational structure."
      />
      <EmployeeDirectory />
    </div>
  ),
});
