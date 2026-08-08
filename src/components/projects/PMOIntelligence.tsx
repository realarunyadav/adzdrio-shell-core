import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Sparkles, 
  Target, 
  TrendingUp, 
  ArrowRight,
  ShieldAlert,
  Zap,
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PMOIntelligence = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <CardContent className="p-8 relative">
            <Sparkles className="absolute top-6 right-6 w-8 h-8 text-primary/40 animate-pulse" />
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-primary/20">
                <Layout className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tighter">AI Executive Summary</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-slate-300">
                  Portfolio health is <span className="text-emerald-400 font-bold">Stable (92%)</span>. 
                  Major milestone "ABOS Core Framework" is tracking for on-time delivery. 
                  However, "Enterprise Data Migration" shows a <span className="text-amber-400 font-bold">12% schedule variance</span> due to hardware delays.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3 h-3 text-rose-400" />
                    Critical Delay Detected
                  </div>
                  <div className="text-xs font-bold text-white">Hardware Logistics Layer</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    Resource Optimization
                  </div>
                  <div className="text-xs font-bold text-white">Reallocate QA from PRJ-004</div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black text-[11px] uppercase tracking-widest h-12 rounded-xl">
                Generate Full Strategic Report
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Portfolio Performance Metrics
            </h3>
            <div className="space-y-6 pt-2">
              {[
                { label: "Schedule Performance (SPI)", value: "1.04", target: "1.00", status: "On Target" },
                { label: "Cost Performance (CPI)", value: "0.98", target: "1.00", status: "Variance Found" },
                { label: "Resource Efficiency", value: "88%", target: "85%", status: "Exceeding" },
                { label: "Risk Mitigation Velocity", value: "6.2 days", target: "7.0 days", status: "Excellent" }
              ].map((metric, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{metric.label}</span>
                    <span className="text-[10px] text-slate-400 font-medium">Target: {metric.target}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-black text-slate-900">{metric.value}</span>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-tighter ${metric.status === 'Variance Found' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'}`}>
                      {metric.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
