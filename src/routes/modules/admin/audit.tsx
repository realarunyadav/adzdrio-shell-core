import { createFileRoute } from "@tanstack/react-router";
import { AdminAuditCenter } from "@/components/admin-studio/AdminAuditCenter";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/modules/admin/audit")({
  component: () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <PageHeader
          title="Audit Center"
          description="Immutable record of administrative actions, configuration changes, and system access logs."
        />
        <div className="flex items-center gap-3">
          <div className="relative w-64 hidden xl:block">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search logs..." className="pl-9 h-9 text-xs bg-accent/10 border-border/40" />
          </div>
          <Button variant="outline" size="sm" className="h-9 text-[10px] font-black uppercase tracking-widest gap-2 border-border/40">
            <Filter className="size-3.5" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-[10px] font-black uppercase tracking-widest gap-2 border-border/40">
            <Download className="size-3.5" /> Export CSV
          </Button>
        </div>
      </div>
      <AdminAuditCenter />
    </div>
  ),
});
