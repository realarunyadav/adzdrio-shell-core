import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { TrendingUp, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { getFinanceModel } from "@/lib/mock/workspace.demo";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart as RePieChart,
  Pie,
  Legend
} from 'recharts';

export const Route = createFileRoute("/app/finance/revenue")({
  component: RevenuePage,
});

function RevenuePage() {
  const finance = getFinanceModel();
  
  const kpiData = [
    { title: "Gross Revenue", value: finance.formatted.grossRevenue, trend: "+14%", icon: DollarSign },
    { title: "Net Revenue", value: finance.formatted.netRevenue, trend: "+12%", icon: TrendingUp },
    { title: "Paid Coll.", value: finance.formatted.paidCollections, trend: "+8%", icon: ArrowUpRight },
    { title: "Refunds", value: finance.formatted.refunds, trend: "+1%", icon: ArrowDownRight },
    { title: "Expenses", value: finance.formatted.expenses, trend: "+5%", icon: ArrowDownRight },
    { title: "Net Position", value: finance.formatted.netPosition, trend: "+13%", icon: TrendingUp },
  ];

  const barData = [
    { name: 'May', gross: 3200000, net: 2800000 },
    { name: 'Jun', gross: 3800000, net: 3400000 },
    { name: 'Jul', gross: 4200000, net: 3800000 },
    { name: 'Aug', gross: 4820000, net: 4778000 },
  ];

  const pieData = [
    { name: 'Acme India', value: 2470000, color: 'var(--color-primary)' },
    { name: 'Vertex Tech', value: 1640000, color: '#22c55e' },
    { name: 'Blue Harbour', value: 710000, color: '#f59e0b' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Revenue Analysis"
        description="Detailed breakdown of gross revenue, net margins and collection performance."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi) => (
          <DashboardKpiCard key={kpi.title} title={kpi.title} value={kpi.value} trend={kpi.trend} icon={kpi.icon} />
        ))}
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