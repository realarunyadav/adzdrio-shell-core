import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Plus, Filter, RefreshCw, Phone, MessageSquare, ArrowRight, Upload, Calendar, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RapidLead } from "@/lib/api/services.types";
import { format } from "date-fns";
import { LeadDetailsDrawer } from "@/components/crm/LeadDetailsDrawer";
import { ImportLeadsDrawer } from "@/components/crm/ImportLeadsDrawer";
import { toast } from "sonner";
import { SkeletonTable } from "@/components/shared/SkeletonLoader";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { leadsService } from "@/lib/api/services";
import { useAuth } from "@/lib/auth/AuthProvider";


export const Route = createFileRoute("/app/crm/my-leads")({ 
  component: MyLeadsPage 
});

function MyLeadsPage() {
  const { user } = useAuth();
  const [search, setSearch] = React.useState("");
  const [selectedLead, setSelectedLead] = React.useState<RapidLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isImportDrawerOpen, setIsImportDrawerOpen] = React.useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["leads", "my-leads", user?.id],
    queryFn: () => leadsService.list({ assignedToMe: "true" }),
    enabled: !!user?.id,
  });

  const handleRefresh = async () => {
    await refetch();
    toast.success("Lead data synchronized");
  };

  const openDetails = (lead: RapidLead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const leads = data?.items || [];

  const filteredLeads = leads.filter(
    (l) =>
      l.customerName.toLowerCase().includes(search.toLowerCase()) ||
      l.customerEmail.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="CRM Operations"
        title="My Leads"
        description="Active leads currently assigned to you for management."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={cn("mr-2 size-3.5", loading && "animate-spin")} /> Sync
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsImportDrawerOpen(true)}>
              <Upload className="mr-2 size-3.5" /> Import
            </Button>
            <Button size="sm" className="shadow-lg shadow-primary/20"><Plus className="mr-2 size-3.5" /> Add Lead</Button>
          </div>
        }
      />
      
      <SectionCard contentClassName="p-0">
        <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/5">
           <div className="flex items-center gap-4 flex-1">
             <div className="relative w-full max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
               <Input placeholder="Search my leads..." className="pl-9 h-9 border-border/40" value={search} onChange={e => setSearch(e.target.value)} />
             </div>
             <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-9 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-border/40">
                  <Filter className="mr-2 size-3.5" /> Filters
                </Button>
                <div className="h-4 w-px bg-border/40 mx-1" />
                <Button variant="ghost" size="sm" className="h-9 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bulk Actions</Button>
             </div>
           </div>
           <div className="flex items-center gap-2 px-4 border-l border-border/40 h-9 hidden lg:flex">
             <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Lead Limit:</span>
             <Badge variant="outline" className="h-5 text-[10px] font-black px-2">24 / 50</Badge>
           </div>
        </div>

        {loading ? (
          <div className="p-8"><SkeletonTable /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead className="text-[10px] font-black uppercase tracking-widest px-6">Customer / Lead</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Priority</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Last Activity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Next Follow-up</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Callback</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map(lead => (
                <TableRow key={lead.id} className="border-border/40 group hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6">
                    <button onClick={() => openDetails(lead)} className="text-left outline-none">
                      <p className="text-xs font-black group-hover:text-primary transition-colors">{lead.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{lead.business}</span>
                        <div className="size-0.5 rounded-full bg-border" />
                        <span className="text-[10px] text-muted-foreground/70 font-medium">{lead.email}</span>
                      </div>
                    </button>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone="premium">{lead.status}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={lead.priority === 'High' ? 'danger' : 'neutral'}>{lead.priority}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3 text-muted-foreground/40" />
                      {format(new Date(lead.lastActivity), "MMM dd, HH:mm")}
                    </div>
                  </TableCell>
                  <TableCell>
                    {lead.nextFollowUp ? (
                      <div className="flex items-center gap-1.5 text-[11px] font-black text-primary">
                        <Calendar className="size-3" />
                        {format(new Date(lead.nextFollowUp), "MMM dd, HH:mm")}
                      </div>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {lead.callbackDate ? (
                      <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-600">
                        <Phone className="size-3" />
                        {format(new Date(lead.callbackDate), "MMM dd, HH:mm")}
                      </div>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button variant="secondary" size="icon" className="size-8 rounded-full shadow-sm hover:bg-primary hover:text-white transition-all">
                        <Phone className="size-3.5" />
                      </Button>
                      <Button variant="secondary" size="icon" className="size-8 rounded-full shadow-sm">
                        <MessageSquare className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={() => openDetails(lead)}>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center text-muted-foreground italic text-xs">
                    You have no active leads matching this search.
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
      />

      <ImportLeadsDrawer
        open={isImportDrawerOpen}
        onOpenChange={setIsImportDrawerOpen}
      />
    </div>
  );
}

// Removing local cn
