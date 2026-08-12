import { useEffect, useMemo, useState } from 'react';
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
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { financeService } from '@/lib/api/services';

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
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [paymentRows, invoiceRows] = await Promise.all([
        financeService.getPayments(),
        financeService.getInvoices(),
      ]);
      setPayments(Array.isArray(paymentRows) ? paymentRows : []);
      setInvoices(Array.isArray(invoiceRows) ? invoiceRows : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load finance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const verifiedPayments = useMemo(
    () => payments.filter((p) => String(p.status ?? '').toUpperCase() === 'VERIFIED'),
    [payments],
  );
  const pendingPayments = useMemo(
    () => payments.filter((p) => String(p.status ?? '').toUpperCase() === 'PENDING'),
    [payments],
  );
  const paidInvoices = useMemo(
    () => invoices.filter((i) => String(i.status ?? '').toUpperCase() === 'PAID'),
    [invoices],
  );

  const currency = verifiedPayments[0]?.currency || invoices[0]?.currency || 'USD';
  const revenue = verifiedPayments.reduce((sum, p) => sum + amountOf(p), 0);
  const pending = pendingPayments.reduce((sum, p) => sum + amountOf(p), 0);
  const invoiced = invoices.reduce((sum, i) => sum + amountOf(i), 0);
  const collections = paidInvoices.reduce((sum, i) => sum + amountOf(i), 0);
  const collectionRate = invoiced > 0 ? Math.min(100, Math.round((collections / invoiced) * 100)) : 0;

  const stats = [
    { label: 'Verified Revenue', value: money(revenue, currency), icon: TrendingUp },
    { label: 'Pending Payments', value: money(pending, currency), icon: CreditCard },
    { label: 'Total Invoiced', value: money(invoiced, currency), icon: Receipt },
    { label: 'Paid Invoices', value: String(paidInvoices.length), icon: BarChart3 },
    { label: 'MRR', value: '—', icon: Activity },
    { label: 'ARR', value: '—', icon: TrendingUp },
    { label: 'Collections', value: money(collections, currency), icon: Wallet },
    { label: 'Outstanding', value: money(Math.max(invoiced - collections, 0), currency), icon: CreditCard },
  ];

  if (loading) {
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
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={() => void load()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => void load()}>
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 border-none surface-card surface-card-hover group">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-muted group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="outline" className="text-[10px] font-bold">
                Live
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-black tracking-tight">{stat.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 border-none surface-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Recent Payments</h3>
            <Badge variant="outline">{payments.length} records</Badge>
          </div>
          {payments.length === 0 ? (
            <div className="h-[260px] flex items-center justify-center text-sm text-muted-foreground">No payment data available yet.</div>
          ) : (
            <div className="space-y-3">
              {payments.slice(0, 8).map((payment, index) => (
                <div key={payment.id ?? index} className="flex items-center justify-between rounded-xl border p-3">
                  <div>
                    <div className="text-xs font-bold">{payment.id ?? 'Payment'}</div>
                    <div className="text-[10px] text-muted-foreground">{payment.createdAt ? new Date(payment.createdAt).toLocaleString() : 'Date unavailable'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black">{money(amountOf(payment), payment.currency || currency)}</div>
                    <Badge variant="outline" className="text-[10px]">{payment.status ?? 'UNKNOWN'}</Badge>
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
              <div className="flex justify-between mb-2"><span className="text-muted-foreground">Invoiced</span><span className="font-bold">{money(invoiced, currency)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Collected</span><span className="font-bold">{money(collections, currency)}</span></div>
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
