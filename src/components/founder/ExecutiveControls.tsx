import React from 'react';
import { SectionCard } from '@/components/shared/SectionCard';
import { UniversalActivityTimeline, TimelineItem } from '@/components/shared/UniversalActivityTimeline';
import { UniversalApprovalCenter, Approval } from '@/components/shared/UniversalApprovalCenter';
import { UniversalAuditLog, AuditLogEntry } from '@/components/shared/UniversalAuditLog';
import { 
  ShieldCheck, 
  Lock, 
  Settings2, 
  Eye, 
  Layout,
  Activity,
  Plus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for Founder view
const mockApprovals: Approval[] = [
  { id: '1', type: 'Finance', description: 'Procurement: New Server Cluster (₹ 12.4L)', user: 'Amit Sharma', amount: '₹ 12.4L' },
  { id: '2', type: 'HR', description: 'Offer Approval: Lead AI Engineer', user: 'Priya Verma' },
  { id: '3', type: 'Finance', description: 'Marketing Campaign Q3 Budget (₹ 8.5L)', user: 'Rahul Gupta', amount: '₹ 8.5L' }
];

const mockTimeline: TimelineItem[] = [
  { 
    id: '1', 
    type: 'Sale', 
    title: 'Enterprise Deal Closed', 
    description: 'Deemand Solutions signed 24-month contract.', 
    timestamp: '12m ago',
    user: { name: 'Rajesh K', initials: 'RK' },
    category: 'crm'
  },
  { 
    id: '2', 
    type: 'Finance', 
    title: 'Payment Received', 
    description: 'Acme Corp cleared invoice #INV-2026-992 (₹ 4.2L).', 
    timestamp: '1h ago',
    user: { name: 'System', initials: 'SY' },
    category: 'finance'
  },
  { 
    id: '3', 
    type: 'System', 
    title: 'Configuration Changed', 
    description: 'Founder OS Dashboard Layout updated.', 
    timestamp: '2h ago',
    user: { name: 'Admin', initials: 'AD' },
    category: 'system'
  }
];

const mockAuditLogs: AuditLogEntry[] = [
  { id: '1', user: 'Admin', action: 'Login', entity: 'System', timestamp: '2026-08-08 20:42' },
  { id: '2', user: 'Rajesh K', action: 'Update', entity: 'Lead: Deemand Solutions', timestamp: '2026-08-08 20:30' },
  { id: '3', user: 'Priya Verma', action: 'Create', entity: 'Job Post: Lead AI Engineer', timestamp: '2026-08-08 19:15' }
];

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
              <UniversalApprovalCenter approvals={mockApprovals} />
            </TabsContent>
            
            <TabsContent value="activity">
              <UniversalActivityTimeline items={mockTimeline} />
            </TabsContent>
            
            <TabsContent value="audit">
              <UniversalAuditLog entries={mockAuditLogs} />
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
