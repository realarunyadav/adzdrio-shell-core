import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoAuditLogs } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/modules/admin/audit")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="Audit Center"
        description="Immutable record of all system-wide actions, data access, and configuration changes."
      />
      
      <div className="rounded-xl border border-border/40 bg-accent/10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Timestamp</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Actor</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Action</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Module</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoAuditLogs.map((log) => (
              <TableRow key={log.id} className="border-border/40 hover:bg-accent/30 transition-colors">
                <TableCell className="text-[10px] font-mono text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="text-xs font-bold">{log.actorName}</div>
                  <div className="text-[9px] text-muted-foreground uppercase">{log.actorId}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs font-medium">{log.action}</div>
                  <div className="text-[9px] text-muted-foreground">{log.details}</div>
                </TableCell>
                <TableCell className="text-xs">{log.module}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={cn(
                    "text-[9px] font-black uppercase tracking-tighter h-5",
                    log.severity === 'Critical' ? "border-red-500/20 text-red-600" : 
                    log.severity === 'Warning' ? "border-amber-500/20 text-amber-600" : 
                    "border-blue-500/20 text-blue-600"
                  )}>
                    {log.severity}
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
