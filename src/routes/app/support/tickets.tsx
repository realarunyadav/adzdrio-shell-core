import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download, 
  Eye, 
  MessageCircle,
  Clock,
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
  demoSupportTickets, 
  DemoSupportTicket 
} from "@/lib/mock/workspace.demo";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TicketDetailsDrawer } from "@/components/support/TicketDetailsDrawer";

export const Route = createFileRoute("/app/support/tickets")({
  component: TicketsPage,
});

function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = React.useState<DemoSupportTicket | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleRowClick = (ticket: DemoSupportTicket) => {
    setSelectedTicket(ticket);
    setDrawerOpen(true);
  };

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
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList className="bg-muted/30 p-1">
              {['all', 'new', 'assigned', 'in progress', 'waiting', 'resolved'].map((t) => (
                <TabsTrigger 
                  key={t} 
                  value={t === 'all' ? 'all' : t.replace(' ', '-')} 
                  className="capitalize text-xs font-bold px-4 py-1.5 data-[state=active]:bg-background"
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tickets..." className="h-9 w-64 pl-9 text-xs" />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-3.5 w-3.5 mr-2" /> Filters
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="overflow-x-auto -mx-6">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="border-y border-border/60 bg-muted/20">
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Ticket ID</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Customer / Business</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Subject</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Priority</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Assigned To</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Status</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">SLA</th>
                    <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {demoSupportTickets.map((t) => (
                    <tr 
                      key={t.id} 
                      className="hover:bg-muted/30 transition-colors group cursor-pointer"
                      onClick={() => handleRowClick(t)}
                    >
                      <td className="py-4 px-6 text-[10px] font-black text-muted-foreground tracking-widest">{t.id}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold group-hover:text-primary transition-colors">{t.customerName}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{t.business}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 max-w-[200px]">
                        <p className="text-xs font-medium truncate">{t.subject}</p>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="secondary" className="text-[9px] font-bold uppercase">{t.category}</Badge>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase",
                          t.priority === 'Critical' ? "bg-red-500/10 text-red-700 border-red-500/20" :
                          t.priority === 'High' ? "bg-orange-500/10 text-orange-700 border-orange-500/20" :
                          "bg-muted border-border/40 text-muted-foreground"
                        )}>
                          {t.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-black text-primary uppercase">
                            {t.assignedToName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-[10px] font-bold">{t.assignedToName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase",
                          t.status === 'Resolved' ? "bg-green-500/10 text-green-700 border-green-500/20" : 
                          t.status === 'In Progress' ? "bg-blue-500/10 text-blue-700 border-blue-500/20" : 
                          'bg-muted border-border/40 text-muted-foreground'
                        )}>
                          {t.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "flex items-center gap-1 text-[9px] font-black uppercase",
                            t.slaStatus === 'Healthy' ? "text-green-600" : t.slaStatus === 'Approaching' ? "text-orange-600" : "text-red-600"
                          )}>
                            {t.slaStatus === 'Healthy' ? <CheckCircle2 className="size-3" /> : <AlertTriangle className="size-3" />}
                            {t.slaStatus}
                          </div>
                          <span className="text-[8px] text-muted-foreground font-bold uppercase mt-0.5">
                            {new Date(t.dueTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
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
                            <DropdownMenuItem className="text-xs font-bold cursor-pointer">
                              <Eye className="mr-2 h-3.5 w-3.5" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold cursor-pointer">
                              <UserPlus className="mr-2 h-3.5 w-3.5" /> Assign Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold cursor-pointer text-red-600">
                              <AlertTriangle className="mr-2 h-3.5 w-3.5" /> Escalate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </SectionCard>

      <TicketDetailsDrawer 
        ticket={selectedTicket} 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
    </div>
  );
}
