import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, MoreHorizontal, MessageSquare, History, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { demoSupportTickets, demoLeads } from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/support/customers")({
  component: SupportCustomersPage,
});

function SupportCustomersPage() {
  // Derive support-specific customer view from demoLeads (which represent our customer base)
  const customers = demoLeads.filter(l => l.status === 'Converted').map(c => {
    const tickets = demoSupportTickets.filter(t => t.customerId === c.id);
    const openTickets = tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
    const lastTicket = tickets.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())[0];
    const slaRisk = tickets.some(t => t.slaStatus === 'Breached' || t.slaStatus === 'Approaching');

    return {
      ...c,
      openTickets,
      resolvedTickets: tickets.length - openTickets,
      lastTicketId: lastTicket?.id,
      slaRisk,
      assignedAgent: lastTicket?.assignedToName || 'Unassigned'
    };
  });

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
              <Input placeholder="Search customers..." className="h-9 w-64 pl-9 text-xs" />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-3.5 w-3.5 mr-2" /> Filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
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
              {customers.map((c) => (
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
                      c.openTickets > 0 ? "text-primary" : "text-muted-foreground"
                    )}>
                      {c.openTickets}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-xs font-bold text-muted-foreground">{c.resolvedTickets}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                      {c.lastTicketId || 'None'}
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
        </div>
      </SectionCard>
    </div>
  );
}
