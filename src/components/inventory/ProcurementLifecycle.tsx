import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  Search,
  Filter,
  ArrowRight,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProcurementLifecycle = () => {
  const purchaseOrders = [
    { 
      id: "PO-2026-0042", 
      vendor: "Cisco Systems India", 
      date: "Aug 07, 2026", 
      items: 12, 
      total: "₹18,45,000", 
      status: "Ordered" 
    },
    { 
      id: "PO-2026-0038", 
      vendor: "Dell Technologies", 
      date: "Aug 05, 2026", 
      items: 4, 
      total: "₹4,12,000", 
      status: "Partially Received" 
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-6">
           <div className="flex flex-col">
             <span className="text-xs font-black text-slate-900">18 Active POs</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase">Procurement Pipeline</span>
           </div>
           <div className="h-8 w-px bg-slate-100" />
           <div className="flex gap-4">
              {['Draft', 'Pending', 'Approved', 'Ordered'].map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{s}</span>
                </div>
              ))}
           </div>
        </div>
        <Button className="h-10 bg-primary text-white font-bold px-6">
           Create Purchase Order
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {purchaseOrders.map((po, i) => (
          <Card key={i} className="border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="p-3 rounded-xl bg-slate-50 text-slate-500">
                   <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">{po.id}</span>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase ${po.status === 'Ordered' ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>
                       {po.status}
                    </Badge>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{po.vendor}</span>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center px-10 border-x border-slate-100">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Valuation</span>
                 <span className="text-sm font-black text-slate-900">{po.total}</span>
              </div>

              <div className="flex items-center gap-6">
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items: {po.items}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{po.date}</span>
                 </div>
                 <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg hover:bg-slate-100">
                    <ArrowRight className="w-4 h-4" />
                 </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
