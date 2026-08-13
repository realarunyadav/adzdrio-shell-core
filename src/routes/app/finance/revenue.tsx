import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { TrendingUp, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";

export const Route = createFileRoute("/app/finance/revenue")({
  component: RevenuePage,
});

function RevenuePage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Revenue Analysis"
        description="Detailed breakdown of gross revenue, net margins and collection performance."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <DashboardKpiCard title="Gross Revenue" value="₹ 48.2L" trend="+14%" icon={DollarSign} />
        <DashboardKpiCard title="Net Revenue" value="₹ 35.8L" trend="+12%" icon={TrendingUp} />
        <DashboardKpiCard title="Paid Coll." value="₹ 42.5L" trend="+8%" icon={ArrowUpRight} />
        <DashboardKpiCard title="Refunds" value="₹ 42K" trend="+1%" icon={ArrowDownRight} />
        <DashboardKpiCard title="Expenses" value="₹ 12.4L" trend="+5%" icon={ArrowDownRight} />
        <DashboardKpiCard title="Net Position" value="₹ 30.1L" trend="+13%" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="Revenue Breakdown" description="Monthly gross vs net revenue distribution.">
            <div className="h-80 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/5 gap-3">
              <BarChart3 className="h-8 w-8 text-primary/40" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Revenue Growth visualization</p>
            </div>
          </SectionCard>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <SectionCard title="By Business" description="Revenue contribution per brand.">
            <div className="h-80 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/5 gap-3">
              <PieChart className="h-8 w-8 text-primary/40" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Market Share analysis</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}