import * as React from "react";
import { 
  Activity, 
  User, 
  Clock, 
  ExternalLink, 
  FileText, 
  Settings, 
  Shield, 
  Package, 
  TrendingUp,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/SectionCard";
import { cn } from "@/lib/utils";

export interface ActivityEvent {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  record: string;
  module: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'security' | 'financial';
}

const DEMO_ACTIVITIES: ActivityEvent[] = [
  {
    id: '1',
    user: { name: 'Admin User' },
    action: 'Verified Payment',
    record: 'INV-2024-001',
    module: 'Finance',
    timestamp: '5 mins ago',
    type: 'financial'
  },
  {
    id: '2',
    user: { name: 'Jane Cooper' },
    action: 'Changed Status',
    record: 'Lead: Global Media',
    module: 'CRM',
    timestamp: '12 mins ago',
    type: 'update'
  },
  {
    id: '3',
    user: { name: 'System' },
    action: 'Auto-Restock Triggered',
    record: 'SKU-8849',
    module: 'Inventory',
    timestamp: '1 hour ago',
    type: 'create'
  },
  {
    id: '4',
    user: { name: 'Super Admin' },
    action: 'Updated Module Config',
    record: 'Founder OS',
    module: 'Admin',
    timestamp: '3 hours ago',
    type: 'security'
  }
];

export function UniversalActivityCenter() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            Universal Activity Center
          </h3>
          <p className="text-sm text-muted-foreground">Immutable audit trail across all authorized modules.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest glass-surface">
            <Filter className="size-3 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest glass-surface">
            Export Logs
          </Button>
        </div>
      </div>

      <SectionCard title="Live Stream" contentClassName="p-0">
        <ScrollArea className="h-[600px]">
          <div className="divide-y divide-border/40">
            {DEMO_ACTIVITIES.map((activity) => (
              <div 
                key={activity.id} 
                className="p-4 hover:bg-muted/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "size-9 rounded-xl flex items-center justify-center shrink-0 border border-border/40 shadow-sm",
                    activity.type === 'financial' ? "bg-emerald-50 text-emerald-600" :
                    activity.type === 'security' ? "bg-red-50 text-red-600" :
                    activity.type === 'update' ? "bg-blue-50 text-blue-600" :
                    "bg-slate-50 text-slate-600"
                  )}>
                    {activity.type === 'financial' ? <TrendingUp className="size-4" /> :
                     activity.type === 'security' ? <Shield className="size-4" /> :
                     activity.type === 'update' ? <Settings className="size-4" /> :
                     <Activity className="size-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-foreground">{activity.user.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter opacity-50">in</span>
                        <Badge variant="secondary" className="text-[9px] font-black h-4 px-1 leading-none uppercase tracking-tighter">
                          {activity.module}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                          <Clock className="size-3" />
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-muted-foreground/90">
                        {activity.action} <span className="text-foreground font-black underline decoration-primary/30 decoration-2 underline-offset-2">{activity.record}</span>
                      </p>
                      <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SectionCard>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Recent Records">
           <div className="space-y-3">
              {[
                { label: 'Acme Corp Renewal', type: 'Customer' },
                { label: 'INV-2024-001', type: 'Finance' },
                { label: 'Q3 Product Roadmap', type: 'Project' }
              ].map((record, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg glass-surface border border-border/40">
                  <span className="text-xs font-bold truncate pr-2">{record.label}</span>
                  <Badge variant="outline" className="text-[8px] font-black uppercase">{record.type}</Badge>
                </div>
              ))}
           </div>
        </SectionCard>
        
        <SectionCard title="Saved Views">
           <div className="space-y-3">
              {[
                'Critical Security Events',
                'MTD Financial Changes',
                'Lead Assignment History'
              ].map((view, i) => (
                <Button key={i} variant="ghost" className="w-full justify-start h-8 text-xs font-bold border border-transparent hover:border-border/40 px-2">
                  <FileText className="size-3 mr-2 opacity-50" />
                  {view}
                </Button>
              ))}
           </div>
        </SectionCard>

        <SectionCard title="Quick Search History">
           <div className="flex flex-wrap gap-2">
              {['Acme', 'INV-2024', 'Jane Cooper', 'Hub-01', 'Q3 Targets'].map((term, i) => (
                <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-primary/20 transition-colors font-bold text-[10px]">
                  {term}
                </Badge>
              ))}
           </div>
        </SectionCard>
      </div>
    </div>
  );
}
