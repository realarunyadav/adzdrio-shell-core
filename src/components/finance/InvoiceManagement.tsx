import { Search, Filter, Download, Eye, History, CreditCard, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SectionCard } from '@/components/shared/SectionCard';
import { Badge } from '@/components/ui/badge';

const invoices = [
  { id: "INV-2026-001", customer: "Deemand Solutions", subscription: "Enterprise Premium", amount: "₹4,50,000", status: "Paid", date: "Aug 10, 2026" },
  { id: "INV-2026-002", customer: "Acme Corp", subscription: "Standard Plan", amount: "₹25,000", status: "Pending", date: "Aug 12, 2026" },
  { id: "INV-2026-003", customer: "Global Tech", subscription: "Growth Plan", amount: "₹85,000", status: "Overdue", date: "Aug 01, 2026" },
  { id: "INV-2026-004", customer: "NexGen Inc", subscription: "Enterprise Plus", amount: "₹2,10,000", status: "Sent", date: "Aug 14, 2026" },
  { id: "INV-2026-005", customer: "Blue Sky", subscription: "Startup Tier", amount: "₹12,000", status: "Draft", date: "Aug 15, 2026" },
];

export function InvoiceManagement() {
  const getStatusTone = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'destructive';
      case 'sent': return 'info';
      default: return 'neutral';
    }
  };

  return (
    <SectionCard 
      title="Invoice Directory" 
      description="Enterprise billing management, PDF generation, and automated collections tracking."
    >
      <div className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search invoices, clients..." className="pl-10 h-10 border-border/50 focus:ring-primary/20" />
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1">
            <Button variant="outline" size="sm" className="h-9 whitespace-nowrap">
              <Filter className="w-3.5 h-3.5 mr-2" />
              Filters
            </Button>
            <div className="flex bg-muted/50 p-1 rounded-lg border gap-1">
              {['All', 'Paid', 'Sent', 'Pending', 'Overdue'].map((s) => (
                <Button key={s} variant="ghost" size="sm" className={`h-7 px-3 text-[10px] font-bold uppercase tracking-tight rounded-md ${s === 'All' ? 'bg-card shadow-sm' : ''}`}>
                  {s}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border border-border/40 rounded-xl">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Invoice ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Customer & Sub</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Amount</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Date</TableHead>
                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-muted/5 group cursor-pointer">
                  <TableCell className="font-bold text-xs">{inv.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">{inv.customer}</span>
                      <span className="text-[10px] text-muted-foreground">{inv.subscription}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-xs">{inv.amount}</TableCell>
                  <TableCell>
                    <StatusBadge tone={getStatusTone(inv.status) as any}>{inv.status}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-slate-500">{inv.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Preview PDF">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="History">
                        <History className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Details">
                        <CreditCard className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </SectionCard>
  );
}
