import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import * as React from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Users, 
  Target, 
  BarChart3,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Plus,
  RefreshCw
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { DashboardKpiCard } from "@/components/shared/DashboardKpiCard";
import { demoSales, demoPayments, DemoSale } from "@/lib/mock/workspace.demo";
import { Button } from "@/components/ui/button";
import { CreateSaleWizard } from "@/components/sales/CreateSaleWizard";
import { SaleDetailsDrawer } from "@/components/sales/SaleDetailsDrawer";

export const Route = createFileRoute("/app/sales/")({
  component: SalesModuleLayout,
});

function SalesModuleLayout() {
  const [isWizardOpen, setIsWizardOpen] = React.useState(false);
  const [selectedSale, setSelectedSale] = React.useState<DemoSale | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openSaleDetails = (sale: DemoSale) => {
    setSelectedSale(sale);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <SalesDashboard onOpenWizard={() => setIsWizardOpen(true)} onOpenSale={openSaleDetails} />
      <Outlet />
      <CreateSaleWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
      <SaleDetailsDrawer sale={selectedSale} open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
}

interface SalesDashboardProps {
  onOpenWizard: () => void;
  onOpenSale: (sale: DemoSale) => void;
}

function SalesDashboard({ onOpenWizard, onOpenSale }: SalesDashboardProps) {
  const { location } = useRouterState();
  
  // Only show the dashboard if we are exactly at /app/sales or /app/sales/
  if (location.pathname !== "/app/sales" && location.pathname !== "/app/sales/") {
    return null;
  }

  const totalSalesValue = demoSales.reduce((acc, sale) => acc + sale.finalAmount, 0);
  const paidSalesValue = demoPayments.filter(p => p.status === 'Paid').reduce((acc, p) => acc + p.amount, 0);
  const pendingPaymentsValue = totalSalesValue - paidSalesValue;

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Sales Operations"
        title="Sales Command Center"
        description="Monitor sales performance, deals, collections and payment activity."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              This Month
            </Button>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 font-bold" onClick={onOpenWizard}>
              <Plus className="mr-2 h-4 w-4" />
              New Sale
            </Button>
          </div>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <DashboardKpiCard
          title="Total Sales"
          value={`₹ ${(totalSalesValue / 1000).toFixed(1)}K`}
          trend="+12.4%"
          icon={TrendingUp}
        />
        <DashboardKpiCard
          title="Paid Sales"
          value={`₹ ${(paidSalesValue / 1000).toFixed(1)}K`}
          trend="+8.2%"
          icon={Zap}
        />
        <DashboardKpiCard
          title="Pending"
          value={`₹ ${(pendingPaymentsValue / 1000).toFixed(1)}K`}
          trend="-2.1%"
          icon={Clock}
        />
        <DashboardKpiCard
          title="Revenue"
          value="₹ 24.7L"
          trend="+5.2%"
          icon={DollarSign}
        />
        <DashboardKpiCard
          title="Conv. Rate"
          value="18.6%"
          trend="+1.2%"
          icon={Target}
        />
        <DashboardKpiCard
          title="Avg Sale"
          value="₹ 12.4K"
          trend="+3.5%"
          icon={BarChart3}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <SectionCard title="Sales Pipeline" description="Current deal distribution across stages.">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 py-4">
              {['New', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'].map((stage) => {
                const count = demoSales.filter(s => s.status === (stage as any)).length;
                const value = demoSales.filter(s => s.status === (stage as any)).reduce((acc, s) => acc + s.finalAmount, 0);
                return (
                  <div key={stage} className="flex flex-col gap-1 p-3 rounded-lg border border-border/40 bg-muted/20">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stage}</p>
                    <p className="text-lg font-black">{count}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">₹ {value.toLocaleString()}</p>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Recent Sales" description="Latest closed and active deals.">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase">Customer</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase">Business</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase text-right">Amount</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase text-center">Status</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {demoSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-muted/30 transition-colors cursor-pointer group" onClick={() => onOpenSale(sale)}>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold group-hover:text-primary transition-colors">{sale.customerName}</span>
                          <span className="text-[10px] text-muted-foreground">{sale.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs font-medium">{sale.business}</td>
                      <td className="py-3 px-4 text-xs font-black text-right">₹ {sale.finalAmount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sale.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-600' : 
                            sale.paymentStatus === 'Pending' ? 'bg-yellow-500/10 text-yellow-600' : 
                            'bg-red-500/10 text-red-600'
                          }`}>
                            {sale.paymentStatus.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <SectionCard title="Payment Activity">
            <div className="space-y-4">
              {[
                { label: 'Paid', value: '₹ 18.2L', icon: ArrowUpRight, color: 'text-green-600', bg: 'bg-green-500/10' },
                { label: 'Pending', value: '₹ 4.5L', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
                { label: 'Failed', value: '₹ 22K', icon: ArrowDownRight, color: 'text-red-600', bg: 'bg-red-500/10' },
                { label: 'Refunded', value: '₹ 12K', icon: RefreshCw, color: 'text-blue-600', bg: 'bg-blue-500/10' },
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

          <SectionCard title="Top Performers">
            <div className="space-y-3">
              {[
                { name: 'Ankit Singh', sales: 24, revenue: '₹ 4.2L' },
                { name: 'Sonia Kapoor', sales: 18, revenue: '₹ 3.1L' },
                { name: 'Rahul Dev', sales: 15, revenue: '₹ 2.8L' },
              ].map((perf, i) => (
                <div key={perf.name} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-muted-foreground w-4">{i + 1}.</span>
                    <span className="text-xs font-bold">{perf.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black">{perf.revenue}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">{perf.sales} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
