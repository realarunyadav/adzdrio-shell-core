import { Search, Filter, History, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SectionCard } from '@/components/shared/SectionCard';

const payments = [
  { id: "PAY-2026-001", customer: "Deemand Solutions", invoice: "INV-2026-001", amount: "₹4,50,000", method: "Bank Transfer", date: "Aug 10, 2026", status: "Verified" },
  { id: "PAY-2026-002", customer: "Acme Corp", invoice: "INV-2026-002", amount: "₹25,000", method: "UPI", date: "Aug 12, 2026", status: "Pending" },
  { id: "PAY-2026-003", customer: "Global Tech", invoice: "INV-2026-003", amount: "₹85,000", method: "Bank Transfer", date: "Aug 13, 2026", status: "Rejected" },
];

export function PaymentManagement() {
  const getStatusTone = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <SectionCard 
      title="Payment Verification" 
      description="Streamlined payment validation workflow with audit trails and automated sale confirmation."
    >
      <div className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search payments, refs..." className="pl-10 h-10 border-border/50 focus:ring-primary/20" />
            </div>
          </div>
          <Button size="sm" className="h-9">
            <FileText className="w-4 h-4 mr-2" />
            Upload Proof
          </Button>
        </div>

        <div className="overflow-x-auto border border-border/40 rounded-xl">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Payment ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Customer</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Amount</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Method</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id} className="hover:bg-muted/5 group">
                  <TableCell className="font-bold text-xs">{p.id}</TableCell>
                  <TableCell className="font-bold text-xs">{p.customer}</TableCell>
                  <TableCell className="font-black text-xs">{p.amount}</TableCell>
                  <TableCell className="text-xs">{p.method}</TableCell>
                  <TableCell>
                    <StatusBadge tone={getStatusTone(p.status) as any}>{p.status}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {p.status === 'Pending' && (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:bg-success/10" title="Verify">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" title="Reject">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title="View Audit Trail">
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
