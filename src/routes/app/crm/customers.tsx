import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  RefreshCw, 
  Download, 
  MoreHorizontal, 
  Eye, 
  Phone, 
  MessageSquare,
  UserPlus,
  ArrowRight
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoLeads, DemoLead } from "@/lib/mock/workspace.demo";
import { format } from "date-fns";
import { LeadDetailsDrawer } from "@/components/crm/LeadDetailsDrawer";
import { toast } from "sonner";
import { SkeletonTable } from "@/components/shared/SkeletonLoader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/crm/customers")({
  component: CustomersPage,
});

function CustomersPage() {
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedCustomer, setSelectedCustomer] = React.useState<DemoLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Customers list refreshed");
    }, 1000);
  };

  const openDetails = (customer: DemoLead) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const customers = demoLeads.filter(l => l.status === 'Converted' || l.id === 'lead-3'); // Mocking some as customers

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.business.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <PageHeader
        title="Customers"
        description="Customers and converted accounts managed across the CRM."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={cn("mr-2 size-3.5", loading && "animate-spin")} /> Refresh
            </Button>
            <Button variant="outline" size="sm" className="hidden lg:flex"><Download className="mr-2 size-3.5" /> Export</Button>
            <Button size="sm" className="shadow-lg shadow-primary/20"><Plus className="mr-2 size-3.5" /> Add Customer</Button>
          </div>
        }
      />
      
      <SectionCard contentClassName="p-0">
        <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/5">
           <div className="flex items-center gap-4 flex-1">
             <div className="relative w-full max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
               <Input placeholder="Search customers..." className="pl-9 h-9 border-border/40 focus:ring-primary/20" value={search} onChange={e => setSearch(e.target.value)} />
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
                <TableHead className="text-[10px] font-black uppercase tracking-widest px-6">Customer</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Business</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Assigned To</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Last Activity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map(customer => (
                <TableRow key={customer.id} className="border-border/40 group hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6">
                    <button onClick={() => openDetails(customer)} className="text-left outline-none">
                      <p className="text-xs font-black group-hover:text-primary transition-colors">{customer.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{customer.phone}</p>
                    </button>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{customer.business}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                      <UserPlus className="size-3" /> {customer.assignedToName || "Unassigned"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone="success">Active</StatusBadge>
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground font-medium">{format(new Date(customer.lastActivity), "MMM dd, HH:mm")}</TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="icon" className="size-7" onClick={() => openDetails(customer)}>
                         <Eye className="size-3.5" />
                       </Button>
                       <Button variant="ghost" size="icon" className="size-7">
                         <Phone className="size-3.5" />
                       </Button>
                       <Button variant="ghost" size="icon" className="size-7">
                         <MoreHorizontal className="size-3.5" />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center text-muted-foreground italic text-xs">
                    No customers found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <LeadDetailsDrawer 
        lead={selectedCustomer} 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </div>
  );
}

