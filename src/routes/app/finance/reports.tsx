import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Download, Filter, Calendar, BarChart3, PieChart, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/finance/reports")({
  component: FinanceReportsPage,
});

function FinanceReportsPage() {
  const reports = [
    { title: "Revenue Report", desc: "Detailed gross vs net revenue analysis.", icon: TrendingUp },
    { title: "Collections Report", desc: "Real-time paid vs pending collections tracker.", icon: DollarSign },
    { title: "Refund Report", desc: "Analysis of refund volume and reasons.", icon: TrendingDown },
    { title: "Expense Report", desc: "Categorized corporate spending breakdown.", icon: BarChart3 },
    { title: "Payroll Report", desc: "Summary of salary and incentive disbursements.", icon: PieChart },
    { title: "Reconciliation Report", desc: "Transaction matching and difference audit.", icon: Calendar },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Financial Reports"
        description="Comprehensive business intelligence and financial reporting suite."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Calendar className="mr-2 h-4 w-4" /> Date Range</Button>
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Batch Export</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <SectionCard key={report.title} className="hover:border-primary/50 transition-all cursor-pointer group">
             <div className="flex flex-col h-full">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <report.icon className="size-5 text-primary" />
                </div>
                <h4 className="text-sm font-black mb-1">{report.title}</h4>
                <p className="text-xs text-muted-foreground font-medium mb-6">{report.desc}</p>
                <div className="mt-auto pt-4 border-t border-border/40 flex justify-between items-center">
                   <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest px-0 hover:bg-transparent hover:text-primary">Configure <TrendingUp className="ml-2 size-3" /></Button>
                   <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold uppercase tracking-widest">View</Button>
                </div>
             </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}