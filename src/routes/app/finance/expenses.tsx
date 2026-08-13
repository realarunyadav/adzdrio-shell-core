import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Search, Filter, Plus, Eye, CheckCircle2, Ban, TrendingDown, Clock, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoExpenses } from "@/lib/mock/workspace.demo";
import { Badge } from "@/components/ui/badge";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";

export const Route = createFileRoute("/app/finance/expenses")({
  component: ExpensesPage,
});

function ExpensesPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Expense Management"
        description="Track corporate spending, operational costs and approval workflows."
        actions={<Button size="sm" className="bg-primary hover:bg-primary/90 font-bold"><Plus className="mr-2 h-4 w-4" /> New Expense</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardKpiCard title="Total Expenses" value="₹ 12.4L" trend="+5.7%" icon={TrendingDown} />
        <DashboardKpiCard title="This Month" value="₹ 2.8L" trend="+2.1%" icon={Clock} />
        <DashboardKpiCard title="Pending Appr." value="₹ 1.2L" trend="4 items" icon={AlertCircle} />
        <DashboardKpiCard title="Approved" value="₹ 11.2L" trend="92%" icon={CheckCircle2} />
      </div>

      <SectionCard>
        <div className="flex items-center gap-4 mb-6">
          <Input placeholder="Search expenses..." className="h-9 w-64 text-xs" />
          <Button variant="outline" size="sm" className="h-9"><Filter className="h-3.5 w-3.5 mr-2" /> Filters</Button>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-y border-border/60 bg-muted/20">
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Expense ID</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Category</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Description</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Amount</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase">Business</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-center">Status</th>
                <th className="py-3 px-6 text-[10px] font-bold text-muted-foreground uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {demoExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 text-[10px] font-black text-muted-foreground tracking-widest">{exp.id}</td>
                  <td className="py-4 px-6">
                    <Badge variant="secondary" className="text-[9px] uppercase font-bold">{exp.category}</Badge>
                  </td>
                  <td className="py-4 px-6 text-xs font-medium">{exp.description}</td>
                  <td className="py-4 px-6 text-right font-black text-xs">₹ {exp.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-xs font-bold">{exp.business}</td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={exp.status === 'Approved' ? 'default' : 'outline'} className="text-[9px] uppercase">{exp.status}</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                      {exp.status === 'Pending' && (
                        <Button variant="outline" size="sm" className="h-8 text-[10px] font-black text-green-600">Approve</Button>
                      )}
                    </div>
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