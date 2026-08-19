import { useMemo } from 'react';
import {
  TrendingUp,
  Receipt,
  BarChart3,
  CreditCard,
  ArrowUpRight,
  Wallet,
  Activity,
  RefreshCw,
  AlertCircle,
  ArrowDownRight,
  DollarSign,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { financeService } from '@/lib/api/services';
import { DashboardKpiCard } from '@/components/shared/DashboardKpiCard';
import { useQuery } from '@tanstack/react-query';

type Payment = {
  id?: string;
  amount?: number | string;
  currency?: string;
  status?: string;
  createdAt?: string;
};

type Invoice = {
  id?: string;
  amount?: number | string;
  currency?: string;
  status?: string;
  createdAt?: string;
};

const money = (value: number, currency = 'USD') =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value);

const amountOf = (row: { amount?: number | string }) => Number(row.amount ?? 0) || 0;

export function FinanceDashboard() {
  const { 
    data: analytics, 
    isLoading: analyticsLoading, 
    error: analyticsError, 
    refetch: refetchAnalytics 
  } = useQuery({
    queryKey: ['finance-analytics'],
    queryFn: () => financeService.getFinanceAnalytics(),
  });

  const { 
    data: invoices, 
    isLoading: invoicesLoading, 
    error: invoicesError,
    refetch: refetchInvoices
  } = useQuery({
    queryKey: ['invoice-analytics'],
    queryFn: () => financeService.getInvoiceAnalytics(),
  });

  const {
    data: transactions,
    isLoading: transactionsLoading,
    error: transactionsError,
    refetch: refetchTransactions
  } = useQuery({
    queryKey: ['finance-transactions'],
    queryFn: () => financeService.listTransactions(),
  });

  const isLoading = analyticsLoading || invoicesLoading || transactionsLoading;
  const error = analyticsError || invoicesError || transactionsError;

  const refetchAll = () => {
    refetchAnalytics();
    refetchInvoices();
    refetchTransactions();
  };

  const collectionRate = invoices?.total && invoices.total > 0 
    ? Math.min(100, Math.round((invoices.paid / invoices.total) * 100)) 
    : 0;

  const stats = [
    { label: 'Gross Revenue', value: analytics?.grossRevenue || [], icon: DollarSign },
    { label: 'Collected Revenue', value: analytics?.collectedRevenue || [], icon: TrendingUp },
    { label: 'Refunds', value: analytics?.refunds || [], icon: ArrowDownRight },
    { label: 'Net Revenue', value: analytics?.netRevenue || [], icon: Wallet },
    { label: 'Total Invoiced', value: String(invoices?.total || 0), icon: Receipt },
    { label: 'Paid Invoices', value: String(invoices?.paid || 0), icon: BarChart3 },
    { label: 'Overdue Invoices', value: String(invoices?.overdue || 0), icon: AlertCircle },
    { label: 'Outstanding Amount', value: invoices?.outstandingAmount || [], icon: CreditCard },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="h-32 border-none surface-card animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-none surface-card p-8">
        <div className="flex flex-col items-center text-center gap-3">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <h3 className="font-black">Finance data unavailable</h3>
          <p className="text-sm text-muted-foreground">{error instanceof Error ? error.message : 'Unable to load finance data'}</p>
          <Button onClick={refetchAll} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={refetchAll}>
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <DashboardKpiCard 
            key={stat.label} 
            title={stat.label} 
            value={stat.value} 
            trend="Live" 
            icon={stat.icon} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 border-none surface-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Recent Transactions</h3>
            <Badge variant="outline">{transactions?.length || 0} records</Badge>
          </div>
          {(!transactions || transactions.length === 0) ? (
            <div className="h-[260px] flex items-center justify-center text-sm text-muted-foreground">No transaction data available yet.</div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 8).map((txn, index) => (
                <div key={txn.id || index} className="flex items-center justify-between rounded-xl border p-3">
                  <div>
                    <div className="text-xs font-bold">{txn.type.toUpperCase()} - {txn.customer_name}</div>
                    <div className="text-[10px] text-muted-foreground">{new Date(txn.created_at).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black">
                      {new Intl.NumberFormat(undefined, { style: 'currency', currency: txn.currency }).format(txn.amount)}
                    </div>
                    <Badge variant="outline" className="text-[10px]">{txn.status.toUpperCase()}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="border-none surface-card p-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Collections</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
              <span>Paid vs Invoiced</span>
              <span>{collectionRate}%</span>
            </div>
            <Progress value={collectionRate} className="h-2" />
            <div className="pt-4 border-t text-sm">
              <div className="flex justify-between mb-2"><span className="text-muted-foreground">Invoiced (Count)</span><span className="font-bold">{invoices?.total || 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Paid (Count)</span><span className="font-bold">{invoices?.paid || 0}</span></div>
            </div>
            <div className="text-xs text-muted-foreground bg-muted/30 rounded-xl p-4">
              MRR, ARR, expense and GST figures are shown only when their corresponding backend data is available; no demo values are used.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
