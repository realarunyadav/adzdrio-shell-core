import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  RefreshCw, 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  CheckCircle2, 
  Phone, 
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  Eye
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoLeads, DemoLead } from "@/lib/mock/workspace.demo";
import { format, isPast, isToday } from "date-fns";
import { LeadDetailsDrawer } from "@/components/crm/LeadDetailsDrawer";
import { toast } from "sonner";
import { SkeletonTable } from "@/components/shared/SkeletonLoader";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/crm/follow-ups")({
  component: FollowUpsPage,
});

function FollowUpsPage() {
  const [loading, setLoading] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState<DemoLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Follow-ups refreshed");
    }, 1000);
  };

  const openDetails = (lead: DemoLead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const followUps = demoLeads.filter(l => l.nextFollowUp);

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
        <Tabs defaultValue="today" className="w-auto">
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
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Assigned To</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Due Date</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Priority</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {followUps.map(lead => {
                const dueDate = new Date(lead.nextFollowUp!);
                const isOverdue = isPast(dueDate) && !isToday(dueDate);

                return (
                  <TableRow key={lead.id} className="border-border/40 group hover:bg-muted/30 transition-colors">
                    <TableCell className="px-6">
                      <button onClick={() => openDetails(lead)} className="text-left outline-none">
                        <p className="text-xs font-black group-hover:text-primary transition-colors">{lead.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase truncate max-w-[200px]">{lead.notes}</p>
                      </button>
                    </TableCell>
                    <TableCell className="text-[11px] font-medium">{lead.assignedToName}</TableCell>
                    <TableCell>
                      <div className={cn(
                        "flex items-center gap-1.5 text-[11px] font-bold",
                        isOverdue ? "text-red-500" : "text-foreground"
                      )}>
                        {isOverdue && <AlertTriangle className="size-3" />}
                        <Calendar className="size-3 opacity-50" />
                        {format(dueDate, "MMM dd, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone={lead.priority === 'High' ? 'danger' : 'neutral'}>{lead.priority}</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone="warning" className="animate-pulse">Pending</StatusBadge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-2">
                         <Button variant="secondary" size="sm" className="h-7 px-3 text-[9px] font-black uppercase tracking-widest shadow-sm">
                           Complete
                         </Button>
                         <Button variant="ghost" size="icon" className="size-7" onClick={() => openDetails(lead)}>
                           <Eye className="size-3.5" />
                         </Button>
                         <Button variant="ghost" size="icon" className="size-7">
                           <MoreHorizontal className="size-3.5" />
                         </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {followUps.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center text-muted-foreground italic text-xs">
                    No follow-ups scheduled.
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

