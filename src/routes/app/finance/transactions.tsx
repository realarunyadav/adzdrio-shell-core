import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, Download, Eye, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoTransactions } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { financeService } from "@/lib/api/services";

export const Route = createFileRoute("/app/finance/transactions")({
  component: TransactionsPage,
});

function TransactionsPage() {
  const { data: liveTransactions, isLoading } = useQuery({
    queryKey: ['finance-transactions'],
    queryFn: () => financeService.listTransactions({}),
  });

  const transactions = (liveTransactions && liveTransactions.length > 0) ? liveTransactions : demoTransactions;
  const isLive = liveTransactions && liveTransactions.length > 0;

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Transaction Ledger"
        description="Comprehensive audit trail of all financial movements across the platform."
        actions={
          <div className="flex items-center gap-2">
            {isLive && <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight text-green-600 border-green-600/20 bg-green-500/5">Live Data</Badge>}
            <Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" /> Export Ledger</Button>
          </div>
        }
      />

      <SectionCard>
        <div className="flex items-center gap-4 mb-6">
          <Input placeholder="Search transactions, references..." className="h-9 w-64 text-xs" />
          <Button variant="outline" size="sm" className="h-9"><Filter className="h-3.5 w-3.5 mr-2" /> Filters</Button>
        </div>

        <div className="overflow-x-auto -mx-6">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest">Loading Ledger...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-y border-border/60 bg-muted/20">
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Transaction ID</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Type</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Customer</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Amount</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-center">Status</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Date</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {transactions.map((txn: any) => (
                  <tr key={txn.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-6 text-[10px] font-black text-muted-foreground tracking-widest uppercase">{txn.id.slice(0, 8)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs font-bold capitalize">
                        {['payment', 'Won', 'Payment'].includes(txn.type) ? <ArrowUpRight className="size-3.5 text-green-600" /> : <ArrowDownRight className="size-3.5 text-red-600" />}
                        {txn.type}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-bold">{txn.customer_name || txn.customerName || 'Unknown'}</td>
                    <td className="py-4 px-6 text-right font-black text-xs">
                      {txn.currency === 'INR' || !txn.currency ? '₹' : txn.currency} {txn.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="outline" className="text-[9px] uppercase font-bold">{txn.status}</Badge>
                    </td>
                    <td className="py-4 px-6 text-[10px] font-medium">
                      {new Date(txn.created_at || txn.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-right"><Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button></td>
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