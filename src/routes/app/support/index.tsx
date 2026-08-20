import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import * as React from "react";
import { 
  MessageSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Filter,
  Plus,
  UserCheck
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { Button } from "@/components/ui/button";
import { supportService } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/app/support/")({
  component: SupportModuleLayout,
});

function SupportModuleLayout() {
  return (
    <>
      <SupportDashboard />
      <Outlet />
    </>
  );
}

function SupportDashboard() {
  const { location } = useRouterState();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["support", "tickets", { pageSize: 1000 }],
    queryFn: () => supportService.listTickets({ pageSize: 1000 }),
  });

  if (location.pathname !== "/app/support" && location.pathname !== "/app/support/") {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
        <PageHeader eyebrow="Support Operations" title="Support Command Center" description="Loading live metrics..." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      </div>
    );
  }

  const tickets = data?.items || [];
  const openTickets = tickets.filter(t => !['resolved', 'closed'].includes(t.status.toLowerCase())).length;
  const pendingResponse = tickets.filter(t => ['open', 'waiting_on_customer'].includes(t.status.toLowerCase())).length;
  const slaBreaches = tickets.filter(t => t.sla_status === 'Breached').length;
  const resolvedToday = tickets.filter(t => {
    if (t.status.toLowerCase() !== 'resolved') return false;
    const updatedAt = t.updated_at ? new Date(t.updated_at) : null;
    if (!updatedAt) return false;
    const today = new Date();
    return updatedAt.toDateString() === today.toDateString();
  }).length;

  const kpiData = [
    { title: "Open Tickets", value: openTickets.toString(), trend: "Live", icon: MessageSquare },
    { title: "Pending Resp.", value: pendingResponse.toString(), trend: "Live", icon: Clock },
    { title: "SLA Breaches", value: slaBreaches.toString(), trend: slaBreaches > 0 ? "Action Required" : "Healthy", icon: AlertTriangle, color: slaBreaches > 0 ? "text-red-600" : "text-green-600" },
    { title: "Resolved Today", value: resolvedToday.toString(), trend: "Live", icon: CheckCircle2 },
    { title: "Avg Resolution", value: "TBD", trend: "Database", icon: TrendingUp },
    { title: "Customer Sat.", value: "N/A", trend: "Database", icon: UserCheck },
  ];

  const priorityMap = tickets.reduce((acc, t) => {
    const p = t.priority.toLowerCase();
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityData = [
    { name: 'Urgent', value: priorityMap['urgent'] || 0, color: '#ef4444' },
    { name: 'High', value: priorityMap['high'] || 0, color: '#f97316' },
    { name: 'Medium', value: priorityMap['medium'] || 0, color: '#f59e0b' },
    { name: 'Low', value: priorityMap['low'] || 0, color: '#22c55e' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Support Operations"
        title="Support Command Center"
        description="Monitor ticket volume, agent performance and service level compliance."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Real-time
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold">
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi) => (
          <DashboardKpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            icon={kpi.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="Recent Activity" description="Latest movements in the live support queue.">
            <div className="space-y-3 mt-4">
              {tickets.slice(0, 6).map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "size-2 rounded-full",
                      ticket.priority.toLowerCase() === 'urgent' ? "bg-red-500" : ticket.priority.toLowerCase() === 'high' ? "bg-orange-500" : "bg-blue-500"
                    )} />
                    <div>
                      <p className="text-xs font-bold group-hover:text-primary transition-colors line-clamp-1">{ticket.subject}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">{ticket.id.slice(0, 8)} • {ticket.customer_name || 'Anonymous'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-muted border border-border/40">
                      {ticket.status}
                    </span>
                    <p className="text-[9px] text-muted-foreground mt-1">{ticket.created_at ? new Date(ticket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
                  </div>
                </div>
              ))}
              {tickets.length === 0 && (
                <div className="py-12 text-center">
                  <MessageSquare className="size-12 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No active tickets found</p>
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <SectionCard title="Tickets by Priority" description="Distribution of current live issues.">
             <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
