import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CircleDollarSign, RefreshCw, Target, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";
import { authService, dealService } from "@/lib/api/services";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/modules/crm/forecast")({ component: CrmForecastPage });

type Deal = { id: string; name: string; amount?: number; probability?: number; stage?: string; ownerId?: string; ownerName?: string; expectedCloseDate?: string | null; accountName?: string };
type PipelineItem = { stage: string; count: number; totalAmount: number; weightedAmount: number };
type User = { id: string; name: string; email: string; status?: string };

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
const pct = (value: number) => `${Math.round(value)}%`;
const daysUntil = (date?: string | null) => { if (!date) return null; const d = new Date(date); if (Number.isNaN(d.getTime())) return null; return Math.ceil((d.getTime() - Date.now()) / 86400000); };

function CrmForecastPage() {
  const [deals, setDeals] = React.useState<Deal[]>([]);
  const [pipeline, setPipeline] = React.useState<PipelineItem[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const load = React.useCallback(async (silent = false) => {
    try {
      silent ? setRefreshing(true) : setLoading(true);
      const [dealData, pipelineData, userData] = await Promise.all([dealService.getAll(), dealService.getPipeline(), authService.getOrganizationUsers()]);
      setDeals(dealData ?? []); setPipeline(pipelineData ?? []); setUsers(userData ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Unable to load sales forecast");
    } finally { setLoading(false); setRefreshing(false); }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  const openDeals = deals.filter((d) => !/WON|LOST/i.test(String(d.stage ?? "")));
  const wonDeals = deals.filter((d) => /WON/i.test(String(d.stage ?? "")));
  const lostDeals = deals.filter((d) => /LOST/i.test(String(d.stage ?? "")));
  const openValue = openDeals.reduce((s, d) => s + Number(d.amount ?? 0), 0);
  const wonValue = wonDeals.reduce((s, d) => s + Number(d.amount ?? 0), 0);
  const weightedOpen = openDeals.reduce((s, d) => s + Number(d.amount ?? 0) * (Number(d.probability ?? 0) / 100), 0);
  const closedCount = wonDeals.length + lostDeals.length;
  const winRate = closedCount ? (wonDeals.length / closedCount) * 100 : 0;
  const forecast30 = openDeals.filter((d) => { const days = daysUntil(d.expectedCloseDate); return days !== null && days >= 0 && days <= 30; }).reduce((s, d) => s + Number(d.amount ?? 0) * (Number(d.probability ?? 0) / 100), 0);

  const byOwner = React.useMemo(() => {
    const map = new Map<string, { name: string; deals: number; value: number; weighted: number; won: number }>();
    for (const deal of deals) {
      const key = deal.ownerId ?? "unassigned"; const existing = map.get(key) ?? { name: deal.ownerName ?? "Unassigned", deals: 0, value: 0, weighted: 0, won: 0 };
      existing.deals += 1; existing.value += Number(deal.amount ?? 0); existing.weighted += Number(deal.amount ?? 0) * (Number(deal.probability ?? 0) / 100); if (/WON/i.test(String(deal.stage ?? ""))) existing.won += Number(deal.amount ?? 0); map.set(key, existing);
    }
    for (const user of users) if (!map.has(user.id)) map.set(user.id, { name: user.name, deals: 0, value: 0, weighted: 0, won: 0 });
    return [...map.values()].sort((a, b) => b.weighted - a.weighted);
  }, [deals, users]);

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Loading sales forecast…</div>;

  return <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-500">
    <PageHeader eyebrow="Adzdrio Sales Intelligence" title="Forecast & Revenue Intelligence" description="Live weighted pipeline, forecast horizon, conversion performance, and salesperson contribution from the ABOS backend." actions={<Button variant="outline" size="sm" onClick={() => void load(true)} disabled={refreshing}><RefreshCw className={`mr-2 size-3.5 ${refreshing ? "animate-spin" : ""}`} />Refresh</Button>} />

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <Kpi icon={CircleDollarSign} label="Open Pipeline" value={money(openValue)} />
      <Kpi icon={TrendingUp} label="Weighted Forecast" value={money(weightedOpen)} />
      <Kpi icon={Target} label="30-Day Forecast" value={money(forecast30)} />
      <Kpi icon={BarChart3} label="Won Revenue" value={money(wonValue)} />
      <Kpi icon={Users} label="Win Rate" value={pct(winRate)} />
    </div>

    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <SectionCard title="Pipeline by Stage" description="Live stage totals and probability-weighted value.">
        <div className="space-y-4">
          {pipeline.map((item) => { const max = Math.max(...pipeline.map((p) => p.totalAmount), 1); const width = Math.min(100, (item.totalAmount / max) * 100); return <div key={item.stage} className="space-y-2">
            <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Badge variant="outline">{item.stage}</Badge><span className="text-xs text-muted-foreground">{item.count} deals</span></div><div className="text-right"><p className="text-xs font-bold">{money(item.totalAmount)}</p><p className="text-[10px] text-muted-foreground">Weighted {money(item.weightedAmount)}</p></div></div>
            <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${width}%` }} /></div>
          </div>; })}
          {!pipeline.length && <p className="py-8 text-center text-sm text-muted-foreground">No pipeline data available.</p>}
        </div>
      </SectionCard>

      <SectionCard title="Forecast Snapshot" description="Executive-level sales health indicators.">
        <div className="space-y-4">
          <Metric label="Total deals" value={String(deals.length)} />
          <Metric label="Open deals" value={String(openDeals.length)} />
          <Metric label="Won / Lost" value={`${wonDeals.length} / ${lostDeals.length}`} />
          <Metric label="Closed revenue" value={money(wonValue)} />
          <Metric label="Weighted open" value={money(weightedOpen)} />
          <Metric label="30-day weighted" value={money(forecast30)} />
        </div>
      </SectionCard>
    </div>

    <SectionCard title="Salesperson Performance" description="Contribution calculated from live deal ownership and probability.">
      <Table><TableHeader><TableRow><TableHead>Salesperson</TableHead><TableHead>Deals</TableHead><TableHead>Pipeline</TableHead><TableHead>Weighted</TableHead><TableHead>Won Revenue</TableHead><TableHead>Share</TableHead></TableRow></TableHeader><TableBody>
        {byOwner.map((owner) => <TableRow key={owner.name}><TableCell className="font-semibold text-xs">{owner.name}</TableCell><TableCell className="text-xs">{owner.deals}</TableCell><TableCell className="text-xs">{money(owner.value)}</TableCell><TableCell className="text-xs font-semibold">{money(owner.weighted)}</TableCell><TableCell className="text-xs">{money(owner.won)}</TableCell><TableCell className="text-xs">{openValue ? pct((owner.weighted / Math.max(weightedOpen, 1)) * 100) : "0%"}</TableCell></TableRow>)}
        {!byOwner.length && <TableRow><TableCell colSpan={6} className="h-28 text-center text-sm text-muted-foreground">No salesperson data available.</TableCell></TableRow>}
      </TableBody></Table>
    </SectionCard>

    <SectionCard title="Upcoming Close Forecast" description="Open deals with an expected close date, ordered by nearest close.">
      <Table><TableHeader><TableRow><TableHead>Deal</TableHead><TableHead>Account</TableHead><TableHead>Stage</TableHead><TableHead>Close</TableHead><TableHead>Amount</TableHead><TableHead>Weighted</TableHead></TableRow></TableHeader><TableBody>
        {[...openDeals].filter((d) => d.expectedCloseDate).sort((a, b) => new Date(a.expectedCloseDate!).getTime() - new Date(b.expectedCloseDate!).getTime()).slice(0, 12).map((deal) => { const weighted = Number(deal.amount ?? 0) * (Number(deal.probability ?? 0) / 100); const days = daysUntil(deal.expectedCloseDate); return <TableRow key={deal.id}><TableCell className="text-xs font-semibold">{deal.name}</TableCell><TableCell className="text-xs">{deal.accountName || "—"}</TableCell><TableCell><Badge variant="outline">{deal.stage || "NEW"}</Badge></TableCell><TableCell className="text-xs">{new Date(deal.expectedCloseDate!).toLocaleDateString()} {days !== null ? <span className="text-muted-foreground">({days < 0 ? "overdue" : `${days}d`})</span> : null}</TableCell><TableCell className="text-xs">{money(Number(deal.amount ?? 0))}</TableCell><TableCell className="text-xs font-semibold">{money(weighted)}</TableCell></TableRow>; })}
        {!openDeals.some((d) => d.expectedCloseDate) && <TableRow><TableCell colSpan={6} className="h-28 text-center text-sm text-muted-foreground">No dated open deals available.</TableCell></TableRow>}
      </TableBody></Table>
    </SectionCard>
  </div>;
}

function Kpi({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) { return <Card><CardContent className="flex items-center gap-3 p-4"><Icon className="size-5 text-muted-foreground" /><div className="min-w-0"><p className="truncate text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p><p className="mt-1 text-xl font-black tracking-tight">{value}</p></div></CardContent></Card>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0 last:pb-0"><span className="text-xs text-muted-foreground">{label}</span><span className="text-sm font-bold">{value}</span></div>; }
