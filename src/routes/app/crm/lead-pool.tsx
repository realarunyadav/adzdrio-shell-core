import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Plus, Filter, RefreshCw, Upload, Download, MoreHorizontal, UserPlus, FileText, ChevronRight, Eye } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoLeads, DemoLead } from "@/lib/mock/workspace.demo";
import { format } from "date-fns";
import { LeadDetailsDrawer } from "@/components/crm/LeadDetailsDrawer";
import { ClaimConfirmationModal } from "@/components/crm/ClaimConfirmationModal";
import { ImportLeadsDrawer } from "@/components/crm/ImportLeadsDrawer";
import { toast } from "sonner";
import { SkeletonTable } from "@/components/shared/SkeletonLoader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/crm/lead-pool")({ 
  component: LeadPoolPage 
});

function LeadPoolPage() {
  const [leads, setLeads] = React.useState<DemoLead[]>(demoLeads);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedLead, setSelectedLead] = React.useState<DemoLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = React.useState(false);
  const [isImportDrawerOpen, setIsImportDrawerOpen] = React.useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Lead pool refreshed");
    }, 1000);
  };

  const openDetails = (lead: DemoLead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleClaimInitiate = (lead: DemoLead) => {
    setSelectedLead(lead);
    setIsClaimModalOpen(true);
  };

  const handleClaimConfirm = () => {
    if (!selectedLead) return;
    
    // Prototype only: update local state
    setLeads(prev => prev.map(l => 
      l.id === selectedLead.id 
        ? { ...l, assignedTo: 'user-1', assignedToName: 'Me' } 
        : l
    ));
    
    setIsClaimModalOpen(false);
    setIsDrawerOpen(false);
    toast.success(`${selectedLead.name} successfully claimed`);
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.business.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="CRM Operations"
        title="Lead Pool"
        description="Shared company leads available for authorized employees."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={cn("mr-2 size-3.5", loading && "animate-spin")} /> Refresh
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex"><Upload className="mr-2 size-3.5" /> Import Leads</Button>
            <Button variant="outline" size="sm" className="hidden lg:flex"><Download className="mr-2 size-3.5" /> Export</Button>
            <Button size="sm" className="shadow-lg shadow-primary/20"><Plus className="mr-2 size-3.5" /> New Lead</Button>
          </div>
        }
      />
      
      <SectionCard contentClassName="p-0">
        <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/5">
           <div className="flex items-center gap-4 flex-1">
             <div className="relative w-full max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
               <Input placeholder="Search lead pool..." className="pl-9 h-9 border-border/40 focus:ring-primary/20" value={search} onChange={e => setSearch(e.target.value)} />
             </div>
             <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-9 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-border/40">
                  <Filter className="mr-2 size-3.5" /> Filters
                </Button>
                <div className="h-4 w-px bg-border/40 mx-1" />
                <Button variant="ghost" size="sm" className="h-9 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bulk Actions</Button>
             </div>
           </div>
        </div>

        {loading ? (
          <div className="p-8"><SkeletonTable /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead className="text-[10px] font-black uppercase tracking-widest px-6">Lead</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Source</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Business</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Priority</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Added</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Assignment</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map(lead => (
                <TableRow key={lead.id} className="border-border/40 group hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6">
                    <button onClick={() => openDetails(lead)} className="text-left outline-none">
                      <p className="text-xs font-black group-hover:text-primary transition-colors">{lead.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{lead.email}</p>
                    </button>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{lead.source}</TableCell>
                  <TableCell className="text-xs font-medium">{lead.business}</TableCell>
                  <TableCell>
                    <StatusBadge tone={lead.status === 'New' ? 'info' : 'neutral'}>{lead.status}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={lead.priority === 'High' ? 'danger' : 'neutral'}>{lead.priority}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground font-medium">{format(new Date(lead.addedDate), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    {lead.assignedTo ? (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                        <UserPlus className="size-3" /> {lead.assignedToName}
                      </div>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-2">
                       {!lead.assignedTo && (
                         <Button variant="secondary" size="sm" className="h-7 px-3 text-[9px] font-black uppercase tracking-widest shadow-sm" onClick={() => handleClaimInitiate(lead)}>
                           Claim
                         </Button>
                       )}
                       <Button variant="ghost" size="icon" className="size-7" onClick={() => openDetails(lead)}>
                         <Eye className="size-3.5" />
                       </Button>
                       <Button variant="ghost" size="icon" className="size-7">
                         <MoreHorizontal className="size-3.5" />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-48 text-center text-muted-foreground italic text-xs">
                    No leads found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <LeadDetailsDrawer 
        lead={selectedLead} 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        onClaim={handleClaimInitiate}
      />

      <ClaimConfirmationModal
        open={isClaimModalOpen}
        onOpenChange={setIsClaimModalOpen}
        onConfirm={handleClaimConfirm}
        leadName={selectedLead?.name || ""}
      />

      <ImportLeadsDrawer 
        open={isImportDrawerOpen}
        onOpenChange={setIsImportDrawerOpen}
      />
    </div>
  );
}

// Removing local cn as we import from @/lib/utils now
