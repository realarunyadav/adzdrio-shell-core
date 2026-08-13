import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, Clock, AlertTriangle } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { demoLeads } from "@/lib/mock/workspace.demo";

export const Route = createFileRoute("/app/crm/follow-ups")({
  component: FollowUpsPage,
});

function FollowUpsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        title="Follow-ups"
        description="Manage scheduled customer and lead follow-ups."
        actions={<Button size="sm"><Plus className="mr-2 size-3.5" /> Add Follow-up</Button>}
      />
      <SectionCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer / Lead</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoLeads.filter(l => l.nextFollowUp).map(f => (
              <TableRow key={f.id}>
                <TableCell className="font-bold">{f.name}</TableCell>
                <TableCell>{new Date(f.nextFollowUp!).toLocaleDateString()}</TableCell>
                <TableCell><StatusBadge tone={f.priority === 'High' ? 'danger' : 'neutral'}>{f.priority}</StatusBadge></TableCell>
                <TableCell><StatusBadge tone="warning">Pending</StatusBadge></TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Complete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
