import { useEffect, useMemo, useState } from 'react';
import { Search, History, CheckCircle, XCircle, FileText, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SectionCard } from '@/components/shared/SectionCard';
import { customerLifecycleService, LifecyclePayment } from '@/lib/api/customer-lifecycle.service';

export function PaymentManagement() {
  const [payments, setPayments] = useState<LifecyclePayment[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const loadPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      setPayments(await customerLifecycleService.listPayments());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return payments;
    return payments.filter((payment) =>
      [payment.id, payment.customerId, payment.provider, payment.providerReference, payment.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [payments, search]);

  const verifyPayment = async (id: string) => {
    setVerifyingId(id);
    setError(null);
    try {
      const updated = await customerLifecycleService.verifyPayment(id);
      setPayments((current) => current.map((payment) => payment.id === id ? updated : payment));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to verify payment');
    } finally {
      setVerifyingId(null);
    }
  };

  const getStatusTone = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'rejected':
      case 'failed': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <SectionCard
      title="Payment Verification"
      description="Real payment records from the customer lifecycle service. Gateway credentials are kept server-side."
    >
      <div className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search payments, refs..." className="pl-10 h-10 border-border/50 focus:ring-primary/20" />
            </div>
          </div>
          <Button size="sm" className="h-9" variant="outline" disabled title="Payment proof upload will be connected to the existing storage workflow next">
            <FileText className="w-4 h-4 mr-2" />
            Upload Proof
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => void loadPayments()}>Retry</Button>
          </div>
        )}

        <div className="overflow-x-auto border border-border/40 rounded-xl">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Payment ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Customer</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Amount</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Provider</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
                    Loading payments...
                  </TableCell>
                </TableRow>
              ) : filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    No payment records found.
                  </TableCell>
                </TableRow>
              ) : filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-muted/5 group">
                  <TableCell className="font-bold text-xs">{payment.id}</TableCell>
                  <TableCell className="font-bold text-xs">{payment.customerId}</TableCell>
                  <TableCell className="font-black text-xs">{payment.currency} {Number(payment.amount).toLocaleString()}</TableCell>
                  <TableCell className="text-xs">{payment.provider ?? '—'}</TableCell>
                  <TableCell>
                    <StatusBadge tone={getStatusTone(payment.status) as any}>{payment.status}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {payment.status.toUpperCase() === 'PENDING' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:bg-success/10" title="Verify" onClick={() => void verifyPayment(payment.id)} disabled={verifyingId === payment.id}>
                          {verifyingId === payment.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                        </Button>
                      )}
                      {payment.status.toUpperCase() === 'PENDING' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" title="Reject" disabled>
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title="View Audit Trail" disabled>
                        <History className="w-4 h-4" />
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
