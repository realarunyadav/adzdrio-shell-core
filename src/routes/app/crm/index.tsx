import { createFileRoute, useRouterState } from "@tanstack/react-router";
import * as React from "react";
import { 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BarChart3,
  Search,
  Zap,
  Phone,
  MessageSquare,
  Building2,
  DollarSign
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { demoLeads, demoKpis } from "@/lib/mock/workspace.demo";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/crm/")({
  component: () => (
    <>
      <CrmDashboard />
      <Outlet />
    </>
  ),
});

function CrmDashboard() {
  const { location } = useRouterState();
  
  // Only show the dashboard if we are exactly at /app/crm
  if (location.pathname !== "/app/crm" && location.pathname !== "/app/crm/") {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="CRM Operations"
        title="CRM Dashboard"
        description="Lead management, customer relationships, and sales performance overview."
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardKpiCard
          title="Total Leads"
          value={String(demoLeads.length)}
          trend="+12.4%"
          icon={Target}
        />
        <DashboardKpiCard
          title="Conversion Rate"
          value="18.6%"
          trend="-1.2%"
          icon={TrendingUp}
        />
        <DashboardKpiCard
          title="Active Customers"
          value="1,284"
          trend="+4.1%"
          icon={Users}
        />
        <DashboardKpiCard
          title="Pipeline Value"
          value="₹ 24.7L"
          trend="+5.2%"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="Recent Activity" description="Latest updates from your sales team.">
            <div className="space-y-4">
              {demoLeads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{lead.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{lead.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-medium text-muted-foreground">Updated 2h ago</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <SectionCard title="Task Overview">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-yellow-600" />
                  <span className="text-xs font-bold">Follow-ups Due</span>
                </div>
                <span className="text-xs font-black">12</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-blue-600" />
                  <span className="text-xs font-bold">Callbacks Requested</span>
                </div>
                <span className="text-xs font-black">5</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
