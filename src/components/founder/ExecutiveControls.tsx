import React, { useState, useEffect } from 'react';
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
  Plus,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api/client';

export const ExecutiveControls: React.FC = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadExecutiveData() {
      try {
        setLoading(true);
        // Unified executive data fetch
        const [appr, time, audit] = await Promise.all([
          api.get<Approval[]>('/executive/approvals'),
          api.get<TimelineItem[]>('/executive/timeline'),
          api.get<AuditLogEntry[]>('/executive/audit-logs')
        ]);
        setApprovals(appr);
        setTimeline(time);
        setAuditLogs(audit);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadExecutiveData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground animate-pulse">
        <Loader2 className="size-8 mb-4 animate-spin opacity-20" />
        <p className="text-sm font-medium">Loading Executive Intelligence...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-destructive border border-destructive/20 rounded-xl bg-destructive/5 px-6 text-center">
        <AlertCircle className="size-8 mb-4" />
        <h3 className="text-sm font-bold uppercase tracking-widest">Connection Required</h3>
        <p className="text-xs opacity-70 mt-2 max-w-md">Founder OS requires a direct link to the secure NestJS production backend for executive data authorization.</p>
        <p className="text-[10px] font-mono mt-4 opacity-50">{error}</p>
        <Button variant="outline" size="sm" className="mt-8" onClick={() => window.location.reload()}>Reconnect Command Center</Button>
      </div>
    );
  }

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
              <UniversalApprovalCenter approvals={approvals} />
            </TabsContent>
            
            <TabsContent value="activity">
              <UniversalActivityTimeline items={timeline} />
            </TabsContent>
            
            <TabsContent value="audit">
              <UniversalAuditLog entries={auditLogs} />
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
