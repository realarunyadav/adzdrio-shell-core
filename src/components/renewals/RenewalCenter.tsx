import * as React from "react";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  AlertCircle,
  TrendingDown,
  ArrowUpRight,
  Filter,
  Search,
  MoreHorizontal,
  History,
  Phone,
  MessageSquare,
  Zap,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function RenewalCenter() {
  const renewals = [
    { id: "REN-2026-001", customer: "Global Media Group", value: "₹ 45.0L", employee: "Rahul S.", stage: "Interested", lastContact: "2h ago", nextFollowup: "Today, 4 PM", status: "At Risk" },
    { id: "REN-2026-002", customer: "TechNova Solutions", value: "₹ 12.5L", employee: "Priya V.", stage: "Payment Pending", lastContact: "1d ago", nextFollowup: "Aug 10, 10 AM", status: "Healthy" },
    { id: "REN-2026-003", customer: "Indo Logistics", value: "₹ 8.2L", employee: "Rahul S.", stage: "Contacted", lastContact: "3h ago", nextFollowup: "Today, 2 PM", status: "High Value" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Renewals Due (30D)" value="24" trend="+4" icon={Calendar} subtext="Total Value: ₹ 1.2Cr" />
        <StatsCard title="Renewal Probability" value="88%" trend="+2.4%" icon={TrendingUp} subtext="System AI Prediction" />
        <StatsCard title="At-Risk Revenue" value="₹ 45L" trend="1 Client" icon={AlertCircle} tone="danger" subtext="High Priority Escalation" />
        <StatsCard title="Conversion Rate" value="94.2%" trend="+0.8%" icon={Zap} subtext="MTD Performance" />
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <SectionCard 
            title="Renewal Pipeline Directory" 
            description="Manage active renewal cycles, follow-ups, and conversion workflows."
            contentClassName="p-0"
            actions={
              <div className="flex gap-2">
                 <div className="relative group">
                    <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search renewals..." className="w-[200px] h-9 pl-9 text-xs glass-surface" />
                 </div>
                 <Button variant="outline" size="sm" className="h-9 glass-surface"><Filter className="mr-2 size-3.5" /> Filters</Button>
              </div>
            }
          >
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="text-[10px] uppercase font-black">Customer / ID</TableHead>
                  <TableHead className="text-[10px] uppercase font-black">Value</TableHead>
                  <TableHead className="text-[10px] uppercase font-black">Stage</TableHead>
                  <TableHead className="text-[10px] uppercase font-black">Follow-up</TableHead>
                  <TableHead className="text-[10px] uppercase font-black">Owner</TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renewals.map((ren) => (
                  <TableRow key={ren.id} className="text-xs hover:bg-muted/5 group cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "size-2 rounded-full",
                          ren.status === 'At Risk' ? 'bg-danger' : ren.status === 'Healthy' ? 'bg-success' : 'bg-primary'
                        )} />
                        <div>
                          <p className="font-bold group-hover:text-primary transition-colors">{ren.customer}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{ren.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{ren.value}</TableCell>
                    <TableCell>
                      <StatusBadge tone={ren.stage === 'Payment Pending' ? 'info' : ren.stage === 'Interested' ? 'warning' : 'neutral'}>
                        {ren.stage}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{ren.nextFollowup}</span>
                        <span className="text-[9px] italic opacity-60">Last: {ren.lastContact}</span>
                      </div>
                    </TableCell>
                    <TableCell>{ren.employee}</TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" className="size-8"><MoreHorizontal className="size-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="Renewal Intelligence (AI)">
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="size-4 text-primary" />
                  <p className="text-[10px] uppercase font-black text-primary tracking-widest">AI Strategic Forecast</p>
                </div>
                <p className="text-xs font-bold leading-relaxed">
                  Renewal concentration is high in late August. Recommend initiating "Platinum Loyalty Program" for top 5 customers to secure ₹ 1.8Cr pipeline.
                </p>
                <div className="mt-4 space-y-2">
                  <IntelligenceMetric label="Pipeline Health" value={92} />
                  <IntelligenceMetric label="Churn Risk Index" value={8} invert />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Expiry Concentration</p>
                <div className="flex items-end gap-1 h-20 px-2">
                   {[40, 70, 45, 90, 30, 60, 85].map((h, i) => (
                     <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary/40 transition-colors" style={{ height: `${h}%` }} />
                   ))}
                </div>
                <div className="flex justify-between text-[8px] uppercase font-black text-muted-foreground/60">
                   <span>W1</span>
                   <span>W2</span>
                   <span>W3</span>
                   <span>W4</span>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Quick Actions">
             <div className="grid grid-cols-2 gap-2">
                <RenewalActionBtn icon={Phone} label="Record Call" />
                <RenewalActionBtn icon={MessageSquare} label="Send Link" />
                <RenewalActionBtn icon={History} label="History" />
                <RenewalActionBtn icon={AlertTriangle} label="Escalate" />
             </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, trend, icon: Icon, subtext, tone = "neutral" }: any) {
  return (
    <Card className="surface-card border-border/40 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{title}</p>
          <div className={cn(
            "size-8 rounded-lg flex items-center justify-center",
            tone === 'danger' ? 'bg-danger/10 text-danger' : 'bg-muted/50 text-muted-foreground'
          )}>
            <Icon className="size-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-black tracking-tighter">{value}</h4>
          <Badge variant="outline" className={cn(
            "text-[9px] px-1 py-0 border-none font-bold",
            tone === 'danger' ? 'text-danger bg-danger/10' : 'text-success bg-success/10'
          )}>
            {trend}
          </Badge>
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground italic">{subtext}</p>
      </CardContent>
    </Card>
  );
}

function IntelligenceMetric({ label, value, invert = false }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-[10px] font-bold">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className={cn("h-1", invert ? "bg-rose-500/20" : "bg-primary/20")} />
    </div>
  );
}

function RenewalActionBtn({ icon: Icon, label }: any) {
  return (
    <Button variant="outline" className="h-16 flex flex-col gap-2 glass-surface border-border/40 hover:border-primary/40 transition-all">
      <Icon className="size-4" />
      <span className="text-[9px] uppercase font-black tracking-widest">{label}</span>
    </Button>
  );
}
