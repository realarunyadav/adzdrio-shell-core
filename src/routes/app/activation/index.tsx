import { createFileRoute, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { 
  Rocket, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Target,
  Plus,
  Filter,
  RefreshCw,
  TrendingUp,
  Activity,
  CreditCard,
  UserPlus
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  demoActivations, 
  getActivationModel,
  DemoActivation
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
import { ActivationDetailsDrawer } from "@/components/activation/ActivationDetailsDrawer";
import { CreateActivationWizard } from "@/components/activation/CreateActivationWizard";

export const Route = createFileRoute("/app/activation/")({
  component: ActivationModuleLayout,
});

function ActivationModuleLayout() {
  return (
    <>
      <ActivationDashboard />
      <Outlet />
    </>
  );
}

function ActivationDashboard() {
  const { location } = useRouterState();
  const navigate = useNavigate();
  const [selectedActivation, setSelectedActivation] = React.useState<DemoActivation | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isWizardOpen, setIsWizardOpen] = React.useState(false);
  
  if (location.pathname !== "/app/activation" && location.pathname !== "/app/activation/") {
    return null;
  }

  const model = getActivationModel();

  const kpis = [
    { title: "Pending Payment", value: model.pendingPayment.toString(), trend: "+2", icon: CreditCard, color: "text-yellow-600" },
    { title: "Ready for Assign", value: model.readyAssignment.toString(), trend: "+5", icon: UserPlus, color: "text-purple-600" },
    { title: "In Progress", value: model.inProgress.toString(), trend: "+8", icon: Activity, color: "text-blue-600" },
    { title: "Waiting Customer", value: model.waitingCustomer.toString(), trend: "-3", icon: Clock, color: "text-orange-600" },
    { title: "Completed Today", value: model.completedToday.toString(), trend: "+12%", icon: CheckCircle2, color: "text-green-600" },
    { title: "Failed / Attention", value: model.failed.toString(), trend: "0", icon: AlertTriangle, color: "text-red-600" },
  ];

  const volumeData = [
    { name: '08/07', count: 12 },
    { name: '08/08', count: 18 },
    { name: '08/09', count: 15 },
    { name: '08/10', count: 22 },
    { name: '08/11', count: 19 },
    { name: '08/12', count: 25 },
    { name: '08/13', count: 14 },
  ];

  const statusData = [
    { name: 'In Progress', value: model.inProgress, color: '#2563eb' },
    { name: 'Pending', value: model.pendingPayment + model.readyAssignment, color: '#8b5cf6' },
    { name: 'Waiting', value: model.waitingCustomer, color: '#f97316' },
    { name: 'Failed', value: model.failed, color: '#ef4444' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Operations Workspace"
        title="Activation Command Center"
        description="Manage subscription activation and provisioning workflows from payment verification to completion."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 font-bold"
              onClick={() => setIsWizardOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Activation
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
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
          <SectionCard title="Activation Volume Trend" description="Daily service activations requested over the last 7 days.">
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="count" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorAct)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <SectionCard title="Status Distribution" description="Current active provisioning queue breakdown.">
             <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
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

        <div className="col-span-12">
          <SectionCard title="Recent Activation Activity" description="Latest movements in the provisioning workspace.">
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">ID</th>
                    <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer / Business</th>
                    <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Plan</th>
                    <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                    <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assigned To</th>
                    <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">SLA Target</th>
                    <th className="py-3 px-4 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {demoActivations.slice(0, 5).map((act) => (
                    <tr 
                      key={act.id} 
                      className="border-b border-border/40 hover:bg-muted/30 transition-colors group cursor-pointer"
                      onClick={() => {
                        setSelectedActivation(act);
                        setIsDrawerOpen(true);
                      }}
                    >
                      <td className="py-3 px-4">
                        <span className="text-xs font-black uppercase">{act.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">{act.customerName}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">{act.businessName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-medium uppercase">{act.planName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-[9px] font-black uppercase border-border/40">
                          {act.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-medium uppercase">{act.assignedToName || '---'}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Clock className="size-3 text-muted-foreground" />
                          <span className="text-xs font-bold text-muted-foreground">
                            {new Date(act.slaDueAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase">Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button 
              variant="ghost" 
              className="w-full text-[10px] font-bold uppercase tracking-widest h-10 mt-2 border border-dashed border-border/60 hover:border-primary/40 hover:bg-primary/5"
              onClick={() => navigate({ to: '/app/activation/queue' })}
            >
              View Complete Activation Queue
            </Button>
          </SectionCard>
        </div>
      </div>

      <ActivationDetailsDrawer 
        activation={selectedActivation} 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />

      <CreateActivationWizard 
        open={isWizardOpen} 
        onOpenChange={setIsWizardOpen} 
      />
    </div>
  );
}