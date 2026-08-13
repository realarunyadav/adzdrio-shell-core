import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import * as React from "react";
import { 
  LifeBuoy, 
  MessageSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Filter,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { Button } from "@/components/ui/button";
import { 
  demoSupportTickets, 
  demoSupportAgents,
  DemoSupportTicket 
} from "@/lib/mock/workspace.demo";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/support")({
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
  
  // Only show the dashboard if we are exactly at /app/support or /app/support/
  if (location.pathname !== "/app/support" && location.pathname !== "/app/support/") {
    return null;
  }

  const openTickets = demoSupportTickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
  const pendingResponse = demoSupportTickets.filter(t => t.status === 'New' || t.status === 'Waiting').length;
  const slaBreaches = demoSupportTickets.filter(t => t.slaStatus === 'Breached').length;

  const kpiData = [
    { title: "Open Tickets", value: openTickets.toString(), trend: "+12%", icon: MessageSquare },
    { title: "Pending Resp.", value: pendingResponse.toString(), trend: "-5%", icon: Clock },
    { title: "SLA Breaches", value: slaBreaches.toString(), trend: "+1", icon: AlertTriangle, color: "text-red-600" },
    { title: "Resolved Today", value: "24", trend: "+18%", icon: CheckCircle2 },
    { title: "Avg Resolution", value: "4.2h", trend: "-15%", icon: TrendingUp },
    { title: "Customer Sat.", value: "4.8/5", trend: "+2%", icon: UserCheck },
  ];

  const volumeData = [
    { name: 'Mon', volume: 45 },
    { name: 'Tue', volume: 52 },
    { name: 'Wed', volume: 48 },
    { name: 'Thu', volume: 61 },
    { name: 'Fri', volume: 55 },
    { name: 'Sat', volume: 32 },
    { name: 'Sun', volume: 28 },
  ];

  const priorityData = [
    { name: 'Critical', value: 2, color: '#ef4444' },
    { name: 'High', value: 8, color: '#f97316' },
    { name: 'Medium', value: 15, color: '#f59e0b' },
    { name: 'Low', value: 10, color: '#22c55e' },
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

      {/* KPI Row */}
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
        {/* Ticket Volume Chart */}
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="Ticket Volume Trend" description="Daily support requests over the last 7 days.">
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-muted-foreground)' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-muted-foreground)' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}
                    labelStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorVol)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* Priority Distribution */}
        <div className="col-span-12 lg:col-span-4">
          <SectionCard title="Tickets by Priority" description="Distribution of current open issues.">
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

        {/* Agent Performance */}
        <div className="col-span-12 lg:col-span-6">
          <SectionCard title="Agent Performance" description="Real-time availability and throughput.">
            <div className="space-y-4 mt-4">
              {demoSupportAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={cn(
                        "absolute bottom-0 right-0 size-3 rounded-full border-2 border-background",
                        agent.status === 'online' ? "bg-green-500" : agent.status === 'away' ? "bg-yellow-500" : "bg-gray-400"
                      )} />
                    </div>
                    <div>
                      <p className="text-xs font-black">{agent.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">{agent.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-8 text-right">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Open</p>
                      <p className="text-xs font-black">{agent.openTickets}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">CSAT</p>
                      <p className="text-xs font-black text-green-600">{agent.csat}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Recent Tickets */}
        <div className="col-span-12 lg:col-span-6">
          <SectionCard title="Recent Activity" description="Latest movements in the support queue.">
            <div className="space-y-3 mt-4">
              {demoSupportTickets.slice(0, 4).map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "size-2 rounded-full",
                      ticket.priority === 'Critical' ? "bg-red-500" : ticket.priority === 'High' ? "bg-orange-500" : "bg-blue-500"
                    )} />
                    <div>
                      <p className="text-xs font-bold group-hover:text-primary transition-colors line-clamp-1">{ticket.subject}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">{ticket.id} • {ticket.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-muted border border-border/40">
                      {ticket.status}
                    </span>
                    <p className="text-[9px] text-muted-foreground mt-1">{new Date(ticket.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest h-8 mt-2">
                View Full Queue
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
