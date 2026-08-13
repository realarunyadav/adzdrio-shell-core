import { createFileRoute } from "@tanstack/react-router";
import { WorkflowBuilder } from "@/components/admin-studio/WorkflowBuilder";
import { PageHeader } from "@/components/shared/PageHeader";

export const Route = createFileRoute("/modules/admin/workflows")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="Workflow Automation"
        description="Visual orchestrator for cross-module business logic and automated triggers."
      />
      <WorkflowBuilder />
    </div>
  ),
});
