import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoSecurityEvents } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShieldCheck, Lock, Smartphone, Globe, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/modules/admin/security")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="Security Hub"
        description="Monitor system access, verify sessions, and manage enterprise security policies."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SecurityMetricCard title="Active Sessions" value="24" icon={Smartphone} />
        <SecurityMetricCard title="Failed Attempts" value="128" icon={AlertTriangle} tone="danger" />
        <SecurityMetricCard title="MFA Coverage" value="100%" icon={ShieldCheck} tone="success" />
        <SecurityMetricCard title="Protected IP Range" value="12" icon={Globe} />
      </div>

      <div className="rounded-xl border border-border/40 bg-accent/10">
        <div className="p-4 border-b border-border/40 flex justify-between items-center">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recent Security Events</h3>
          <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-tighter">Real-time Stream</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Timestamp</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Event Type</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Actor</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">IP / Location</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoSecurityEvents.map((event) => (
              <TableRow key={event.id} className="border-border/40 hover:bg-accent/30 transition-colors">
                <TableCell className="text-[10px] font-mono text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="text-xs font-bold flex items-center gap-2">
                    <Lock className="size-3 text-muted-foreground" />
                    {event.type}
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium">{event.actor}</TableCell>
                <TableCell>
                  <div className="text-xs">{event.ip}</div>
                  <div className="text-[9px] text-muted-foreground uppercase">{event.location}</div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={cn(
                    "text-[9px] font-black uppercase tracking-tighter h-5",
                    event.status === 'Success' ? "border-emerald-500/20 text-emerald-600" : 
                    event.status === 'Blocked' ? "border-red-500/20 text-red-600" : 
                    "border-amber-500/20 text-amber-600"
                  )}>
                    {event.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});

function SecurityMetricCard({ title, value, icon: Icon, tone = "default" }: any) {
  return (
    <Card className="glass-surface border-border/40">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{title}</p>
            <h4 className={cn(
              "text-2xl font-black",
              tone === "danger" ? "text-red-600" : tone === "success" ? "text-emerald-600" : "text-foreground"
            )}>{value}</h4>
          </div>
          <div className="size-10 rounded-xl bg-accent/50 flex items-center justify-center">
            <Icon className="size-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
