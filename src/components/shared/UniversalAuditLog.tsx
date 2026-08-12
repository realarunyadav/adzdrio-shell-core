import * as React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";
import { ShieldCheck, History } from "lucide-react";

export interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  entity: string;
  timestamp: string;
  impact?: "low" | "medium" | "high" | "critical";
}

export function UniversalAuditLog({ entries, className }: { entries: AuditLogEntry[], className?: string }) {
  return (
    <Card className={cn("border-none shadow-sm overflow-hidden bg-transparent", className)}>
      <div className="rounded-xl border border-border/40 overflow-hidden bg-muted/5 backdrop-blur-[2px]">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border/40">
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 h-10">Timestamp</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 h-10">Entity Member</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 h-10">Action Taken</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 h-10">Record Identifier</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 h-10 text-right">Integrity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <TableRow key={entry.id} className="text-[11px] border-border/40 hover:bg-muted/10 premium-transition">
                  <TableCell className="font-bold text-muted-foreground/80 tabular-nums">
                    {entry.timestamp}
                  </TableCell>
                  <TableCell>
                    <span className="font-black text-foreground uppercase tracking-tight">{entry.user}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-muted-foreground/90">{entry.action}</span>
                      {entry.impact && (
                        <div className={cn(
                          "size-1.5 rounded-full",
                          entry.impact === 'critical' ? 'bg-danger animate-pulse' :
                          entry.impact === 'high' ? 'bg-amber-500' :
                          'bg-primary'
                        )} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-primary italic font-medium">
                    {entry.entity}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <ShieldCheck className="size-3.5 text-success/60" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center opacity-30 italic">
                    <History className="size-6 mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Audit stream is empty</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
