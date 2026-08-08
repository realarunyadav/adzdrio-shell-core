import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShieldAlert, 
  Zap,
  Activity,
  BarChart3,
  AlertCircle,
  Sparkles
} from "lucide-react";

export function CEOAssistant() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <SectionCard 
            title="Strategic Business Intelligence" 
            className="border-primary/20 bg-primary/5"
            actions={<Button size="sm" className="h-8 shadow-elevated"><Sparkles className="size-3 mr-2" /> Regenerate Analysis</Button>}
          >
            <div className="space-y-6">
              <div className="p-5 rounded-2xl glass-surface border border-border/40 space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-border/40">
                  <Bot className="size-5 text-primary" />
                  <h3 className="text-sm font-black tracking-tight">AI Executive Summary — Q3 Progress</h3>
                </div>
                
                <div className="space-y-4 text-xs leading-relaxed text-muted-foreground italic">
                  <p>
                    <strong className="text-foreground not-italic font-bold block mb-1 uppercase tracking-tighter">Revenue & Growth:</strong>
                    ABOS is tracking 14% ahead of the Q3 target. Monthly Recurring Revenue has stabilized at ₹ 12.4L. AI suggests that the current pipeline velocity is sufficient to reach the ₹ 15L stretch goal by October.
                  </p>
                  <p>
                    <strong className="text-foreground not-italic font-bold block mb-1 uppercase tracking-tighter">Operational Risks:</strong>
                    I've detected a slight increase in support response times (avg. +12m) in the Finance module. This correlates with the recent tax configuration updates. Recommend re-allocating 2 agents from general support to Finance.
                  </p>
                  <p>
                    <strong className="text-foreground not-italic font-bold block mb-1 uppercase tracking-tighter">Employee Performance:</strong>
                    Sales team productivity is up 22% following the implementation of the AI Sales Coach. 84% of employees have met their weekly training quotas.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 text-[9px] text-muted-foreground uppercase font-bold tracking-widest opacity-50 border-t border-border/40">
                  <ShieldAlert className="size-3" />
                  Interpretation provided by ABOS AI. Verify with raw ledger data below.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MiniMetric label="Real Revenue" value="₹ 12,42,800" trend="+14%" tone="success" />
                <MiniMetric label="Sales Pipeline" value="₹ 48,50,000" trend="+8%" tone="success" />
                <MiniMetric label="Total Risks" value="3 Critical" trend="High Alert" tone="danger" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Important Strategic Alerts">
            <div className="space-y-3">
              <AlertItem 
                title="Potential Contract Churn Risk" 
                description="Global Media Group has visited the 'Cancel Subscription' page 3 times in 48 hours." 
                priority="Critical" 
              />
              <AlertItem 
                title="New Market Opportunity" 
                description="AI detected a surge in leads from the Healthcare sector (avg. deal size ₹ 8L)." 
                priority="Strategic" 
              />
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="Performance Distribution">
            <div className="h-[240px] flex items-center justify-center">
              <BarChart3 className="size-16 opacity-10" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                <span>Sales Growth</span>
                <span className="text-success">+22%</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success w-[82%]" />
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                <span>Operational Efficiency</span>
                <span className="text-primary">+12%</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%]" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Strategic Health Index" className="bg-success/5 border-success/20">
            <div className="flex flex-col items-center py-4">
              <div className="text-4xl font-black mb-1">94</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-success mb-4">Excellent</div>
              <p className="text-[10px] text-center text-muted-foreground leading-relaxed italic">
                Business operations are currently in a stable growth phase with no immediate high-level blockers detected.
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ label, value, trend, tone }: any) {
  const toneMap: any = {
    success: "text-success",
    danger: "text-destructive",
    primary: "text-primary"
  };

  return (
    <div className="p-3 rounded-xl glass-surface border border-border/40">
      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <h4 className="text-sm font-black tracking-tight">{value}</h4>
      <p className={`text-[9px] font-bold mt-1 ${toneMap[tone]}`}>{trend}</p>
    </div>
  );
}

function AlertItem({ title, description, priority }: any) {
  const prioMap: any = {
    Critical: "bg-destructive text-destructive-foreground",
    Strategic: "bg-primary text-primary-foreground",
    Normal: "bg-muted text-muted-foreground"
  };

  return (
    <div className="p-4 rounded-xl border border-border/40 flex items-start gap-4 hover:border-primary/40 transition-all cursor-pointer">
      <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <AlertCircle className="size-4 opacity-50" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold">{title}</h4>
          <Badge className={`text-[8px] px-1 py-0 h-4 ${prioMap[priority]}`}>{priority}</Badge>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
