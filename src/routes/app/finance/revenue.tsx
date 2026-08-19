import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { TrendingUp, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, DollarSign, AlertCircle, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { financeService } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  const { 
    data: analytics, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['finance-analytics'],
    queryFn: () => financeService.getFinanceAnalytics(),
  });
  
  const kpiData = [
    { title: "Gross Revenue", value: analytics?.grossRevenue || [], icon: DollarSign },
    { title: "Net Revenue", value: analytics?.netRevenue || [], icon: TrendingUp },
    { title: "Collected Revenue", value: analytics?.collectedRevenue || [], icon: ArrowUpRight },
    { title: "Refunds", value: analytics?.refunds || [], icon: ArrowDownRight },
  ];

  // For charts, we use a single currency view or separate series.
  // Since we don't have historical data yet in Supabase for a timeline, we'll keep the bar data as is or show "No live historical data".
  const barData = [
    { name: 'Live Data', gross: analytics?.grossRevenue[0]?.value || 0, net: analytics?.netRevenue[0]?.value || 0 },
  ];

  const pieData = (analytics?.grossRevenue || []).map((gr, idx) => ({
    name: gr.currency,
    value: gr.value,
    color: idx === 0 ? 'var(--color-primary)' : idx === 1 ? '#22c55e' : '#f59e0b'
  }));

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 pb-20 p-8 animate-pulse">
        <div className="h-20 bg-muted rounded-xl w-1/3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="m-8 p-8 border-none surface-card text-center">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-black mb-2">Analytics Failed</h2>
        <p className="text-muted-foreground mb-4">{error instanceof Error ? error.message : 'Unknown error'}</p>
        <Button onClick={() => refetch()} variant="outline"><RefreshCw className="w-4 h-4 mr-2" /> Retry</Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Finance Module"
        title="Revenue Analysis"
        description="Detailed breakdown of gross revenue, net margins and collection performance."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <DashboardKpiCard key={kpi.title} title={kpi.title} value={kpi.value} trend="Live" icon={kpi.icon} />
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
                    tickFormatter={(value) => value.toLocaleString()}
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