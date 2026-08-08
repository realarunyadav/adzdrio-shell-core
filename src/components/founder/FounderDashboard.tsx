import React from 'react';
import { SectionCard } from '@/components/shared/SectionCard';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Activity, 
  Target,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  Briefcase,
  LifeBuoy
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export const FounderDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIItem 
          title="Revenue (MTD)" 
          value="₹ 42.8L" 
          trend="+12.4%" 
          trendUp={true} 
          icon={DollarSign}
          subtext="Target: ₹ 50L"
        />
        <KPIItem 
          title="MRR" 
          value="₹ 12.4L" 
          trend="+5.2%" 
          trendUp={true} 
          icon={TrendingUp}
          subtext="ARR: ₹ 1.48Cr"
        />
        <KPIItem 
          title="Active Customers" 
          value="1,284" 
          trend="+8.1%" 
          trendUp={true} 
          icon={Users}
          subtext="12 New today"
        />
        <KPIItem 
          title="Collections" 
          value="98.2%" 
          trend="+2.4%" 
          trendUp={true} 
          icon={ShieldCheck}
          subtext="₹ 82K Outstanding"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Revenue Intelligence" actions={<Badge variant="outline">Live</Badge>}>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground italic text-xs">
              Interactive Revenue & Trend Analytics Stream
            </div>
          </SectionCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Sales Intelligence">
              <div className="space-y-4">
                <StatRow label="Leads" value="482" />
                <StatRow label="Qualified" value="124" />
                <StatRow label="Calls" value="842" />
                <StatRow label="Conversion" value="14.2%" status="success" />
                <Progress value={72} className="h-1" />
                <p className="text-[10px] text-muted-foreground italic">Top Performer: Rajesh K. (₹ 8.4L)</p>
              </div>
            </SectionCard>
            <SectionCard title="Customer Health">
              <div className="space-y-4">
                <StatRow label="At Risk" value="8" status="danger" />
                <StatRow label="Support Tickets" value="24" />
                <StatRow label="CSAT" value="4.8/5" status="success" />
                <StatRow label="Service Uptime" value="99.98%" status="success" />
                <div className="flex gap-2 pt-2">
                   <Badge className="bg-danger/10 text-danger border-none text-[9px]">8 Expiring</Badge>
                   <Badge className="bg-warning/10 text-warning border-none text-[9px]">12 Heavy Load</Badge>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="space-y-6">
          <SectionCard title="Critical Alerts" className="border-danger/20">
            <div className="space-y-3">
              <AlertItem 
                title="High Value Overdue" 
                desc="Acme Corp: ₹ 4.2L (12 days)" 
                type="danger" 
              />
              <AlertItem 
                title="Activation Failure" 
                desc="Enterprise ID: #992831" 
                type="warning" 
              />
              <AlertItem 
                title="Security Event" 
                desc="Multiple failed admin logins" 
                type="danger" 
              />
            </div>
          </SectionCard>

          <SectionCard title="Goal Progress">
            <div className="space-y-4">
              <GoalItem label="Revenue Target" current={42.8} target={50} unit="L" />
              <GoalItem label="New Subscriptions" current={82} target={100} />
              <GoalItem label="Collection Rate" current={98.2} target={100} unit="%" />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

const KPIItem = ({ title, value, trend, trendUp, icon: Icon, subtext }: any) => (
  <div className="p-5 rounded-xl border border-border/40 glass-surface group hover:shadow-elevated transition-all">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</span>
      <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <Icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <h4 className="text-2xl font-black tracking-tighter">{value}</h4>
      <span className={cn("text-[9px] font-bold", trendUp ? "text-success" : "text-danger")}>
        {trendUp ? <ArrowUpRight className="size-2 inline mr-0.5" /> : <TrendingDown className="size-2 inline mr-0.5" />}
        {trend}
      </span>
    </div>
    <p className="mt-1 text-[10px] text-muted-foreground italic">{subtext}</p>
  </div>
);

const StatRow = ({ label, value, status }: any) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className={cn("text-xs font-bold", status === 'success' ? 'text-success' : status === 'danger' ? 'text-danger' : '')}>{value}</span>
  </div>
);

const AlertItem = ({ title, desc, type }: any) => (
  <div className={cn("p-3 rounded-lg border flex items-start gap-3", 
    type === 'danger' ? 'bg-danger/5 border-danger/20' : 'bg-warning/5 border-warning/20'
  )}>
    <AlertTriangle className={cn("size-3 mt-0.5", type === 'danger' ? 'text-danger' : 'text-warning')} />
    <div>
      <h5 className="text-[10px] font-bold uppercase">{title}</h5>
      <p className="text-[10px] opacity-70">{desc}</p>
    </div>
  </div>
);

const GoalItem = ({ label, current, target, unit = '' }: any) => {
  const percent = Math.min(100, (current / target) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px]">
        <span className="font-bold">{label}</span>
        <span className="text-muted-foreground">{current}{unit} / {target}{unit}</span>
      </div>
      <Progress value={percent} className="h-1.5" />
    </div>
  );
};
