import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardKpiCardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  trendNeutral?: boolean;
}

export function DashboardKpiCard({ title, value, trend, icon: Icon, trendNeutral }: DashboardKpiCardProps) {
  return (
    <Card className="border-border/40 shadow-card glass-surface hover:shadow-elevated premium-transition overflow-hidden group border-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
            <Icon className="size-5 text-primary" />
          </div>
          <Badge variant="outline" className={cn(
            "text-[9px] font-black uppercase tracking-tighter px-2 h-5",
            trendNeutral ? "text-muted-foreground border-border/60" : "text-success border-success/30 bg-success/5"
          )}>{trend}</Badge>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">{title}</p>
          <p className="text-2xl font-black tracking-tighter mt-1 text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
