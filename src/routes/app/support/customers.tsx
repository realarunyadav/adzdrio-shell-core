import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, MessageSquare, History, ShieldAlert, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supportService, customerService } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/app/support/customers")({
  component: SupportCustomersPage,
});

function SupportCustomersPage() {
  const [search, setSearch] = React.useState("");

  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["crm", "customers", { search }],
    queryFn: () => customerService.getAll(),
  });

  const { data: ticketsData, isLoading: isLoadingTickets } = useQuery({
    queryKey: ["support", "tickets", { pageSize: 1000 }],
    queryFn: () => supportService.listTickets({ pageSize: 1000 }),
  });

  const tickets = ticketsData?.items || [];

  const displayCustomers = (customers || []).map(c => {
    const customerTickets = tickets.filter(t => t.customer_id === c.id);
    const openTicketsCount = customerTickets.filter(t => !['resolved', 'closed'].includes(t.status.toLowerCase())).length;
    const resolvedTicketsCount = customerTickets.length - openTicketsCount;
    const lastTicket = [...customerTickets].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    })[0];
    const slaRisk = customerTickets.some(t => t.sla_status === 'Breached');

    return {
      ...c,
      openTicketsCount,
      resolvedTicketsCount,
      lastTicketId: lastTicket?.id,
      slaRisk,
      assignedAgent: 'Support Team'
    };
  }).filter(c => 
    !search || 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Support Module"
        title="Support Customers"
        description="Monitor customer support health and manage support-specific account preferences."
      />

      <SectionCard>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search customers..." 
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

        <div className="overflow-x-auto -mx-6">
          {isLoadingCustomers || isLoadingTickets ? (
            <div className="p-6 space-y-2">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : displayCustomers.length === 0 ? (
            <div className="py-20 text-center">
              <AlertTriangle className="size-12 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No customers found</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-y border-border/60 bg-muted/20">
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Business</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Open Tickets</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Resolved</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Last Ticket</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">SLA Risk</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Assigned Agent</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {displayCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold group-hover:text-primary transition-colors">{c.name}</span>
                        <span className="text-[10px] text-muted-foreground">{c.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="text-[9px] font-bold uppercase py-0 border-border/60 text-muted-foreground">
                        {c.business}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={cn(
                        "text-xs font-black",
                        c.openTicketsCount > 0 ? "text-primary" : "text-muted-foreground"
                      )}>
                        {c.openTicketsCount}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-xs font-bold text-muted-foreground">{c.resolvedTicketsCount}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                        {c.lastTicketId?.slice(0, 8) || 'None'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {c.slaRisk ? (
                        <div className="flex justify-center">
                          <div className="size-5 rounded-full bg-red-500/10 flex items-center justify-center">
                            <ShieldAlert className="size-3 text-red-600" />
                          </div>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-tight">Stable</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{c.assignedAgent}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Support History">
                          <History className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="New Ticket">
                          <MessageSquare className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
