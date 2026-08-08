import * as React from "react";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Activity, 
  FileText, 
  LifeBuoy, 
  Smartphone,
  ChevronRight,
  Clock,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

export function CustomerPortalDashboard() {
  const customerInfo = {
    name: "Amit Kumar",
    id: "CUST-2026-8842",
    subscription: "Enterprise Platinum",
    plan: "Annual Professional",
    startDate: "Jan 12, 2026",
    expiryDate: "Jan 11, 2027",
    daysRemaining: 156,
    status: "Active"
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 pointer-events-none">
          <ShieldCheck className="size-48" />
        </div>
        <div className="z-10 text-center md:text-left">
          <h1 className="text-2xl font-black mb-1 tracking-tight text-primary uppercase">Welcome, {customerInfo.name}</h1>
          <p className="text-sm font-medium text-primary/70">Access your Adzdrio enterprise services and subscription cockpit.</p>
        </div>
        <div className="flex gap-4 z-10">
          <div className="text-center md:text-right">
            <p className="text-[10px] uppercase font-black tracking-widest text-primary/50 mb-1">Customer ID</p>
            <p className="text-sm font-bold text-primary">{customerInfo.id}</p>
          </div>
          <div className="w-px h-10 bg-primary/20" />
          <div className="text-center md:text-right">
            <p className="text-[10px] uppercase font-black tracking-widest text-primary/50 mb-1">Account Status</p>
            <StatusBadge tone="success">Verified</StatusBadge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Subscription Quick View */}
        <div className="md:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden relative group transition-all hover:shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><TrendingUp className="size-20" /></div>
              <CardContent className="p-6">
                <p className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-2">Primary Subscription</p>
                <h3 className="text-xl font-bold">{customerInfo.subscription}</h3>
                <div className="my-6">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-4xl font-black leading-none">{customerInfo.daysRemaining}</p>
                    <p className="text-xs font-bold text-white/60 mb-1 uppercase tracking-tight">Days Remaining</p>
                  </div>
                  <Progress value={(customerInfo.daysRemaining / 365) * 100} className="h-1.5 bg-white/10" />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-white text-slate-900 hover:bg-slate-100 font-bold h-9 text-xs">Manage Subscription</Button>
                </div>
              </CardContent>
            </Card>

            <SectionCard title="Registered Devices" actions={<Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase">View All</Button>}>
              <div className="space-y-4">
                <DeviceItem name="MacBook Pro 16" type="Workstation" status="Active" lastActive="2m ago" />
                <DeviceItem name="iPhone 15 Pro" type="Mobile App" status="Active" lastActive="1h ago" />
                <DeviceItem name="Samsung Galaxy S24" type="Mobile App" status="Inactive" lastActive="3d ago" />
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Recent Activity" actions={<Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase">Full History</Button>}>
            <div className="space-y-4">
              <ActivityRow icon={ShieldCheck} title="Session Login" desc="Successfull login from Mumbai, India (IP: 103.xxx.xxx.42)" time="2 mins ago" />
              <ActivityRow icon={FileText} title="Invoice Downloaded" desc="INV-2026-881 for July 2026 was downloaded." time="5 hours ago" />
              <ActivityRow icon={Activity} title="Security Preference Updated" desc="Two-factor authentication settings were modified." time="1 day ago" />
            </div>
          </SectionCard>
        </div>

        {/* Sidebar Widgets */}
        <div className="md:col-span-4 space-y-6">
          <SectionCard title="Service Health" className="border-emerald-500/20">
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 relative">
                  <Activity className="size-10 text-emerald-500" />
                  <div className="absolute -top-1 -right-1 size-5 rounded-full bg-emerald-500 border-4 border-background" />
                </div>
                <p className="text-sm font-bold">All Systems Functional</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">Uptime: 99.98%</p>
              </div>
              <div className="space-y-2 border-t border-border/40 pt-4">
                <HealthRow label="Identity Engine" status="online" />
                <HealthRow label="Data Sync Services" status="online" />
                <HealthRow label="API Gateway" status="online" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Support Status" actions={<Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase">Help Desk</Button>}>
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Active Tickets</p>
                  <Badge className="bg-primary text-[9px]">1</Badge>
                </div>
                <p className="text-xs font-bold leading-tight truncate">Connection latency in Bengaluru North Hub</p>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge tone="info">Under Review</StatusBadge>
                  <span className="text-[10px] text-muted-foreground font-medium italic">EST: 2 hours</span>
                </div>
              </div>
              <Button variant="outline" className="w-full h-9 glass-surface text-xs font-bold">Create New Request</Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function DeviceItem({ name, type, status, lastActive }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-default border border-transparent hover:border-border/40">
      <div className="flex items-center gap-3">
        <div className={cn("size-8 rounded-lg flex items-center justify-center", status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground')}>
          <Smartphone className="size-4" />
        </div>
        <div>
          <p className="text-xs font-bold">{name}</p>
          <p className="text-[10px] text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">{status}</p>
        <p className="text-[9px] italic opacity-60">{lastActive}</p>
      </div>
    </div>
  );
}

function ActivityRow({ icon: Icon, title, desc, time }: any) {
  return (
    <div className="flex gap-4 p-2 group transition-colors">
      <div className="size-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-all">
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-xs font-bold truncate">{title}</p>
          <span className="text-[10px] text-muted-foreground italic shrink-0 ml-4">{time}</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed truncate">{desc}</p>
      </div>
    </div>
  );
}

function HealthRow({ label, status }: { label: string; status: 'online' | 'degraded' | 'offline' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-muted-foreground/80">{label}</span>
      <div className="flex items-center gap-1.5">
        <div className={cn("size-1.5 rounded-full animate-pulse", status === 'online' ? 'bg-emerald-500' : status === 'degraded' ? 'bg-amber-500' : 'bg-rose-500')} />
        <span className="text-[9px] font-black uppercase tracking-widest opacity-70">{status}</span>
      </div>
    </div>
  );
}
