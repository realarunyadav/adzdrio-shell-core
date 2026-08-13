import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { demoLeads } from "@/lib/mock/workspace.demo";

export const Route = createFileRoute("/app/crm/callbacks")({
  component: CallbacksPage,
});

function CallbacksPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        title="Callbacks"
        description="Manage scheduled customer callbacks and callback requests."
        actions={<Button size="sm"><Plus className="mr-2 size-3.5" /> Add Callback</Button>}
      />
      <SectionCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer / Lead</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoLeads.filter(l => l.callbackDate).map(c => (
              <TableRow key={c.id}>
                <TableCell className="font-bold">{c.name}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{new Date(c.callbackDate!).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Call Now</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
