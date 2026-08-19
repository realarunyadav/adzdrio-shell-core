import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  RefreshCw, 
  Phone, 
  Clock, 
  AlertCircle, 
  Eye, 
  PhoneCall, 
  MoreVertical 
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RapidLead } from "@/lib/api/services.types";
import { format } from "date-fns";
import { LeadDetailsDrawer } from "@/components/crm/LeadDetailsDrawer";
import { toast } from "sonner";
import { SkeletonTable } from "@/components/shared/SkeletonLoader";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { leadsService } from "@/lib/api/services";



export const Route = createFileRoute("/app/crm/callbacks")({
  component: CallbacksPage,
});

function CallbacksPage() {
  const [selectedLead, setSelectedLead] = React.useState<RapidLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("today");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["leads", "callbacks"],
    queryFn: () => leadsService.list({ status: "confirmed" }),
  });

  const handleRefresh = async () => {
    await refetch();
    toast.success("Callbacks list refreshed");
  };

  const openDetails = (lead: RapidLead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const allCallbacks = data?.items || [];
  
  const filteredCallbacks = allCallbacks.filter((lead) => {
    // Basic filter for now
    return true;
  });




  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        title="Callbacks"
        description="Manage scheduled customer callbacks and callback requests."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={cn("mr-2 size-3.5", isLoading && "animate-spin")} /> Refresh
            </Button>

            <Button size="sm" className="shadow-lg shadow-primary/20"><Plus className="mr-2 size-3.5" /> Add Callback</Button>
          </div>
        }
      />

      <div className="flex items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-muted/50 border border-border/40 h-10 p-1">
            <TabsTrigger value="today" className="text-[10px] font-black uppercase tracking-widest px-4 h-8">Due Today</TabsTrigger>
            <TabsTrigger value="upcoming" className="text-[10px] font-black uppercase tracking-widest px-4 h-8">Upcoming</TabsTrigger>
            <TabsTrigger value="overdue" className="text-[10px] font-black uppercase tracking-widest px-4 h-8 text-red-500">Overdue</TabsTrigger>
            <TabsTrigger value="completed" className="text-[10px] font-black uppercase tracking-widest px-4 h-8">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input placeholder="Search callbacks..." className="pl-9 h-9 text-xs" />
          </div>
          <Button variant="outline" size="sm" className="h-9"><Filter className="mr-2 size-3.5" /> Filters</Button>
        </div>
      </div>
      
      <SectionCard contentClassName="p-0">
        {isLoading ? (
          <div className="p-8"><SkeletonTable /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead className="text-[10px] font-black uppercase tracking-widest px-6">Customer / Lead</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Business</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Phone</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Assigned</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Requested By</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Scheduled For</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCallbacks.map((lead: RapidLead) => {
                return (
                  <TableRow key={lead.id} className="border-border/40 group hover:bg-muted/30 transition-colors">
                    <TableCell className="px-6">
                      <button onClick={() => openDetails(lead)} className="text-left outline-none">
                        <p className="text-xs font-black group-hover:text-primary transition-colors">{lead.customerName}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{lead.notes || 'General Inquiry'}</p>
                      </button>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-muted-foreground uppercase">{lead.business}</TableCell>
                    <TableCell className="text-xs font-bold">{lead.customerPhone}</TableCell>
                    <TableCell className="text-[11px] font-medium">{lead.assignedToName || 'Unassigned'}</TableCell>
                    <TableCell>
                       <StatusBadge tone="neutral" className="text-[9px]">System</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5 text-[11px] font-bold">
                        <span className="flex items-center gap-1.5">
                          {format(new Date(lead.createdAt), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone="info">
                        Requested
                      </StatusBadge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-1">
                         <Button variant="secondary" size="sm" className="h-7 px-3 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/10 bg-primary text-white hover:bg-primary/90 gap-1.5">
                           <PhoneCall className="size-3" /> Call Now
                         </Button>
                         <Button variant="ghost" size="icon" className="size-7" onClick={() => openDetails(lead)}>
                           <Eye className="size-3.5" />
                         </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

              {filteredCallbacks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                      <Phone className="size-10 mb-2" />
                      <p className="text-xs font-black uppercase tracking-widest">No callbacks found</p>
                      <p className="text-[10px] font-medium max-w-[200px] mx-auto">There are no callback requests for the selected criteria.</p>
                    </div>
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
    </div>
  );
}
