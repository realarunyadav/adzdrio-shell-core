import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import * as React from "react";
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
  Search,
  Activity,
  Filter,
  MoreVertical,
  Download,
  AlertTriangle,
  Briefcase,
  Scale,
  MessageSquare,
  Globe,
  Database,
  ShieldCheck,
  Settings,
  ArrowRight,
  UserPlus,
  Video
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  demoKpis, 
  demoActivities, 
  demoFinanceSnapshot,
  demoHrSnapshot,
  demoSupportSnapshot,
  demoAlerts,
  demoBusinesses,
  demoTeamPerformance,
  DEMO_DATA_NOTICE 
} from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalSearchOverlay } from "@/components/shared/GlobalSearchOverlay";


export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Owner Command Center — ABOS CRM" },
      {
        name: "description",
        content: "Company-wide business performance and operations overview.",
      },
    ],
  }),
  component: () => (
    <>
      <OwnerDashboard />
      <Outlet />
    </>
  ),
});

function OwnerDashboard() {
  const { location } = useRouterState();
  
  // Only show the dashboard if we are exactly at /app
  if (location.pathname !== "/app" && location.pathname !== "/app/") {
    return null;
  }

  const [dateRange, setDateRange] = React.useState("This Month");
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Global search keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);


  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <GlobalSearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 border-b border-border/50 pb-6">
        <div>
          <Badge variant="outline" className="mb-2 h-5 gap-1 bg-primary/5 text-primary border-primary/20 font-black text-[9px] uppercase tracking-widest">
            <ShieldCheck className="size-3" />
            Restricted: Owner Access
          </Badge>
          <div className="flex items-center gap-4">
            <PageHeader
              title="Owner Command Center"
              description="Company-wide business performance, operations, finance, people and system overview."
              className="p-0 space-y-1"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 px-3 gap-2 bg-accent/30 border-border/40 text-muted-foreground hover:text-foreground hidden md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Search...</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-background border border-border/40 text-[8px]">
                <span className="opacity-50">⌘</span>K
              </div>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <Badge variant="outline" className="h-9 px-3 gap-2 bg-yellow-500/5 text-yellow-600 border-yellow-500/10 font-bold text-[10px] hidden sm:flex">
             <AlertCircle className="size-3.5" />
             {DEMO_DATA_NOTICE}
           </Badge>

           <div className="flex items-center bg-accent/30 rounded-lg p-1 border border-border/50">
             {["Today", "Last 7 Days", "Last 30 Days", "This Month"].map((range) => (
               <Button 
                key={range}
                variant={dateRange === range ? "secondary" : "ghost"} 
                size="sm" 
                className={cn("h-7 px-3 text-[10px] font-bold rounded-md", dateRange === range && "shadow-sm")}
                onClick={() => setDateRange(range)}
               >
                 {range}
               </Button>
             ))}
             <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold rounded-md">
               <Calendar className="size-3 mr-1.5" />
               Custom
             </Button>
           </div>

           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button size="sm" className="h-9 gap-2 shadow-lg shadow-primary/20 bg-primary font-black uppercase tracking-widest text-[10px]">
                 <Plus className="size-4" />
                 Quick Actions
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end" className="w-56 glass-surface border-border/40">
                <DropdownMenuItem asChild>
                  <Link to="/modules/admin/employees" className="flex items-center w-full text-xs font-bold gap-2">
                    <UserPlus className="size-4" /> Add Employee
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/modules/admin/business" className="flex items-center w-full text-xs font-bold gap-2">
                    <Building2 className="size-4" /> Create Business
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/modules/admin" className="flex items-center w-full text-xs font-bold gap-2">
                    <Briefcase className="size-4" /> Open Admin Studio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/modules/admin/data" className="flex items-center w-full text-xs font-bold gap-2">
                    <BarChart3 className="size-4" /> Generate Report
                  </Link>
                </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {demoKpis.map((kpi) => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Alerts Section - Full Width if there are high severity alerts */}
        <div className="col-span-12">
          <SectionCard 
            title="Needs Attention" 
            
            className="border-red-500/10"
            actions={<Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase text-muted-foreground">Dismiss All</Button>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {demoAlerts.map((alert) => (
                <AlertItem key={alert.id} {...alert} />
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Business Performance */}
        <div className="col-span-12 xl:col-span-8">
          <SectionCard 
            title="Business Performance" 
            
            actions={<Button variant="outline" size="sm" className="h-7 text-[10px] font-bold gap-1.5"><Download className="size-3" /> Export Report</Button>}
          >
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Business</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Revenue</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Sales</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Leads</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Conversion</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Pending</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoBusinesses.map((biz) => (
                    <TableRow key={biz.id} className="border-border/40 hover:bg-accent/30 transition-colors group cursor-pointer">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8 rounded-lg border border-border/50 shadow-sm">
                            <AvatarFallback className="bg-navy text-[10px] font-bold text-navy-foreground uppercase">{biz.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-xs font-black group-hover:text-primary transition-colors">{biz.name}</div>
                            <div className="text-[9px] text-muted-foreground uppercase font-medium">{biz.plan} Plan</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold">{biz.revenue}</TableCell>
                      <TableCell className="text-xs font-bold">{biz.sales}</TableCell>
                      <TableCell className="text-xs font-bold">{biz.leads}</TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center gap-1 min-w-[80px]">
                          <span className="text-[10px] font-bold">{biz.conversion}</span>
                          <Progress value={parseFloat(biz.conversion)} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-amber-600">{biz.pendingPayments}</TableCell>
                      <TableCell className="text-right">
                        <StatusBadge tone={biz.status === 'active' ? 'success' : 'warning'} className="h-5 text-[9px] px-2 font-black uppercase tracking-tighter">
                          {biz.status}
                        </StatusBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionCard>
        </div>

        {/* Finance Snapshot */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <SectionCard title="Finance Overview" >
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FinanceMiniCard label="Net Revenue" value={demoFinanceSnapshot.revenue} trend="+5.2%" tone="success" />
                <FinanceMiniCard label="Expenses" value={demoFinanceSnapshot.expenses} trend="+2.1%" tone="danger" />
              </div>
              
              <div className="space-y-3 p-4 rounded-xl bg-accent/20 border border-border/40">
                <FinanceRow label="Paid Collections" value={demoFinanceSnapshot.paid} status="success" />
                <FinanceRow label="Pending Payouts" value={demoFinanceSnapshot.pending} status="warning" />
                <FinanceRow label="Failed Payments" value={demoFinanceSnapshot.failed} status="danger" />
                <div className="pt-2 border-t border-border/40">
                  <FinanceRow label="Net Position" value={demoFinanceSnapshot.net} bold />
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full text-[10px] font-black uppercase tracking-[0.2em] h-10 gap-2">
                <DollarSign className="size-3.5" />
                Open Finance Hub
              </Button>
            </div>
          </SectionCard>
        </div>

        {/* Team Performance */}
        <div className="col-span-12 xl:col-span-8">
          <SectionCard 
            title="Team Performance" 
            
            actions={
              <div className="flex items-center gap-2">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-2.5 top-2 size-3 text-muted-foreground" />
                  <input className="h-7 w-48 rounded-md border border-border/50 bg-accent/20 pl-8 text-[10px] focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="Search team..." />
                </div>
                <Button variant="ghost" size="icon" className="size-7"><Filter className="size-3.5" /></Button>
              </div>
            }
          >
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Employee</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Business</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Leads</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Sales</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest">Revenue</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoTeamPerformance.map((emp) => (
                  <TableRow key={emp.id} className="border-border/40 hover:bg-accent/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-xs font-bold">{emp.name}</div>
                          <div className="text-[9px] text-muted-foreground uppercase">{emp.role}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium">{emp.business}</TableCell>
                    <TableCell className="text-xs text-center">{emp.leads}</TableCell>
                    <TableCell className="text-xs text-center font-bold">{emp.sales}</TableCell>
                    <TableCell className="text-xs font-bold">{emp.revenue}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold">{emp.performance}%</span>
                        <div className="w-16 h-1 bg-accent rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", emp.performance > 90 ? "bg-emerald-500" : "bg-primary")} 
                            style={{ width: `${emp.performance}%` }} 
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </div>

        {/* HR & Support Sidebars */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 space-y-6">
          <SectionCard title="HR Snapshot" >
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-xl border border-border/40 glass-surface">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Staff</div>
                <div className="text-xl font-black mt-1">{demoHrSnapshot.active} <span className="text-[10px] text-muted-foreground">/ {demoHrSnapshot.total}</span></div>
              </div>
              <div className="p-3 rounded-xl border border-border/40 glass-surface">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Attendance</div>
                <div className="text-xl font-black mt-1 text-emerald-600">{demoHrSnapshot.attendance}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2 font-medium"><Users className="size-3.5 text-muted-foreground" /> On Leave Today</span>
                <Badge variant="secondary" className="h-5 font-bold">{demoHrSnapshot.onLeave}</Badge>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2 font-medium"><Clock className="size-3.5 text-muted-foreground" /> Open Leave Requests</span>
                <Badge className="bg-amber-500/10 text-amber-600 border-none h-5 font-bold">{demoHrSnapshot.openLeaves}</Badge>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2 font-medium"><AlertTriangle className="size-3.5 text-red-500" /> Needing Attention</span>
                <Badge variant="destructive" className="h-5 font-bold">{demoHrSnapshot.needingAttention}</Badge>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-6 text-[10px] font-black uppercase tracking-[0.2em] h-10">
              Manage Workforce
            </Button>
          </SectionCard>

          <SectionCard title="Support & Operations" >
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <SupportMetric label="Open" value={demoSupportSnapshot.conversations} icon={MessageSquare} />
                <SupportMetric label="Calls" value={demoSupportSnapshot.calls} icon={Phone} />
                <SupportMetric label="Video" value={demoSupportSnapshot.videoCalls} icon={Video} />
              </div>
              
              <div className="p-4 rounded-xl bg-navy/5 border border-navy/10 space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold uppercase tracking-wider text-muted-foreground">Activation Pipeline</span>
                  <span className="font-black text-navy">{demoSupportSnapshot.activationsCompleted} Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="h-1.5 flex-1" />
                  <span className="text-[10px] font-bold">{demoSupportSnapshot.activationsPending} Pending</span>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Activity Feed */}
        <div className="col-span-12 xl:col-span-8">
          <SectionCard title="Company-wide Activity"  actions={<Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase">View Audit Log</Button>}>
            <div className="space-y-1">
              {demoActivities.map((act) => (
                <div key={act.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/40 transition-colors group">
                  <div className={cn(
                    "size-9 rounded-xl flex items-center justify-center shrink-0 border border-border/40",
                    act.status === 'success' ? 'bg-emerald-500/5 text-emerald-600' : 
                    act.status === 'warning' ? 'bg-amber-500/5 text-amber-600' : 'bg-primary/5 text-primary'
                  )}>
                    <Activity className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">
                      <span className="font-black">{act.actor}</span> {act.action} <span className="font-black text-primary">{act.target}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{act.time}</span>
                      <span className="size-1 rounded-full bg-border" />
                      <span className="text-[9px] font-bold text-muted-foreground uppercase">{act.business}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100"><ArrowRight className="size-4" /></Button>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Sales Trend Visualization Placeholder */}
        <div className="col-span-12 xl:col-span-4">
          <SectionCard title="Sales Intelligence" >
             <div className="h-[300px] w-full flex flex-col items-center justify-center gap-3 text-muted-foreground bg-accent/10 rounded-xl border border-dashed border-border/50">
                <BarChart3 className="size-12 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Revenue Intelligence Stream</p>
                <div className="flex gap-2">
                  <div className="h-12 w-3 bg-primary/20 rounded-t-sm animate-pulse" />
                  <div className="h-24 w-3 bg-primary/20 rounded-t-sm animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="h-16 w-3 bg-primary/20 rounded-t-sm animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="h-32 w-3 bg-primary/20 rounded-t-sm animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="h-20 w-3 bg-primary/20 rounded-t-sm animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
             </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, delta, trend, icon: Icon, caption }: any) {
  const MetricIcon = Icon || TrendingUp;
  
  return (
    <Card className="glass-surface border-border/40 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="size-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <MetricIcon className="size-4" />
          </div>
          <Badge className={cn(
            "h-4 px-1 text-[8px] font-black tracking-tighter uppercase",
            trend === 'up' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-red-500/10 text-red-600 border-red-500/20"
          )}>
            {trend === 'up' ? <TrendingUp className="mr-0.5 size-2.5 inline" /> : <TrendingDown className="mr-0.5 size-2.5 inline" />}
            {delta}
          </Badge>
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/80 truncate">{label}</p>
          <p className="text-xl font-black tracking-tighter mt-0.5 text-foreground truncate">{value}</p>
          {caption && <p className="text-[8px] text-muted-foreground mt-1 font-medium italic opacity-60 truncate">{caption}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ title, desc, module, severity, time }: any) {
  return (
    <div className={cn(
      "p-4 rounded-xl border flex flex-col gap-3 transition-all hover:shadow-md",
      severity === 'high' ? 'bg-red-500/5 border-red-500/10' : 'bg-amber-500/5 border-amber-500/10'
    )}>
      <div className="flex justify-between items-start">
        <div className={cn(
          "size-7 rounded-lg flex items-center justify-center shrink-0",
          severity === 'high' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'
        )}>
          <AlertTriangle className="size-3.5" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{time}</span>
      </div>
      <div>
        <h5 className="text-[10px] font-black uppercase tracking-wider text-foreground mb-1">{title}</h5>
        <p className="text-[10px] leading-relaxed text-muted-foreground font-medium">{desc}</p>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/20">
        <Badge variant="outline" className="h-4 text-[8px] font-black tracking-tighter uppercase">{module}</Badge>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-[9px] font-black uppercase tracking-widest text-primary">Resolve</Button>
      </div>
    </div>
  );
}

function FinanceMiniCard({ label, value, trend, tone }: any) {
  return (
    <div className="p-3 rounded-lg border border-border/40 bg-accent/10">
      <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-sm font-black tracking-tight">{value}</span>
        <span className={cn("text-[8px] font-bold", tone === 'success' ? 'text-emerald-600' : 'text-red-600')}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function FinanceRow({ label, value, status, bold }: any) {
  return (
    <div className="flex justify-between items-center py-0.5">
      <span className={cn("text-[10px] font-medium text-muted-foreground", bold && "font-bold text-foreground")}>{label}</span>
      <span className={cn(
        "text-[10px] font-bold",
        status === 'success' ? 'text-emerald-600' : 
        status === 'warning' ? 'text-amber-600' : 
        status === 'danger' ? 'text-red-600' : '',
        bold && "text-sm font-black"
      )}>
        {value}
      </span>
    </div>
  );
}

function SupportMetric({ label, value, icon: Icon }: any) {
  return (
    <div className="flex flex-col items-center p-2 rounded-lg border border-border/40 glass-surface">
      <Icon className="size-3.5 text-muted-foreground mb-1" />
      <div className="text-xs font-black">{value}</div>
      <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
