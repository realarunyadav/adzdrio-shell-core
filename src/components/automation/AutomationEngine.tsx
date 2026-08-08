import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Play, Filter, Plus, Clock, History, AlertCircle, CheckCircle2, ChevronRight, MoreVertical } from "lucide-react";
import { mockWorkflows, mockExecutions } from "./mockData";
import { TRIGGER_LABELS, ACTION_LABELS } from "./types";
import { cn } from "@/lib/utils";

export function AutomationEngine() {
  const [workflows] = useState(mockWorkflows);
  const [executions] = useState(mockExecutions);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">Automation Center</h2>
        <Button size="sm" className="shadow-elevated">
          <Plus className="mr-2 size-4" />
          Create Workflow
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Success Rate" value="98.2%" icon={CheckCircle2} color="text-success" />
        <MetricCard title="Active Workflows" value="12" icon={Zap} color="text-primary" />
        <MetricCard title="Recent Executions" value="1,775" icon={History} color="text-info" />
        <MetricCard title="Failed Executions" value="3" icon={AlertCircle} color="text-destructive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Workflows */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Active Workflows</h3>
          <div className="space-y-2">
            {workflows.map((wf) => (
              <Card key={wf.id} className="surface-card hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm">{wf.name}</h4>
                      <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-none">v{wf.version}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{wf.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black">{wf.successRate}%</div>
                    <p className="text-[10px] text-muted-foreground uppercase">Success</p>
                  </div>
                  <Button variant="ghost" size="icon" className="size-8"><MoreVertical className="size-4" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Execution History */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Execution History</h3>
          <Card className="surface-card">
            <CardContent className="p-0">
              {executions.map((ex) => (
                <div key={ex.id} className="p-4 border-b border-border/40 last:border-0 flex items-start gap-3">
                  <div className={cn("size-2 mt-1.5 rounded-full shrink-0", ex.status === 'success' ? 'bg-success' : 'bg-destructive')} />
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-bold">{ex.workflowName}</p>
                    <p className="text-[10px] text-muted-foreground italic truncate">{ex.recordName}</p>
                  </div>
                  <div className="text-[10px] text-muted-foreground">{new Date(ex.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="surface-card border-border/40">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
          <h4 className="text-xl font-black mt-1">{value}</h4>
        </div>
        <div className={cn("size-8 rounded-lg bg-muted flex items-center justify-center", color)}>
          <Icon className="size-4" />
        </div>
      </CardContent>
    </Card>
  );
}
