import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, History } from "lucide-react";

export const Route = createFileRoute("/settings/audit")({
  component: AuditLogPage,
});

function AuditLogPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Immutable Audit Trail"
        description="System-wide record of all administrative actions and security events."
      />
      <SectionCard title="Recent Audit Records" contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-xs">2026-08-08 21:00:12</TableCell>
              <TableCell className="text-xs">amit.jain@adzdrio.com</TableCell>
              <TableCell className="text-xs">Platform.Roles</TableCell>
              <TableCell className="text-xs font-bold text-danger">Role Change</TableCell>
              <TableCell className="text-xs text-muted-foreground">192.168.1.1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
