import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Zap,
  Layout,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const InventoryAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <CardContent className="p-8 relative">
            <Sparkles className="absolute top-6 right-6 w-8 h-8 text-primary/40 animate-pulse" />
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-primary/20">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tighter">Demand Intelligence</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-slate-300">
                  <span className="text-primary font-bold">Forecast UI Ready:</span> System identifies a <span className="text-amber-400 font-bold">15% stock-out risk</span> for Core Router V4 next month based on sales velocity.
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 uppercase font-black tracking-widest italic">
                   <ShieldAlert className="w-3 h-3" />
                   Draft Forecast - Needs Human Verification
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 text-amber-400">
                    Overstock Risk
                  </div>
                  <div className="text-xs font-bold text-white">Legacy Adapters (320 units)</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 text-emerald-400">
                    Turnover Rate
                  </div>
                  <div className="text-xs font-bold text-white">12.4x Annual Portfolio</div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black text-[11px] uppercase tracking-widest h-12 rounded-xl">
                Run Predictive Reorder Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-widest">
              <PieChart className="w-4 h-4 text-primary" />
              ABC Portfolio Analysis
            </h3>
            <div className="space-y-4">
              {[
                { label: "Category A (High Value)", value: "₹3.4Cr", items: "124 SKUs", color: "bg-primary", pct: "70%" },
                { label: "Category B (Medium)", value: "₹1.1Cr", items: "452 SKUs", color: "bg-slate-400", pct: "22%" },
                { label: "Category C (Low)", value: "₹32.5L", items: "708 SKUs", color: "bg-slate-200", pct: "8%" }
              ].map((row, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-black text-slate-900">{row.label}</span>
                      <span className="text-xs font-black text-slate-900">{row.pct}</span>
                   </div>
                   <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
                      <div className={`h-full ${row.color}`} style={{ width: row.pct }} />
                   </div>
                   <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>{row.items}</span>
                      <span>{row.value}</span>
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
