import { 
  TrendingUp, 
  Receipt, 
  BarChart3, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Wallet,
  Activity
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function FinanceDashboard() {
  const stats = [
    { label: "Total Revenue", value: "₹42,50,000", change: "+12.5%", trend: "up", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Net Expenses", value: "₹18,20,000", change: "-5.2%", trend: "down", icon: Receipt, color: "text-red-600", bg: "bg-red-50" },
    { label: "Net Profit", value: "₹24,30,000", change: "+18.1%", trend: "up", icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Cash Flow", value: "₹55,60,000", change: "+8.3%", trend: "up", icon: CreditCard, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "MRR", value: "₹8,45,000", change: "+4.2%", trend: "up", icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "ARR", value: "₹1,01,40,000", change: "+15.0%", trend: "up", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Collections", value: "₹38,20,000", change: "+9.1%", trend: "up", icon: Wallet, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Outstanding", value: "₹4,30,000", change: "-2.4%", trend: "down", icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5 border-none surface-card surface-card-hover group">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <Badge 
                variant={stat.trend === "up" ? "outline" : "destructive"} 
                className={`flex gap-1 items-center px-2 py-0.5 text-[11px] font-bold ${stat.trend === 'up' ? 'text-success bg-success/10 border-none' : ''}`}
              >
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
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
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Revenue vs Expenses</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] flex items-end justify-between gap-2 px-4">
            {[65, 45, 75, 55, 85, 65, 95, 75, 80, 60, 90, 70].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-primary/20 rounded-t-sm transition-all duration-500 hover:bg-primary/40" 
                  style={{ height: `${val}%` }} 
                />
                <div 
                  className="w-full bg-slate-100 rounded-t-sm transition-all duration-500 hover:bg-slate-200" 
                  style={{ height: `${val * 0.4}%` }} 
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-none surface-card p-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Health & Compliance</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                <span>Financial Health</span>
                <span className="text-success">94/100</span>
              </div>
              <Progress value={94} className="h-1.5" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                <span>GST Compliance</span>
                <span className="text-primary">100%</span>
              </div>
              <Progress value={100} className="h-1.5" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                <span>Collections Efficiency</span>
                <span className="text-amber-500">82%</span>
              </div>
              <Progress value={82} className="h-1.5" />
            </div>

            <div className="pt-6 border-t mt-6">
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Upcoming GST Deadline</div>
                <div className="text-sm font-black text-slate-900">GSTR-3B (Aug 2026)</div>
                <div className="text-xs font-bold text-amber-600 mt-1">Due in 12 days</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
