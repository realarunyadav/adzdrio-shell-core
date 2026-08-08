import { SectionCard } from "@/components/shared/SectionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Activity, 
  Cpu, 
  DollarSign, 
  AlertCircle, 
  ThumbsUp, 
  MessageSquare,
  TrendingUp
} from "lucide-react";

export function AIStudioDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total AI Requests" 
          value="128,432" 
          trend="+12.5%" 
          icon={MessageSquare} 
        />
        <StatsCard 
          title="Avg. Response Time" 
          value="840ms" 
          trend="-40ms" 
          icon={Zap} 
          trendPositive={true}
        />
        <StatsCard 
          title="Active Models" 
          value="4" 
          subtext="GPT-4o, Claude 3.5, Gemini Pro" 
          icon={Cpu} 
        />
        <StatsCard 
          title="Est. Cost (MTD)" 
          value="₹ 8,240" 
          trend="+18%" 
          icon={DollarSign} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SectionCard title="Real-time Performance" className="lg:col-span-8">
          <div className="h-[300px] flex items-center justify-center text-muted-foreground italic">
            <Activity className="size-12 opacity-10 mb-4" />
            <p className="text-sm">Inference latency and throughput visualization</p>
          </div>
        </SectionCard>

        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="Health & Errors">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">Uptime</span>
                <Badge variant="outline" className="text-success bg-success/10 border-none">99.98%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">Error Rate</span>
                <span className="text-xs text-muted-foreground">0.02%</span>
              </div>
              <Progress value={99.98} className="h-1" />
              
              <div className="pt-2">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-2">Recent Errors</p>
                <div className="flex items-center gap-2 p-2 rounded bg-destructive/5 border border-destructive/10">
                  <AlertCircle className="size-3 text-destructive" />
                  <p className="text-[10px]">Rate limit exceeded (OpenAI) - 2m ago</p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="User Satisfaction">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black">4.8</span>
                <span className="text-sm text-muted-foreground">/ 5.0</span>
              </div>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <ThumbsUp key={i} className="size-3 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground text-center">Based on 1,240 employee feedback submissions this week</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, trend, icon: Icon, trendPositive, subtext }: any) {
  return (
    <Card className="glass-surface border-border/40">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
          <Icon className="size-4 text-muted-foreground opacity-50" />
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl font-black tracking-tight">{value}</h3>
          {trend && (
            <span className={`text-[10px] font-bold ${trendPositive ? 'text-success' : 'text-primary'}`}>
              {trend}
            </span>
          )}
        </div>
        {subtext && <p className="text-[10px] text-muted-foreground mt-1">{subtext}</p>}
      </CardContent>
    </Card>
  );
}
