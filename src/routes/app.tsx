import { createFileRoute } from "@tanstack/react-router";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus,
  Zap,
  Calendar,
  Building2,
  Box,
  ChevronRight,
  ArrowUpRight,
  Phone,
  CreditCard,
  Target,
  BarChart3,
  Search
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  demoKpis, 
  demoActivity, 
  demoFollowUps, 
  demoCallbacks, 
  demoPayments,
  demoPipeline,
  DEMO_DATA_NOTICE
} from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — ABOS CRM" },
      {
        name: "description",
        content: "Enterprise CRM Dashboard for Adzdrio India.",
      },
    ],
  }),
  component: AppDashboard,
});

function AppDashboard() {
  return (
    <div className="flex flex-col gap-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <PageHeader
          eyebrow="WORKSPACE OVERVIEW"
          title="CRM Dashboard"
          description="Real-time performance metrics and active queue management."
          className="pb-0"
        />
        <div className="flex items-center gap-2 mb-2">
           <Badge variant="outline" className="h-6 gap-1 bg-yellow-500/10 text-yellow-600 border-yellow-500/20 font-bold text-[10px]">
             <AlertCircle className="size-3" />
             {DEMO_DATA_NOTICE}
           </Badge>
           <Button variant="outline" size="sm" className="h-9 gap-2">
             <Calendar className="size-4" />
             Last 30 Days
           </Button>
           <Button size="sm" className="h-9 gap-2 shadow-lg shadow-primary/20">
             <Plus className="size-4" />
             Quick Action
           </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoKpis.map((kpi) => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Pipeline */}
          <SectionCard title="Sales Pipeline Distribution" actions={<Button variant="ghost" size="sm" className="text-xs h-7">View Analytics</Button>}>
            <div className="space-y-6 py-2">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {demoPipeline.map((stage) => (
                  <div key={stage.id} className="relative space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <span>{stage.stage}</span>
                      <span>{stage.count}</span>
                    </div>
                    <Progress value={stage.share} className="h-1.5" />
                    <div className="text-xs font-bold text-foreground">{stage.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Activity Feed */}
          <SectionCard title="Recent Team Activity" actions={<Button variant="ghost" size="sm" className="text-xs h-7">Audit Log</Button>}>
            <div className="space-y-4">
              {demoActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group">
                  <div className={cn(
                    "size-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105",
                    item.tone === 'success' ? 'bg-emerald-500/10 text-emerald-600' : 
                    item.tone === 'warning' ? 'bg-amber-500/10 text-amber-600' : 'bg-blue-500/10 text-blue-600'
                  )}>
                    <Activity className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      <span className="font-bold">{item.actor}</span> {item.action} <span className="font-bold">{item.target}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">{item.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Quick Widgets */}
          <SectionCard title="Follow-up Queue" actions={<Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none cursor-pointer">3 Due</Badge>}>
            <div className="space-y-3">
              {demoFollowUps.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 p-3 rounded-xl border border-border/40 glass-surface hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate group-hover:text-primary transition-colors">{item.contact}</div>
                      <div className="text-[10px] text-muted-foreground font-medium">{item.company}</div>
                    </div>
                    <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'} className="text-[9px] h-4 uppercase tracking-tighter">
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-border/20">
                    <span className="flex items-center gap-1 text-muted-foreground"><Clock className="size-3" /> {item.due}</span>
                    <span className="font-bold text-foreground">Agent: {item.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Incoming Callbacks" actions={<Badge variant="outline" className="text-[10px]">{demoCallbacks.length} Pending</Badge>}>
            <div className="space-y-3">
              {demoCallbacks.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/40 glass-surface hover:bg-accent/30 transition-colors">
                  <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Phone className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">{item.contact}</div>
                    <div className="text-[10px] text-muted-foreground">{item.slot}</div>
                  </div>
                  <Button size="icon" variant="outline" className="size-8 rounded-lg" onClick={() => toast.info(`Calling ${item.contact}...`)}>
                    <Zap className="size-3" />
                  </Button>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recent Collections">
            <div className="space-y-3">
              {demoPayments.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-3 text-muted-foreground" />
                    <div>
                      <div className="font-bold">{item.customer}</div>
                      <div className="text-[9px] text-muted-foreground uppercase">{item.method} · {item.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">{item.amount}</div>
                    <StatusBadge tone={item.status === 'settled' ? 'success' : item.status === 'pending' ? 'warning' : 'danger'} className="h-3.5 text-[8px]">
                      {item.status}
                    </StatusBadge>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-bold uppercase tracking-wider">
                View Ledger
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, delta, trend, icon: Icon, caption }: any) {
  return (
    <Card className="glass-surface border-border/40 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Icon className="size-5" />
          </div>
          <Badge className={cn(
            "h-5 text-[10px] font-black tracking-tight",
            trend === 'up' ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
          )}>
            {trend === 'up' ? <TrendingUp className="size-3 mr-1" /> : <TrendingDown className="size-3 mr-1" />}
            {delta}
          </Badge>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground/70 mb-1">{label}</h3>
          <p className="text-2xl font-black tracking-tighter text-foreground">{value}</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1 font-medium">{caption}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}
