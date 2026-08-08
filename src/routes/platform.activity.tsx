import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { UniversalActivityCenter } from "@/components/activity/UniversalActivityCenter";
import { Button } from "@/components/ui/button";
import { History, Download, Filter } from "lucide-react";

export const Route = createFileRoute("/platform/activity")({
  head: () => ({
    meta: [
      { title: "Universal Activity Center — ABOS" },
      {
        name: "description",
        content: "Immutable audit trail and operational activity stream across the ABOS enterprise shell.",
      },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-700">
      <PageHeader
        eyebrow="Platform Services"
        title="Universal Activity Center"
        description="Unified audit trail for all business events, configuration changes, and record interactions."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface h-9">
              <Download className="mr-2 size-4" />
              Download Audit Report
            </Button>
            <Button size="sm" className="shadow-elevated h-9">
              <History className="mr-2 size-4" />
              Real-time Feed
            </Button>
          </div>
        }
      />

      <UniversalActivityCenter />
    </div>
  );
}
