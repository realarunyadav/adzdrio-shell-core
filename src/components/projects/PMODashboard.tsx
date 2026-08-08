import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  AlertOctagon, 
  CheckCircle2, 
  Timer, 
  IndianRupee, 
  TrendingUp, 
  Users,
  Target
} from 'lucide-react';

export const PMODashboard = () => {
  const stats = [
    { label: "Portfolio Health", value: "92%", trend: "+2.4%", icon: Target, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Active Projects", value: "24", trend: "+2", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Delayed Projects", value: "3", trend: "-1", icon: AlertOctagon, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Budget Utilization", value: "68%", trend: "Within Target", icon: IndianRupee, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Resource Load", value: "84%", trend: "High", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="text-[10px] font-bold bg-white/50">{stat.trend}</Badge>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Strategic Milestones (Next 30 Days)
            </h3>
            <div className="space-y-4">
              {[
                { title: "ABOS Core v2.0 Release", date: "Aug 15", owner: "Tech Team", status: "On Track" },
                { title: "Infrastructure Migration", date: "Aug 22", owner: "DevOps", status: "At Risk" },
                { title: "Security Compliance Audit", date: "Sep 01", owner: "InfoSec", status: "Pending" }
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{m.title}</span>
                    <span className="text-[10px] text-slate-400">{m.date} • {m.owner}</span>
                  </div>
                  <Badge variant={m.status === "At Risk" ? "destructive" : "secondary"} className="text-[10px] uppercase">{m.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-500" />
              Critical Risks
            </h3>
            <div className="space-y-4">
              {[
                { risk: "Talent Attrition (Senior Backend)", severity: "Critical", impact: "Schedule Delay" },
                { risk: "Cloud Hosting Cost Overrun", severity: "Medium", impact: "Budget Performance" }
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border-l-4 border-l-rose-500 bg-rose-50/30">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{r.risk}</span>
                    <span className="text-[10px] text-slate-500">Impact: {r.impact}</span>
                  </div>
                  <Badge className="bg-rose-500 hover:bg-rose-600 text-white text-[10px]">{r.severity}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
