import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Package,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ProductMaster = () => {
  const products = [
    {
      sku: "AB-2024-X1",
      name: "Enterprise Core Router v4",
      category: "Hardware",
      brand: "ADZDRIO",
      cost: "₹12,400",
      price: "₹18,500",
      stock: 452,
      reorder: 100,
      status: "Active"
    },
    {
      sku: "AB-2024-X2",
      name: "Load Balancer Node Pro",
      category: "Network",
      brand: "ADZDRIO",
      cost: "₹8,200",
      price: "₹14,900",
      stock: 84,
      reorder: 100,
      status: "Low Stock"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search SKU master..." className="pl-10 h-10 border-slate-200" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-10 font-bold px-4">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="h-10 bg-slate-900 text-white font-bold px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-100 shadow-sm overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product / SKU</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valuation</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{p.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase">{p.sku} • {p.brand}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="secondary" className="text-[9px] font-bold uppercase">{p.category}</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{p.price}</span>
                    <span className="text-[10px] text-slate-400 font-bold">Cost: {p.cost}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className={`text-xs font-black ${p.stock < p.reorder ? 'text-amber-600' : 'text-slate-900'}`}>{p.stock} Units</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase">Min Level: {p.reorder}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`text-[9px] font-bold tracking-widest uppercase ${p.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                    {p.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                   <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
