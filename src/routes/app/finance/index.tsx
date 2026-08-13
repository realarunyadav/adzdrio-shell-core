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
import { demoPayments, demoTransactions, demoExpenses, demoRefunds } from "@/lib/mock/workspace.demo";

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
  
  // Only show the dashboard if we are exactly at /app/finance or /app/finance/
  if (location.pathname !== "/app/finance" && location.pathname !== "/app/finance/") {
    return null;
  }

  const totalRevenue = "₹ 48.2L";
  const paidCollections = "₹ 42.5L";
  const pendingCollections = "₹ 5.7L";
  const totalRefunds = "₹ 42K";
  const totalExpenses = "₹ 12.4L";
  const netPosition = "₹ 30.1L";

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
        <DashboardKpiCard
          title="Total Revenue"
          value={totalRevenue}
          trend="+14.2%"
          icon={TrendingUp}
        />
        <DashboardKpiCard
          title="Paid Coll."
          value={paidCollections}
          trend="+8.5%"
          icon={CreditCard}
        />
        <DashboardKpiCard
          title="Pending"
          value={pendingCollections}
          trend="-2.4%"
          icon={Clock}
        />
        <DashboardKpiCard
          title="Refunds"
          value={totalRefunds}
          trend="+1.2%"
          icon={RefreshCw}
        />
        <DashboardKpiCard
          title="Expenses"
          value={totalExpenses}
          trend="+5.7%"
          icon={ArrowDownRight}
        />
        <DashboardKpiCard
          title="Net Position"
          value={netPosition}
          trend="+12.8%"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Overview Chart Placeholder */}
        <div className="col-span-12 lg:col-span-8">
          <SectionCard title="Revenue & Collections Trend" description="Comparison of gross revenue vs actual collections.">
            <div className="h-80 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/5 gap-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black">Revenue Analytics Engine</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Real-time financial visualization pipeline</p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Indicators & Alerts */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <SectionCard title="Financial Indicators">
            <div className="space-y-4">
              {[
                { label: 'Failed Payments', value: '₹ 18K', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-500/10' },
                { label: 'Outstanding Amount', value: '₹ 4.2L', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
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
