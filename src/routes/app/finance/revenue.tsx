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
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-muted-foreground)' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-muted-foreground)' }}
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}
                    labelStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', paddingTop: '20px' }} />
                  <Bar dataKey="gross" fill="var(--color-primary)" name="Gross Revenue" radius={[4, 4, 0, 0]} barSize={40} />
                  <Bar dataKey="net" fill="#22c55e" name="Net Revenue" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <SectionCard title="By Business" description="Revenue contribution per brand.">
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}