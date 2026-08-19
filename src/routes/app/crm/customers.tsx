import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  RefreshCw, 
  Download, 
  Eye, 
  Phone, 
  UserPlus, 
  MoreVertical,
  Mail,
  Building2
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Customer } from "@/lib/api/services.types";
import { CustomerDetailsDrawer } from "@/components/crm/CustomerDetailsDrawer";
import { toast } from "sonner";
import { SkeletonTable } from "@/components/shared/SkeletonLoader";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/lib/api/services";


export const Route = createFileRoute("/app/crm/customers")({
  component: CustomersPage,
});

function CustomersPage() {
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedCustomer, setSelectedCustomer] = React.useState<DemoLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

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

  const customers = demoLeads.filter(l => l.status === 'Converted');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.business.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAll = () => {
    if (selectedRows.length === filteredCustomers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredCustomers.map(c => c.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20">
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
      
      <SectionCard contentClassName="p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-4 border-b border-border/40 bg-muted/5 gap-4">
           <div className="flex items-center gap-3 flex-1">
             <div className="relative w-full max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
               <Input 
                 placeholder="Search by name, email, or business..." 
                 className="pl-9 h-9 border-border/40 focus:ring-primary/20 text-xs" 
                 value={search} 
                 onChange={e => setSearch(e.target.value)} 
               />
             </div>
             <Button variant="outline" size="sm" className="h-9 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground shrink-0">
               <Filter className="mr-2 size-3.5" /> Filters
             </Button>
           </div>

           {selectedRows.length > 0 && (
             <div className="flex items-center gap-2 animate-in slide-in-from-right-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">
                  {selectedRows.length} Selected
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm" className="h-9 px-4 text-[10px] font-black uppercase tracking-widest">
                      Bulk Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest">Assign Employee</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest">Send Bulk Email</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest">Update Status</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest text-red-600">Delete Selected</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
             </div>
           )}
        </div>

        {loading ? (
          <div className="p-8"><SkeletonTable /></div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead className="w-12 px-6">
                  <Checkbox 
                    checked={selectedRows.length === filteredCustomers.length && filteredCustomers.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest min-w-[200px]">Customer</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest min-w-[150px]">Business</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Assigned</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Revenue</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map(customer => (
                <TableRow key={customer.id} className="border-border/40 group hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6">
                    <Checkbox 
                      checked={selectedRows.includes(customer.id)}
                      onCheckedChange={() => toggleRow(customer.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <button onClick={(e) => { e.preventDefault(); openDetails(customer); }} className="text-left outline-none flex items-center gap-3 cursor-pointer">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-black group-hover:text-primary transition-colors">{customer.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                           <Mail className="size-2.5" /> {customer.email}
                        </p>
                      </div>
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-tighter">
                       <Building2 className="size-3 text-muted-foreground" />
                       {customer.business}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                      <UserPlus className="size-3" /> {customer.assignedToName || "Unassigned"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone="success">Active</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right text-[11px] font-black">{customer.totalSales || "₹ 0"}</TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" className="size-7" onClick={() => openDetails(customer)}>
                         <Eye className="size-3.5" />
                       </Button>
                       <Button variant="ghost" size="icon" className="size-7">
                         <Phone className="size-3.5" />
                       </Button>
                       <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="icon" className="size-7">
                             <MoreVertical className="size-3.5" />
                           </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end" className="w-48">
                           <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest">Add Follow-up</DropdownMenuItem>
                           <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest">Schedule Callback</DropdownMenuItem>
                           <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest">Create Invoice</DropdownMenuItem>
                           <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-widest text-red-600">Archive Customer</DropdownMenuItem>
                         </DropdownMenuContent>
                       </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                      <Search className="size-10 mb-2" />
                      <p className="text-xs font-black uppercase tracking-widest">No customers found</p>
                      <p className="text-[10px] font-medium">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <CustomerDetailsDrawer 
        customer={selectedCustomer} 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </div>
  );
}
