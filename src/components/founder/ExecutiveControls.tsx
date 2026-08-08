import React from 'react';
import { SectionCard } from '@/components/shared/SectionCard';
import { UniversalActivityTimeline } from '@/components/shared/UniversalActivityTimeline';
import { UniversalApprovalCenter } from '@/components/shared/UniversalApprovalCenter';
import { UniversalAuditLog } from '@/components/shared/UniversalAuditLog';
import { 
  ShieldCheck, 
  Lock, 
  Settings2, 
  Eye, 
  Layout,
  Activity
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ExecutiveControls: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Tabs defaultValue="approvals" className="w-full">
            <TabsList className="bg-muted/50 border border-border/40 p-1 mb-6">
              <TabsTrigger value="approvals" className="text-[10px] font-bold uppercase tracking-tight px-6">Executive Approvals</TabsTrigger>
              <TabsTrigger value="activity" className="text-[10px] font-bold uppercase tracking-tight px-6">Company Activity</TabsTrigger>
              <TabsTrigger value="audit" className="text-[10px] font-bold uppercase tracking-tight px-6">System Audit</TabsTrigger>
            </TabsList>
            
            <TabsContent value="approvals">
              <UniversalApprovalCenter />
            </TabsContent>
            
            <TabsContent value="activity">
              <UniversalActivityTimeline />
            </TabsContent>
            
            <TabsContent value="audit">
              <UniversalAuditLog />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="Dashboard Configuration">
            <div className="space-y-4">
              <p className="text-[11px] text-muted-foreground italic">Personalize your executive workspace layout.</p>
              <div className="grid grid-cols-2 gap-2">
                <ConfigButton icon={Layout} label="Edit Layout" />
                <ConfigButton icon={Plus} label="Add Widget" />
                <ConfigButton icon={Eye} label="Visibility" />
                <ConfigButton icon={Settings2} label="Settings" />
              </div>
              <Button className="w-full text-xs h-9 font-bold bg-primary/10 text-primary hover:bg-primary/20 border-none shadow-none">Save Personal Layout</Button>
            </div>
          </SectionCard>

          <SectionCard title="Security & Compliance" className="border-primary/20 bg-primary/5">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <ShieldCheck className="size-4 text-success" />
                   <span className="text-xs font-bold">RBAC Enforcement</span>
                 </div>
                 <Badge className="bg-success/10 text-success border-none text-[8px]">Active</Badge>
               </div>
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Lock className="size-4 text-primary" />
                   <span className="text-xs font-bold">Data Scoping</span>
                 </div>
                 <Badge className="bg-success/10 text-success border-none text-[8px]">Strict</Badge>
               </div>
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Activity className="size-4 text-primary" />
                   <span className="text-xs font-bold">Audit Logging</span>
                 </div>
                 <Badge className="bg-success/10 text-success border-none text-[8px]">Full</Badge>
               </div>
               <p className="text-[9px] text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                 Founder OS respects all enterprise security protocols. Sensitive PII is redacted based on your specific permission level.
               </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

const ConfigButton = ({ icon: Icon, label }: any) => (
  <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/40 hover:bg-muted/30 transition-all group gap-2">
    <Icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

import { Plus } from 'lucide-react';
