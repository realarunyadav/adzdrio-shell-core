import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import * as React from "react";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  PieChart, 
  Clock,
  Filter,
  Plus,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  FileText
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { Button } from "@/components/ui/button";
import { demoPayments, demoTransactions, demoExpenses, demoRefunds, getFinanceModel } from "@/lib/mock/workspace.demo";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

export const Route = createFileRoute("/app/finance/")({
  component: FinanceModuleLayout,
});

function FinanceModuleLayout() {
  return (
    <>
      <FinanceDashboard />
      <Outlet />
    </>
  );
}

function FinanceDashboard() {
  const { location } = useRouterState();
  const finance = getFinanceModel();
  
  // Only show the dashboard if we are exactly at /app/finance or /app/finance/
  if (location.pathname !== "/app/finance" && location.pathname !== "/app/finance/") {
    return null;
  }

  const kpiData = [
    { title: "Total Revenue", value: finance.formatted.grossRevenue, trend: "+14.2%", icon: TrendingUp },
    { title: "Paid Coll.", value: finance.formatted.paidCollections, trend: "+8.5%", icon: CreditCard },
    { title: "Pending", value: finance.formatted.pendingCollections, trend: "-2.4%", icon: Clock },
    { title: "Refunds", value: finance.formatted.refunds, trend: "+1.2%", icon: RefreshCw },
    { title: "Expenses", value: finance.formatted.expenses, trend: "+5.7%", icon: ArrowDownRight },
    { title: "Net Position", value: finance.formatted.netPosition, trend: "+12.8%", icon: DollarSign },
  ];

  const trendData = [
    { name: 'Aug 01', revenue: 420000, collections: 380000 },
    { name: 'Aug 05', revenue: 850000, collections: 720000 },
    { name: 'Aug 10', revenue: 1200000, collections: 1050000 },
    { name: 'Aug 15', revenue: 1850000, collections: 1600000 },
    { name: 'Aug 20', revenue: 2600000, collections: 2200000 },
    { name: 'Aug 25', revenue: 3800000, collections: 3400000 },
    { name: 'Aug 30', revenue: 4820000, collections: 4250000 },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Financial Operations"
        title="Finance Command Center"
        description="Monitor collections, revenue, refunds, expenses, reconciliation and payroll."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              This Month
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Record Expense
            </Button>
          </div>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi) => (
          <DashboardKpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            icon={kpi.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Overview Chart */}
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="Revenue & Collections Trend" description="Comparison of gross revenue vs actual collections.">
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorColl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 700, padding: '2px 0' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                    name="Gross Revenue"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="collections" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorColl)" 
                    name="Paid Collections"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* Indicators & Alerts */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <SectionCard title="Financial Indicators">
            <div className="space-y-4">
              {[
                { label: 'Failed Payments', value: '₹ 18K', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-500/10' },
                { label: 'Outstanding Amount', value: finance.formatted.pendingCollections, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
                { label: 'Reconciliation Status', value: '98.2%', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-500/10' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${item.bg}`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <span className="text-xs font-bold">{item.label}</span>
                  </div>
                  <span className="text-xs font-black">{item.value}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recent Transactions">
            <div className="space-y-3">
              {demoTransactions.slice(0, 3).map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "size-8 rounded-full flex items-center justify-center",
                      txn.type === 'Payment' ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    )}>
                      {txn.type === 'Payment' ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold group-hover:text-primary transition-colors">{txn.customerName}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{txn.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black">₹ {txn.amount.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(txn.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest h-8">
                View All Ledger <ChevronRight className="ml-1 size-3" />
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>
      
      {/* Security UI Indicator */}
      <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-start gap-3">
        <ShieldCheck className="size-5 text-blue-600 mt-0.5" />
        <div>
          <h4 className="text-xs font-black text-blue-900">Enterprise Financial Boundary</h4>
          <p className="text-[10px] text-blue-800/70 font-medium leading-relaxed mt-1">
            Access to financial records is strictly audited. All transactions are logged with AES-256 encryption. 
            Prototype mode: Demonstrating restricted data visualization.
          </p>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
