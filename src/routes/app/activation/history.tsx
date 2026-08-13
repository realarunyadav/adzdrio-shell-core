import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  History, 
  Search, 
  Download, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  ArrowUpRight,
  User,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/SectionCard";
import { 
  demoActivations, 
  DemoActivation 
} from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/activation/history")({
  component: ActivationHistoryPage,
});

function ActivationHistoryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const completedActivations = demoActivations.filter(act => 
    (act.status === 'Completed' || act.status === 'Cancelled' || act.status === 'Failed') &&
    (act.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     act.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Operations Audit"
        title="Activation History"
        description="Comprehensive audit log of all completed, failed, and cancelled provisioning workflows."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Audit Logs
            </Button>
            <Button size="sm" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Custom Range
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search history by ID, customer..." 
              className="pl-10 h-10 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
             <Button variant="outline" size="sm" className="h-10 px-4 text-[10px] font-black uppercase">
               <Filter className="mr-2 size-3.5" />
               Filters
             </Button>
             <Separator orientation="vertical" className="h-6 hidden sm:block" />
             <div className="flex items-center gap-1">
               <span className="text-[10px] font-black uppercase text-muted-foreground mr-2">Quick Stats:</span>
               <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[9px] font-black uppercase">98.2% Success Rate</Badge>
             </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Completion Date</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Activation ID</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer & Plan</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Final Status</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Provisioner</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Duration</th>
                  <th className="py-4 px-6 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {completedActivations.map((act) => (
                  <tr key={act.id} className="hover:bg-muted/30 transition-colors group cursor-pointer">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{new Date(act.completedAt || act.lastUpdatedAt).toLocaleDateString()}</span>
                        <span className="text-[9px] text-muted-foreground font-black uppercase">
                          {new Date(act.completedAt || act.lastUpdatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-black uppercase text-primary">{act.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-none mb-1">{act.customerName}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase">{act.planName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-[9px] font-black uppercase border-none px-2 py-0.5",
                          act.status === 'Completed' ? "bg-green-50 text-green-700" : 
                          act.status === 'Failed' ? "bg-red-50 text-red-700" : "bg-muted text-muted-foreground"
                        )}
                      >
                        {act.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <User className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-bold uppercase">{act.assignedToName || 'System'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Clock className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-black">2.4 Days</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase">
                        <ShieldCheck className="mr-2 size-3.5" />
                        Audit
                      </Button>
                    </td>
                  </tr>
                ))}
                {completedActivations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center">
                        <History className="size-12 text-muted-foreground opacity-20 mb-4" />
                        <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">No historical records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical", className?: string }) {
  return (
    <div className={cn(
      "bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full",
      className
    )} />
  );
}