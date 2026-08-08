import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  ShoppingCart, 
  Warehouse, 
  AlertTriangle, 
  Tag,
  TrendingUp,
  BarChart3,
  Activity
} from 'lucide-react';

export const InventoryDashboard = () => {
  const stats = [
    { label: "Total Stock Value", value: "₹4.82Cr", trend: "+4.2%", icon: Tag, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total SKUs", value: "1,284", trend: "+12", icon: Package, color: "text-slate-600", bg: "bg-slate-50" },
    { label: "Low Stock", value: "14 Items", trend: "High Risk", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Pending POs", value: "18 Orders", trend: "7 Priority", icon: ShoppingCart, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Warehouse Health", value: "94%", trend: "Optimal", icon: Warehouse, color: "text-emerald-600", bg: "bg-emerald-50" }
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
                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Stock Movement Summary (24h)
              </h3>
              <Badge variant="secondary" className="text-[10px]">REAL-TIME</Badge>
            </div>
            <div className="h-[240px] flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
               <TrendingUp className="w-12 h-12 text-slate-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Critical Replenishment
            </h3>
            <div className="space-y-4">
              {[
                { sku: "SKU-492", name: "ABOS Core Node V2", stock: 12, reorder: 50 },
                { sku: "SKU-118", name: "Edge Controller 10", stock: 4, reorder: 25 },
                { sku: "SKU-992", name: "High-Load Switch", stock: 0, reorder: 10 }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.sku}</span>
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-black ${item.stock === 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                      {item.stock} / {item.reorder}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available</span>
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
