import { 
  Zap, 
  Settings, 
  Bell, 
  Mail, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  Copy,
  Trash2,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/SectionCard";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function WorkflowBuilder() {
  const workflows = [
    { name: "Sales Creation", trigger: "Payment Verified", actions: 3, status: "Active", lastRun: "10 mins ago" },
    { name: "Account Activation", trigger: "Sale Created", actions: 2, status: "Active", lastRun: "2 hours ago" },
    { name: "Risk Alert", trigger: "Refund Initiated", actions: 4, status: "Active", lastRun: "1 day ago" },
    { name: "Inventory Reorder", trigger: "Stock Low", actions: 2, status: "Inactive", lastRun: "Never" },
  ];

  return (
    <div className="space-y-6">
      <SectionCard
        title="Active Workflows"
        description="Visual automation rules for cross-module business logic orchestration."
        actions={
          <Button size="sm">
            <Plus className="mr-2 size-3.5" />
            New Workflow
          </Button>
        }
      >
        <div className="space-y-3">
          {workflows.map((wf, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/10 hover:bg-muted/20 transition-colors">
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="size-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">{wf.name}</p>
                    <StatusBadge tone={wf.status === 'Active' ? 'success' : 'neutral'}>{wf.status}</StatusBadge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tight">
                    Trigger: <span className="text-foreground">{wf.trigger}</span> • {wf.actions} Actions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right mr-4">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Last Execution</p>
                  <p className="text-xs font-medium">{wf.lastRun}</p>
                </div>
                <Button variant="ghost" size="icon" className="size-8"><Play className="size-3.5" /></Button>
                <Button variant="ghost" size="icon" className="size-8"><Settings className="size-3.5" /></Button>
                <Button variant="ghost" size="icon" className="size-8 text-danger"><Trash2 className="size-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard
          title="Workflow Designer Preview"
          description="Drag-and-drop nodes to define triggers, conditions, and actions."
        >
          <div className="relative h-[300px] rounded-md border border-dashed border-border flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,transparent,black)] opacity-10" />
            
            <div className="z-10 flex flex-col items-center gap-4">
              <div className="p-3 bg-background border border-border rounded-lg shadow-sm flex items-center gap-2">
                <div className="size-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Bell className="size-3 text-emerald-500" />
                </div>
                <span className="text-xs font-bold uppercase">Trigger: Payment Verified</span>
              </div>
              
              <div className="h-6 w-px bg-border" />
              
              <div className="p-3 bg-background border border-border rounded-lg shadow-sm flex items-center gap-2">
                <div className="size-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Zap className="size-3 text-blue-500" />
                </div>
                <span className="text-xs font-bold uppercase">Action: Create Sale</span>
              </div>
              
              <div className="h-6 w-px bg-border" />
              
              <div className="p-3 bg-background border border-border rounded-lg shadow-sm flex items-center gap-2">
                <div className="size-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Mail className="size-3 text-amber-500" />
                </div>
                <span className="text-xs font-bold uppercase">Action: Notify Team</span>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Incentive Builder"
          description="Configure achievement-based rewards for employees (Not 'Commissions')."
        >
          <div className="space-y-4">
            <div className="p-3 rounded-lg border border-border bg-background space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Q3 Performance Bonus</p>
                <Badge variant="outline" className="text-[10px] uppercase">Active</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="text-muted-foreground">Target: <span className="text-foreground font-bold">₹10L Revenue</span></div>
                <div className="text-muted-foreground text-right">Reward: <span className="text-foreground font-bold">2.5% incentive</span></div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Scope: Sales Team</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-[10px] uppercase font-bold">Manage Rules</Button>
              </div>
            </div>

            <Button variant="outline" className="w-full" size="sm">
              <Plus className="mr-2 size-3" /> Create New Incentive Program
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
