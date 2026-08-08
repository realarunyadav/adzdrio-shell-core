import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Warehouse, MapPin, Activity, ShieldCheck, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WarehouseNetwork = () => {
  const warehouses = [
    { name: "Central Hub - Bengaluru", type: "Central Hub", capacity: 85, stock: "₹2.4Cr", skus: 1204, status: "Optimal" },
    { name: "West Node - Mumbai", type: "Distribution Node", capacity: 42, stock: "₹84.5L", skus: 452, status: "Optimal" },
    { name: "East Node - Kolkata", type: "Satellite Warehouse", capacity: 94, stock: "₹1.1Cr", skus: 890, status: "Capacity Warning" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
          <Warehouse className="w-4 h-4 text-primary" />
          Multi-Warehouse Orchestration
        </h3>
        <Button size="sm" className="h-9 font-bold"><Plus className="w-3.5 h-3.5 mr-2" />Add Node</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warehouses.map((wh, i) => (
          <Card key={i} className="border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                  <Warehouse className="w-5 h-5" />
                </div>
                <Badge variant={wh.status === "Optimal" ? "outline" : "destructive"} className="text-[9px] font-black uppercase tracking-tighter">
                  {wh.status}
                </Badge>
              </div>

              <div className="flex flex-col mb-6">
                <h4 className="font-black text-slate-900 leading-tight mb-1">{wh.name}</h4>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <MapPin className="w-3 h-3" />
                  {wh.type}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Stock Value</span>
                   <span className="text-sm font-black text-slate-900">{wh.stock}</span>
                </div>
                <div className="flex flex-col p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">SKU Count</span>
                   <span className="text-sm font-black text-slate-900">{wh.skus}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Utilization</span>
                  <span className="text-[10px] font-black text-slate-900">{wh.capacity}%</span>
                </div>
                <Progress value={wh.capacity} className={`h-1.5 ${wh.capacity > 90 ? '[&>div]:bg-rose-500' : ''}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
