import { 
  History, 
  Search, 
  Filter, 
  ArrowLeftRight, 
  Clock, 
  User, 
  ShieldAlert,
  Download,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/SectionCard";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function AdminAuditCenter() {
  const auditLogs = [
    { 
      id: "AUD-1092", 
      user: "super.admin@adzdrio.com", 
      action: "Enabled Inventory Module", 
      module: "Inventory", 
      prev: "Disabled", 
      new: "Active", 
      time: "2026-08-08 14:20:10",
      impact: "High"
    },
    { 
      id: "AUD-1091", 
      user: "finance.admin@adzdrio.com", 
      action: "Updated Tax Threshold", 
      module: "Finance", 
      prev: "₹2,50,000", 
      new: "₹3,00,000", 
      time: "2026-08-08 12:45:00",
      impact: "Medium"
    },
    { 
      id: "AUD-1090", 
      user: "super.admin@adzdrio.com", 
      action: "Modified Role: Dept Head", 
      module: "Roles", 
      prev: "View Only", 
      new: "Edit Permissions", 
      time: "2026-08-08 11:30:45",
      impact: "Critical"
    },
    { 
      id: "AUD-1089", 
      user: "system.bot", 
      action: "Daily Config Backup", 
      module: "Platform", 
      prev: "v1.0.4", 
      new: "v1.0.5", 
      time: "2026-08-08 00:00:01",
      impact: "Low"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search audit trail..." className="pl-9" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-3.5" />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      <SectionCard
        title="Configuration History"
        description="Immutable record of every administrative change within the ABOS environment."
        contentClassName="p-0"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Event ID</TableHead>
              <TableHead>User / Entity</TableHead>
              <TableHead>Action & Module</TableHead>
              <TableHead>Change Details</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id} className="text-sm">
                <TableCell className="font-mono text-[10px]">{log.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold">{log.user.split('@')[0]}</span>
                    <span className="text-[10px] text-muted-foreground">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold">{log.action}</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Badge variant="secondary" className="text-[9px] px-1 h-4 uppercase">{log.module}</Badge>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-[9px] px-1 h-4 uppercase",
                          log.impact === 'Critical' && "border-danger text-danger",
                          log.impact === 'High' && "border-amber-500 text-amber-500"
                        )}
                      >
                        {log.impact}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground line-through decoration-muted-foreground/30">{log.prev}</span>
                    <ArrowLeftRight className="size-3 text-muted-foreground" />
                    <span className="font-bold text-foreground">{log.new}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {log.time}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] uppercase font-bold">
                    <RotateCcw className="mr-1 size-3" /> Rollback
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <div className="rounded-lg border border-border bg-muted/20 p-4 flex items-start gap-3">
        <ShieldAlert className="size-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold uppercase tracking-tight">Data Integrity Notice</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Audit logs are immutable and cryptographically signed. They cannot be deleted or modified, ensuring complete transparency for enterprise compliance audits.
          </p>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
