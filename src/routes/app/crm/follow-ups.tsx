import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  RefreshCw, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Eye, 
  Mail, 
  Phone, 
  MessageSquare,
  MoreVertical,
  Check
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RapidLead } from "@/lib/api/services.types";
import { format, isPast, isToday, parseISO } from "date-fns";
import { LeadDetailsDrawer } from "@/components/crm/LeadDetailsDrawer";
import { toast } from "sonner";
import { SkeletonTable } from "@/components/shared/SkeletonLoader";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export const Route = createFileRoute("/app/crm/follow-ups")({
  component: FollowUpsPage,
});

function FollowUpsPage() {
  const [loading, setLoading] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState<RapidLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("today");

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Follow-ups refreshed");
    }, 1000);
  };

  const openDetails = (lead: RapidLead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const allFollowUps: RapidLead[] = [];
  
  const filteredFollowUps = allFollowUps;


  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        title="Follow-ups"
        description="Manage scheduled customer and lead follow-ups."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={cn("mr-2 size-3.5", loading && "animate-spin")} /> Refresh
            </Button>
            <Button size="sm" className="shadow-lg shadow-primary/20"><Plus className="mr-2 size-3.5" /> Add Follow-up</Button>
          </div>
        }
      />

      <div className="flex items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-muted/50 border border-border/40 h-10 p-1">
            <TabsTrigger value="today" className="text-[10px] font-black uppercase tracking-widest px-4 h-8">Due Today</TabsTrigger>
            <TabsTrigger value="upcoming" className="text-[10px] font-black uppercase tracking-widest px-4 h-8">Upcoming</TabsTrigger>
            <TabsTrigger value="overdue" className="text-[10px] font-black uppercase tracking-widest px-4 h-8 text-red-500 data-[state=active]:bg-red-500/10">Overdue</TabsTrigger>
            <TabsTrigger value="completed" className="text-[10px] font-black uppercase tracking-widest px-4 h-8">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input placeholder="Search follow-ups..." className="pl-9 h-9 text-xs" />
          </div>
          <Button variant="outline" size="sm" className="h-9"><Filter className="mr-2 size-3.5" /> Filters</Button>
        </div>
      </div>
      
      <SectionCard contentClassName="p-0">
        {loading ? (
          <div className="p-8"><SkeletonTable /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead className="text-[10px] font-black uppercase tracking-widest px-6">Lead / Customer</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Business</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Assigned</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Type</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Due Date</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Priority</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFollowUps.map(lead => {
                const dueDate = parseISO(lead.nextFollowUp!);
                const isOverdue = isPast(dueDate) && !isToday(dueDate) && lead.followUpStatus !== 'Completed';

                return (
                  <TableRow key={lead.id} className="border-border/40 group hover:bg-muted/30 transition-colors">
                    <TableCell className="px-6">
                      <button onClick={() => openDetails(lead)} className="text-left outline-none">
                        <p className="text-xs font-black group-hover:text-primary transition-colors">{lead.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase truncate max-w-[150px]">{lead.notes}</p>
                      </button>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-muted-foreground uppercase">{lead.business}</TableCell>
                    <TableCell className="text-[11px] font-medium">{lead.assignedToName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold">
                        {lead.followUpType === 'Call' && <Phone className="size-3 text-blue-500" />}
                        {lead.followUpType === 'Email' && <Mail className="size-3 text-orange-500" />}
                        {lead.followUpType === 'Meeting' && <Calendar className="size-3 text-purple-500" />}
                        {lead.followUpType === 'WhatsApp' && <MessageSquare className="size-3 text-green-500" />}
                        {lead.followUpType}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "flex flex-col gap-0.5 text-[11px] font-bold",
                        isOverdue ? "text-red-500" : "text-foreground"
                      )}>
                        <span className="flex items-center gap-1.5">
                          {isOverdue && <AlertTriangle className="size-3" />}
                          {format(dueDate, "MMM dd, yyyy")}
                        </span>
                        <span className="text-[9px] text-muted-foreground uppercase opacity-70 flex items-center gap-1">
                          <Clock className="size-2.5" /> {format(dueDate, "hh:mm a")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone={lead.priority === 'High' ? 'danger' : lead.priority === 'Medium' ? 'warning' : 'neutral'}>
                        {lead.priority}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone={lead.followUpStatus === 'Completed' ? 'success' : isOverdue ? 'danger' : 'warning'}>
                        {lead.followUpStatus || 'Pending'}
                      </StatusBadge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-1">
                         {lead.followUpStatus !== 'Completed' && (
                           <Button variant="ghost" size="icon" className="size-7 text-green-600 hover:text-green-700 hover:bg-green-50" title="Complete">
                             <Check className="size-3.5" />
                           </Button>
                         )}
                         <Button variant="ghost" size="icon" className="size-7" onClick={() => openDetails(lead)}>
                           <Eye className="size-3.5" />
                         </Button>
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="size-7">
                               <MoreVertical className="size-3.5" />
                             </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end" className="w-40">
                             <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest">Edit Follow-up</DropdownMenuItem>
                             <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest text-red-600">Cancel</DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredFollowUps.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                      <Calendar className="size-10 mb-2" />
                      <p className="text-xs font-black uppercase tracking-widest">No follow-ups found</p>
                      <p className="text-[10px] font-medium max-w-[200px] mx-auto">There are no follow-ups for the selected criteria.</p>
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
