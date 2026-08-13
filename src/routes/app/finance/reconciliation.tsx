import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, CheckCircle2, AlertTriangle, HelpCircle, Eye, Link } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoReconciliation } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/finance/reconciliation")({
  component: ReconciliationPage,
});

function ReconciliationPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Account Reconciliation"
        description="Matching sales, gateway transactions and financial ledger entries for accuracy."
      />

      <SectionCard title="Reconciliation Pipeline" description="Visual flow of transaction matching.">
        <div className="flex items-center justify-between py-8 px-4 max-w-4xl mx-auto overflow-x-auto">
          {[
            { label: 'Sales', icon: Link, status: 'success' },
            { label: 'Payments', icon: CheckCircle2, status: 'success' },
            { label: 'Gateway', icon: AlertTriangle, status: 'warning' },
            { label: 'Ledger', icon: CheckCircle2, status: 'success' },
            { label: 'Invoices', icon: CheckCircle2, status: 'success' },
          ].map((step, i, arr) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-2">
                <div className={`size-12 rounded-full flex items-center justify-center border-2 ${
                  step.status === 'success' ? 'bg-green-500/10 border-green-500 text-green-600' :
                  step.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-600' :
                  'bg-muted border-border text-muted-foreground'
                }`}>
                  <step.icon className="size-5" />
                </div>
                <span className="text-[10px] font-black uppercase">{step.label}</span>
              </div>
              {i < arr.length - 1 && <div className="h-[2px] flex-1 min-w-[40px] bg-border mx-2 mt-[-20px]" />}
            </React.Fragment>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <div className="flex items-center gap-4 mb-6">
          <Input placeholder="Search records..." className="h-9 w-64 text-xs" />
          <Button variant="outline" size="sm" className="h-9"><Filter className="h-3.5 w-3.5 mr-2" /> Filters</Button>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-y border-border/60 bg-muted/20">
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Record ID</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Sale / Pay ID</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Expected</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Received</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Diff.</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-center">Status</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {demoReconciliation.map((rec) => (
                <tr key={rec.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">{rec.id}</td>
                  <td className="py-4 px-6 text-[10px] font-bold">
                    <div>{rec.saleId}</div>
                    <div className="text-muted-foreground">{rec.paymentId}</div>
                  </td>
                  <td className="py-4 px-6 text-right text-xs font-bold">₹ {rec.expectedAmount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right text-xs font-bold">₹ {rec.receivedAmount.toLocaleString()}</td>
                  <td className={`py-4 px-6 text-right text-xs font-black ${rec.difference !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₹ {rec.difference.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={rec.status === 'Matched' ? 'default' : 'destructive'} className="text-[9px] uppercase">
                      {rec.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}