import React from 'react';
import { SectionCard } from '@/components/shared/SectionCard';
import { 
  Briefcase, 
  DollarSign, 
  RefreshCcw, 
  LifeBuoy, 
  Rocket, 
  Users, 
  ShieldAlert,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const BusinessBrief: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-6">
        <SectionCard 
          title="Today's Verified Business Facts" 
          description="Direct extraction from ABOS modules"
          actions={<Badge className="bg-success/10 text-success border-none text-[10px]">Aug 8, 2026</Badge>}
        >
          <div className="space-y-4">
            <FactItem 
              icon={DollarSign}
              title="Significant Collections"
              desc="Deemand Solutions (₹ 8.4L), Acme Corp (₹ 1.2L)"
              time="Updated 4m ago"
              tone="success"
            />
            <FactItem 
              icon={Rocket}
              title="New Sales"
              desc="3 New Standard Subscriptions, 1 Enterprise Lead Qualified"
              time="Updated 12m ago"
              tone="info"
            />
            <FactItem 
              icon={RefreshCcw}
              title="Renewals Due Today"
              desc="4 Accounts (₹ 2.8L Total Pipeline). 2 Processed, 2 Pending."
              time="Updated 1h ago"
              tone="warning"
            />
            <FactItem 
              icon={LifeBuoy}
              title="Support & Activations"
              desc="1 Critical Ticket (Finance), 4 Pending Activations (avg SLA 2h)"
              time="Updated 2h ago"
              tone="danger"
            />
          </div>
        </SectionCard>

        <SectionCard 
          title="Team & Operations Intelligence"
          className="bg-primary/5 border-primary/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-3">
               <h5 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Attendance & Pulse</h5>
               <div className="flex items-center justify-between p-3 rounded-lg glass-surface border border-border/40">
                 <span className="text-xs">Sales Team</span>
                 <Badge variant="outline" className="text-[10px]">92% Present</Badge>
               </div>
               <div className="flex items-center justify-between p-3 rounded-lg glass-surface border border-border/40">
                 <span className="text-xs">Support Desk</span>
                 <Badge variant="outline" className="text-[10px]">100% Present</Badge>
               </div>
             </div>
             <div className="space-y-3">
               <h5 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">System Health</h5>
               <div className="flex items-center justify-between p-3 rounded-lg glass-surface border border-border/40">
                 <span className="text-xs">API Latency</span>
                 <span className="text-xs font-bold text-success">42ms</span>
               </div>
               <div className="flex items-center justify-between p-3 rounded-lg glass-surface border border-border/40">
                 <span className="text-xs">Database Ops</span>
                 <span className="text-xs font-bold text-success">Healthy</span>
               </div>
             </div>
          </div>
        </SectionCard>
      </div>

      <div className="lg:col-span-4">
        <SectionCard 
          title="AI Executive Interpretation"
          actions={<Sparkles className="size-4 text-primary" />}
          className="h-full border-primary/20"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <h5 className="text-xs font-bold">Strategic Summary</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Today is performing <span className="text-success font-bold">14% above projection</span> primarily due to early collections from Deemand Solutions. 
                Support load is concentrated on Finance-related queries, likely linked to the new GST update deployed yesterday.
              </p>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-border/40">
              <h5 className="text-xs font-bold">Recommended Actions</h5>
              <ActionTask label="Review Finance SLA" priority="High" />
              <ActionTask label="Congratulate Sales (Deemand)" priority="Medium" />
              <ActionTask label="Audit Expiring Trials (4)" priority="Medium" />
            </div>

            <div className="mt-auto pt-6 italic text-[9px] text-muted-foreground">
              Note: This interpretation is generated based on real-time data from Finance, Support, and CRM modules.
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

const FactItem = ({ icon: Icon, title, desc, time, tone }: any) => {
  const toneClasses = {
    success: 'text-success bg-success/10',
    info: 'text-info bg-info/10',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
  };
  return (
    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/5 transition-colors border border-transparent hover:border-border/40 group">
      <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${toneClasses[tone as keyof typeof toneClasses]}`}>
        <Icon className="size-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold">{title}</h4>
          <span className="text-[9px] text-muted-foreground">{time}</span>
        </div>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <ChevronRight className="size-3 self-center opacity-0 group-hover:opacity-40 transition-opacity" />
    </div>
  );
};

const ActionTask = ({ label, priority }: any) => (
  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors cursor-pointer group">
    <span className="text-xs group-hover:translate-x-1 transition-transform">{label}</span>
    <Badge variant="outline" className={cn(
      "text-[8px] px-1.5 py-0 border-none",
      priority === 'High' ? 'bg-danger/10 text-danger' : 'bg-muted text-muted-foreground'
    )}>{priority}</Badge>
  </div>
);

import { cn } from '@/lib/utils';
