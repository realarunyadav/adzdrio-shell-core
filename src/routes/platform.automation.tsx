import { createFileRoute } from "@tanstack/react-router";
import { AutomationEngine } from "@/components/automation/AutomationEngine";
import { PageHeader } from "@/components/shared/PageHeader";
import { Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/platform/automation")({
  head: () => ({
    meta: [
      { title: "Automation & Workflow Engine | ABOS" },
      {
        name: "description",
        content: "Enterprise business process automation, workflow triggers, and execution monitoring.",
      },
    ],
  }),
  component: AutomationPlatformRoute,
});

function AutomationPlatformRoute() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <PageHeader
        eyebrow="Platform Services"
        title="Business Workflow Engine"
        description="Configure, test, and monitor automated business processes across the organization."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface h-9">
              <ShieldCheck className="mr-2 size-4" />
              Security Policies
            </Button>
            <Button size="sm" className="shadow-elevated h-9">
              <Zap className="mr-2 size-4" />
              New Automation
            </Button>
          </div>
        }
      />
      <AutomationEngine />
    </div>
  );
}
