import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Users, 
  MessageSquare,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { supportService } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/support/reports")({
  component: SupportReportsPage,
});

function SupportReportsPage() {
  const { data: ticketsData, isLoading } = useQuery({
    queryKey: ["support", "tickets", { pageSize: 1000 }],
    queryFn: () => supportService.listTickets({ pageSize: 1000 }),
  });

  const tickets = ticketsData?.items || [];
  
  // Calculate real metrics from live tickets
  const totalCount = tickets.length;
  const resolvedTickets = tickets.filter(t => t.status.toLowerCase() === 'resolved' || t.status.toLowerCase() === 'closed');
  const resolutionRate = totalCount > 0 ? (resolvedTickets.length / totalCount) * 100 : 0;
  const slaCompliance = totalCount > 0 ? (tickets.filter(t => t.sla_status === 'Healthy').length / totalCount) * 100 : 0;
  
  const priorityDistribution = {
    urgent: tickets.filter(t => t.priority.toLowerCase() === 'urgent').length,
    high: tickets.filter(t => t.priority.toLowerCase() === 'high').length,
    medium: tickets.filter(t => t.priority.toLowerCase() === 'medium').length,
    low: tickets.filter(t => t.priority.toLowerCase() === 'low').length,
  };

  const statusDistribution = {
    open: tickets.filter(t => t.status.toLowerCase() === 'open').length,
    in_progress: tickets.filter(t => t.status.toLowerCase() === 'in_progress').length,
    waiting: tickets.filter(t => t.status.toLowerCase() === 'waiting_on_customer').length,
    resolved: resolvedTickets.length,
  };

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Support Module"
        title="Support Reports & Analytics"
        description="Data-driven insights into support performance, team efficiency, and customer health."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SectionCard className="p-4 py-3 border-none bg-background shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <BarChart3 className="size-5" />
              </div>
              <TrendingUp className="size-4 text-green-500" />
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Tickets</p>
              <h3 className="text-2xl font-black mt-1 tracking-tighter">{totalCount}</h3>
            </div>
          </SectionCard>

          <SectionCard className="p-4 py-3 border-none bg-background shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 className="size-5" />
              </div>
              <span className="text-[10px] font-black text-green-500">+{resolutionRate.toFixed(1)}%</span>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Resolution Rate</p>
              <h3 className="text-2xl font-black mt-1 tracking-tighter">{resolutionRate.toFixed(0)}%</h3>
            </div>
          </SectionCard>

          <SectionCard className="p-4 py-3 border-none bg-background shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="size-5" />
              </div>
              <span className="text-[10px] font-black text-blue-500">Live</span>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">SLA Compliance</p>
              <h3 className="text-2xl font-black mt-1 tracking-tighter">{slaCompliance.toFixed(0)}%</h3>
            </div>
          </SectionCard>

          <SectionCard className="p-4 py-3 border-none bg-background shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Users className="size-5" />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase">Realtime</span>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Avg Response Time</p>
              <h3 className="text-2xl font-black mt-1 tracking-tighter text-muted-foreground">TBD</h3>
            </div>
          </SectionCard>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Priority Distribution" description="Current workload breakdown by urgency levels.">
          <div className="h-64 flex items-end justify-between gap-4 mt-8 px-4">
            {Object.entries(priorityDistribution).map(([label, count]) => {
              const height = totalCount > 0 ? (count / totalCount) * 100 : 0;
              return (
                <div key={label} className="flex-1 flex flex-col items-center gap-4">
                  <div className="w-full bg-muted/20 rounded-t-lg relative group overflow-hidden" style={{ height: '100%' }}>
                    <div 
                      className={cn(
                        "absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-1000",
                        label === 'urgent' ? "bg-red-500" : 
                        label === 'high' ? "bg-orange-500" : 
                        label === 'medium' ? "bg-blue-500" : "bg-slate-400"
                      )} 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black uppercase tracking-tight">{label}</p>
                    <p className="text-[10px] font-bold text-muted-foreground">{count} Tickets</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Status Breakdown" description="Lifecycle status for active support tickets.">
          <div className="space-y-6 mt-8">
            {Object.entries(statusDistribution).map(([label, count]) => {
               const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
               return (
                 <div key={label} className="space-y-2">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                     <span>{label.replace('_', ' ')}</span>
                     <span className="text-muted-foreground">{count} ({percentage.toFixed(0)}%)</span>
                   </div>
                   <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-primary transition-all duration-1000" 
                       style={{ width: `${percentage}%` }}
                     />
                   </div>
                 </div>
               );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="p-8 rounded-2xl border border-dashed border-border/60 bg-muted/5 text-center">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Additional performance metrics will populate as ticket history grows.</p>
      </div>
    </div>
  );
}
