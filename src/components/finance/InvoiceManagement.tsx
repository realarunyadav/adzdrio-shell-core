import { useEffect, useMemo, useState } from 'react';
import { Search, Filter, Eye, History, CreditCard, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SectionCard } from '@/components/shared/SectionCard';
import { customerLifecycleService, LifecycleInvoice } from '@/lib/api/customer-lifecycle.service';

export function InvoiceManagement() {
  const [invoices, setInvoices] = useState<LifecycleInvoice[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      setInvoices(await customerLifecycleService.listInvoices());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();
    return invoices.filter((invoice) => {
      const matchesSearch = !query || [invoice.invoiceNumber, invoice.customerId, invoice.paymentId, invoice.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
      const matchesStatus = statusFilter === 'All' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  const getStatusTone = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      case 'sent': return 'info';
      default: return 'neutral';
    }
  };

  return (
    <SectionCard
      title="Invoice Directory"
      description="Real invoice records from the customer lifecycle service."
    >
      <div className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search invoices, clients..." className="pl-10 h-10 border-border/50 focus:ring-primary/20" />
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1">
            <Button variant="outline" size="sm" className="h-9 whitespace-nowrap" disabled>
              <Filter className="w-3.5 h-3.5 mr-2" />
              Filters
            </Button>
            <div className="flex bg-muted/50 p-1 rounded-lg border gap-1">
              {['All', 'Paid', 'Sent', 'Pending', 'Overdue'].map((status) => (
                <Button key={status} variant="ghost" size="sm" onClick={() => setStatusFilter(status)} className={`h-7 px-3 text-[10px] font-bold uppercase tracking-tight rounded-md ${statusFilter === status ? 'bg-card shadow-sm' : ''}`}>
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => void loadInvoices()}>Retry</Button>
          </div>
        )}

        <div className="overflow-x-auto border border-border/40 rounded-xl">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Invoice ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Customer</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Amount</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Date</TableHead>
                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
                    Loading invoices...
                  </TableCell>
                </TableRow>
              ) : filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    No invoice records found.
                  </TableCell>
                </TableRow>
              ) : filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-muted/5 group">
                  <TableCell className="font-bold text-xs">{invoice.invoiceNumber}</TableCell>
                  <TableCell className="font-bold text-xs">{invoice.customerId}</TableCell>
                  <TableCell className="font-black text-xs">{invoice.currency} {Number(invoice.amount).toLocaleString()}</TableCell>
                  <TableCell>
                    <StatusBadge tone={getStatusTone(invoice.status) as any}>{invoice.status}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-slate-500">
                    {invoice.issuedAt ? new Date(invoice.issuedAt).toLocaleDateString() : '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Preview PDF" disabled>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title="History" disabled>
                        <History className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title="Payment Details" disabled>
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
