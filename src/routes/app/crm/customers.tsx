import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, Download, MoreHorizontal, Eye, Phone, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { demoLeads } from "@/lib/mock/workspace.demo";

export const Route = createFileRoute("/app/crm/customers")({
  component: CustomersPage,
});

function CustomersPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        title="Customers"
        description="Customers and converted accounts managed across the CRM."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 size-3.5" /> Export</Button>
            <Button size="sm" className="shadow-lg shadow-primary/20"><Plus className="mr-2 size-3.5" /> Add Customer</Button>
          </div>
        }
      />
      <SectionCard contentClassName="p-0">
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <Input placeholder="Search customers..." className="max-w-xs h-9" />
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Filter className="mr-2 size-3.5" /> Filters</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoLeads.filter(l => l.status === 'Converted').map(c => (
              <TableRow key={c.id}>
                <TableCell className="font-bold">{c.name}</TableCell>
                <TableCell>{c.business}</TableCell>
                <TableCell><StatusBadge tone="success">Converted</StatusBadge></TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon"><Eye className="size-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
