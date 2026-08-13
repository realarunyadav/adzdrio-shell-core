import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, Download, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoTransactions } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/finance/transactions")({
  component: TransactionsPage,
});

function TransactionsPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Transaction Ledger"
        description="Comprehensive audit trail of all financial movements across the platform."
        actions={<Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" /> Export Ledger</Button>}
      />

      <SectionCard>
        <div className="flex items-center gap-4 mb-6">
          <Input placeholder="Search transactions, references..." className="h-9 w-64 text-xs" />
          <Button variant="outline" size="sm" className="h-9"><Filter className="h-3.5 w-3.5 mr-2" /> Filters</Button>
        </div>

        <div className="overflow-x-auto -mx-6">
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
              {demoTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 text-[10px] font-black text-muted-foreground tracking-widest">{txn.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs font-bold">
                       {txn.type === 'Payment' ? <ArrowUpRight className="size-3.5 text-green-600" /> : <ArrowDownRight className="size-3.5 text-red-600" />}
                       {txn.type}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs font-bold">{txn.customerName}</td>
                  <td className="py-4 px-6 text-right font-black text-xs">₹ {txn.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-center"><Badge variant="outline" className="text-[9px] uppercase">{txn.status}</Badge></td>
                  <td className="py-4 px-6 text-[10px] font-medium">{new Date(txn.date).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-right"><Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}