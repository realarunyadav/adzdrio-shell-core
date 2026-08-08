import { Wallet, ArrowDownLeft, ArrowUpRight, Clock, AlertCircle, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';

const transactions = [
  { id: "TRX-9821", type: "Incoming", customer: "Deemand Solutions", amount: "+₹4,50,000", method: "IMPS", status: "Completed", time: "2h ago" },
  { id: "TRX-9822", type: "Outgoing", customer: "AWS Cloud", amount: "-₹12,500", method: "Card", status: "Completed", time: "5h ago" },
  { id: "TRX-9823", type: "Incoming", customer: "Acme Corp", amount: "+₹25,000", method: "UPI", status: "Pending", time: "6h ago" },
  { id: "TRX-9824", type: "Outgoing", customer: "Office Lease", amount: "-₹85,000", method: "NEFT", status: "Failed", time: "1d ago" },
];

export function TreasuryHub() {
  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Liquid Cash", value: "₹55.6L", sub: "Main Current A/c" },
          { label: "Receivables", value: "₹12.8L", sub: "Due < 30 Days" },
          { label: "Payables", value: "₹4.2L", sub: "Pending Approvals" },
          { label: "Daily Burn", value: "₹18.5K", sub: "7-day Avg" }
        ].map((item, i) => (
          <Card key={i} className="p-4 border-none bg-muted/30 shadow-none">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{item.label}</div>
            <div className="text-xl font-black">{item.value}</div>
            <div className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-tight opacity-70">{item.sub}</div>
          </Card>
        ))}
      </div>

      <div className="border border-border/40 rounded-2xl overflow-hidden bg-card">
        <div className="p-4 border-b bg-muted/10 flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recent Transactions</h4>
          <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase tracking-widest">View Ledger</Button>
        </div>
        <Table>
          <TableHeader className="bg-muted/5">
            <TableRow>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Type</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">ID</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Counterparty</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Amount</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
              <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((trx) => (
              <TableRow key={trx.id} className="hover:bg-muted/5 group">
                <TableCell>
                  {trx.type === 'Incoming' ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <ArrowDownLeft className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-bold text-xs">{trx.id}</TableCell>
                <TableCell className="text-xs font-bold text-slate-900">{trx.customer}</TableCell>
                <TableCell className={`text-xs font-black ${trx.type === 'Incoming' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {trx.amount}
                </TableCell>
                <TableCell>
                  <StatusBadge tone={trx.status === 'Completed' ? 'success' : trx.status === 'Failed' ? 'destructive' : 'warning'}>
                    {trx.status}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{trx.time}</span>
                    <span className="text-[9px] text-muted-foreground opacity-50 uppercase tracking-widest">{trx.method}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
