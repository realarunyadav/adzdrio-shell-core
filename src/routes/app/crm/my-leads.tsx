import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Plus, Filter, RefreshCw, Upload, Download, Phone, MessageSquare, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoLeads } from "@/lib/mock/workspace.demo";
import { format } from "date-fns";

export const Route = createFileRoute("/app/crm/my-leads")({ 
  component: MyLeadsPage 
});

function MyLeadsPage() {
  const [leads] = React.useState(demoLeads.filter(l => l.assignedTo));
  const [search, setSearch] = React.useState("");

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="CRM Operations"
        title="My Leads"
        description="Leads currently assigned to your account."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><RefreshCw className="mr-2 size-3.5" /> Refresh</Button>
            <Button size="sm"><Plus className="mr-2 size-3.5" /> Add Lead</Button>
          </div>
        }
      />
      
      <SectionCard contentClassName="p-0">
        <div className="flex items-center justify-between p-4 border-b border-border/40">
           <div className="relative w-full max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
             <Input placeholder="Search my leads..." className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />
           </div>
           <Button variant="ghost" size="sm"><Filter className="mr-2 size-4" /> Filters</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Next Follow-up</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map(lead => (
              <TableRow key={lead.id}>
                <TableCell>
                  <p className="text-xs font-bold">{lead.name}</p>
                  <p className="text-[10px] text-muted-foreground">{lead.email}</p>
                </TableCell>
                <TableCell><StatusBadge tone="premium">{lead.status}</StatusBadge></TableCell>
                <TableCell><StatusBadge tone={lead.priority === 'High' ? 'danger' : 'neutral'}>{lead.priority}</StatusBadge></TableCell>
                <TableCell className="text-xs text-muted-foreground">{format(new Date(lead.lastActivity), "MMM dd, HH:mm")}</TableCell>
                <TableCell className="text-xs font-bold text-primary">{lead.nextFollowUp ? format(new Date(lead.nextFollowUp), "MMM dd, HH:mm") : "—"}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="size-8"><Phone className="size-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="size-8"><MessageSquare className="size-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-3.5" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
