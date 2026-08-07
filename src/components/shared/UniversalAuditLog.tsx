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

export interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  entity: string;
  timestamp: string;
}

export function UniversalAuditLog({ entries }: { entries: AuditLogEntry[] }) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="text-xs font-bold text-slate-500">Date</TableHead>
            <TableHead className="text-xs font-bold text-slate-500">User</TableHead>
            <TableHead className="text-xs font-bold text-slate-500">Action</TableHead>
            <TableHead className="text-xs font-bold text-slate-500">Entity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id} className="text-xs hover:bg-slate-50/50">
              <TableCell className="font-medium">{entry.timestamp}</TableCell>
              <TableCell className="font-bold">{entry.user}</TableCell>
              <TableCell>{entry.action}</TableCell>
              <TableCell className="text-slate-500">{entry.entity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
