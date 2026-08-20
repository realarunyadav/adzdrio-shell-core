import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download, 
  Eye, 
  AlertTriangle,
  UserPlus,
  CheckCircle2
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TicketDetailsDrawer } from "@/components/support/TicketDetailsDrawer";
import { supportService } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";
import { SupportTicket } from "@/lib/api/support.types";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/app/support/tickets")({
  component: TicketsPage,
});

function TicketsPage() {
  const [selectedTicketId, setSelectedTicketId] = React.useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<string | undefined>(undefined);

  const { data, isLoading, error } = useQuery({
    queryKey: ["support", "tickets", { search, status }],
    queryFn: () => supportService.listTickets({ search, status: status === 'all' ? undefined : status, pageSize: 50 }),
  });

  const handleRowClick = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setDrawerOpen(true);
  };

  const tickets = data?.items || [];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Support Module"
        title="Tickets Ledger"
        description="Unified workspace for all customer support requests and service level tracking."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold">
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        }
      />

      <SectionCard>
        <Tabs defaultValue="all" onValueChange={(v) => setStatus(v === 'all' ? undefined : v)}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList className="bg-muted/30 p-1">
              {['all', 'open', 'in_progress', 'waiting_on_customer', 'resolved', 'closed'].map((t) => (
                <TabsTrigger 
                  key={t} 
                  value={t} 
                  className="capitalize text-xs font-bold px-4 py-1.5 data-[state=active]:bg-background"
                >
                  {t.replace(/_/g, ' ')}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tickets..." 
                  className="h-9 w-64 pl-9 text-xs" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-3.5 w-3.5 mr-2" /> Filters
              </Button>
            </div>
          </div>

          <TabsContent value={status || 'all'} className="m-0">
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : error ? (
              <div className="py-12 text-center text-red-500 font-bold uppercase tracking-widest">
                Error loading tickets. Please try again.
              </div>
            ) : tickets.length === 0 ? (
              <div className="py-20 text-center">
                <AlertTriangle className="size-12 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No tickets found</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                  <thead>
                    <tr className="border-y border-border/60 bg-muted/20">
                      <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">ID</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Customer / Business</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Subject</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Priority</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Status</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">SLA</th>
                      <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {tickets.map((t) => (
                      <tr 
                        key={t.id} 
                        className="hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => handleRowClick(t.id)}
                      >
                        <td className="py-4 px-6 text-[10px] font-black text-muted-foreground tracking-widest">{t.id.slice(0, 8)}</td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold group-hover:text-primary transition-colors">{t.customer_name || 'Anonymous'}</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{t.business_name || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 max-w-[200px]">
                          <p className="text-xs font-medium truncate">{t.subject}</p>
                        </td>
                        <td className="py-4 px-6">
                          <Badge variant="secondary" className="text-[9px] font-bold uppercase">{t.category_name || 'General'}</Badge>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Badge variant="outline" className={cn(
                            "text-[9px] font-bold uppercase",
                            t.priority.toLowerCase() === 'urgent' ? "bg-red-500/10 text-red-700 border-red-500/20" :
                            t.priority.toLowerCase() === 'high' ? "bg-orange-500/10 text-orange-700 border-orange-500/20" :
                            "bg-muted border-border/40 text-muted-foreground"
                          )}>
                            {t.priority}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Badge variant="outline" className={cn(
                            "text-[9px] font-bold uppercase",
                            t.status === 'resolved' ? "bg-green-500/10 text-green-700 border-green-500/20" : 
                            t.status === 'in_progress' ? "bg-blue-500/10 text-blue-700 border-blue-500/20" : 
                            'bg-muted border-border/40 text-muted-foreground'
                          )}>
                            {t.status.replace(/_/g, ' ')}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex flex-col items-center">
                            <div className={cn(
                              "flex items-center gap-1 text-[9px] font-black uppercase",
                              t.sla_status === 'Healthy' ? "text-green-600" : "text-red-600"
                            )}>
                              {t.sla_status === 'Healthy' ? <CheckCircle2 className="size-3" /> : <AlertTriangle className="size-3" />}
                              {t.sla_status}
                            </div>
                            {t.due_time && (
                              <span className="text-[8px] text-muted-foreground font-bold uppercase mt-0.5">
                                {new Date(t.due_time).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem className="text-xs font-bold cursor-pointer" onClick={() => handleRowClick(t.id)}>
                                <Eye className="mr-2 h-3.5 w-3.5" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs font-bold cursor-pointer">
                                <UserPlus className="mr-2 h-3.5 w-3.5" /> Assign Agent
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </SectionCard>

      <TicketDetailsDrawer 
        ticketId={selectedTicketId} 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
    </div>
  );
}
