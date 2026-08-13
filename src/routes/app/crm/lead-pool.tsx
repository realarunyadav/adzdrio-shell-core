import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Plus, Filter, RefreshCw, Upload, Download, MoreHorizontal, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoLeads, LeadStatus, LeadPriority } from "@/lib/mock/workspace.demo";
import { format } from "date-fns";

export const Route = createFileRoute("/app/crm/lead-pool")({ 
  component: LeadPoolPage 
});

function LeadPoolPage() {
  const [leads] = React.useState(demoLeads);
  const [search, setSearch] = React.useState("");

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="CRM Operations"
        title="Lead Pool"
        description="Shared company leads available for authorized employees."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><RefreshCw className="mr-2 size-3.5" /> Refresh</Button>
            <Button variant="outline" size="sm"><Upload className="mr-2 size-3.5" /> Import</Button>
            <Button variant="outline" size="sm"><Download className="mr-2 size-3.5" /> Export</Button>
            <Button size="sm"><Plus className="mr-2 size-3.5" /> New Lead</Button>
          </div>
        }
      />
      
      <SectionCard contentClassName="p-0">
        <div className="flex items-center justify-between p-4 border-b border-border/40">
           <div className="relative w-full max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
             <Input placeholder="Search leads..." className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />
           </div>
           <Button variant="ghost" size="sm"><Filter className="mr-2 size-4" /> Filters</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Added</TableHead>
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
                <TableCell className="text-xs">{lead.source}</TableCell>
                <TableCell className="text-xs">{lead.business}</TableCell>
                <TableCell><StatusBadge tone={lead.status === 'New' ? 'info' : 'neutral'}>{lead.status}</StatusBadge></TableCell>
                <TableCell><StatusBadge tone={lead.priority === 'High' ? 'danger' : 'neutral'}>{lead.priority}</StatusBadge></TableCell>
                <TableCell className="text-xs text-muted-foreground">{format(new Date(lead.addedDate), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8">Claim</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
